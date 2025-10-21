/* eslint-disable no-console, @typescript-eslint/no-explicit-any */

import type { ByteBuffer } from "./buffer";
import { newByteBuffer } from "./buffer";
import { maybeError, reasonText } from "./helper";

let logURL = "";
let initialized: boolean = false;

const LOG_LEVEL_INFO = "i";
const LOG_LEVEL_WARNING = "w";
const LOG_LEVEL_ERROR = "e";

type LogLevel = typeof LOG_LEVEL_INFO | typeof LOG_LEVEL_WARNING | typeof LOG_LEVEL_ERROR;

interface LogRecord {
    t: number; // Time (ms timestamp)
    m: string; // Msg
    l: LogLevel; // Level
    s?: string; // StackTrace
    u: string; // URL
}

// 64KiB is max body size according to fetch API docs (with keepalive option)
// see https://developer.mozilla.org/en-US/docs/Web/API/RequestInit#keepalive
// let's make it 32KiB to ensure it is most likely sent on unload
const MAX_BODY_SIZE = 1 << 15;

const encodeBuffer = new Uint8Array(MAX_BODY_SIZE);
const buffs: ByteBuffer[] = [newByteBuffer(MAX_BODY_SIZE)];
let currentBuffIndex = 0;
let buffers = 0;

const textEncoder = new TextEncoder();

const push = (
    msg: string,
    level: LogLevel,
    err?: Error,
    skipFrames: number = 0,
    isRecursive: boolean = false,
): void => {
    if (!initialized) {
        return;
    }

    try {
        const rec: LogRecord = {
            t: new Date().valueOf(),
            m: msg,
            l: level,
            s: err !== undefined ? err.stack : getStackTrace(skipFrames + 1),
            u: window.location.href,
        };

        const json = JSON.stringify(rec);
        const { read, written } = textEncoder.encodeInto(json, encodeBuffer);

        if (read !== json.length) {
            throw new Error("JSON payload too big");
        }

        let buf = buffs[currentBuffIndex];

        if (buf.capacity() - buf.length() < written) {
            currentBuffIndex++;

            if (currentBuffIndex < buffs.length) {
                buf = buffs[currentBuffIndex];
                buf.reset();
            } else {
                buf = newByteBuffer(MAX_BODY_SIZE);
                buffs.push(buf);
            }
            buffers++;
        }

        buf.append(encodeBuffer.subarray(0, written));

        if (buffers === 0) {
            buffers++;
        }
    } catch (err: unknown) {
        const msg = `Failed to push log record${reasonText(err)}`;

        // Cannot use log.error here because it may lead to call stack overflow
        if (!isRecursive) {
            push(msg, LOG_LEVEL_ERROR, maybeError(err), 0, true);
        }
        console.error(msg, err);
    }
};

const logToConsole = (msg: string, level: LogLevel, err?: Error): void => {
    const args: unknown[] = err !== undefined ? [err] : [];

    switch (level) {
        case LOG_LEVEL_INFO:
            console.info(msg, ...args);
            break;
        case LOG_LEVEL_WARNING:
            console.warn(msg, ...args);
            break;
        case LOG_LEVEL_ERROR:
            console.error(msg, ...args);
            break;
        default:
            console.log(msg, ...args);
            break;
    }
};

const MAX_FLUSH_ATTEMPTS = 3;
const AUTO_FLUSH_INTERVAL = 5000;
const RETRY_INTERVAL = 800;

const flush = async (): Promise<void> => {
    if (!initialized || buffers === 0) {
        return;
    }

    let err: unknown;

    for (let i = 0; i < MAX_FLUSH_ATTEMPTS; i++) {
        const reqs = doFetch();

        try {
            processFetchResults(await Promise.allSettled(reqs));
            resetBuffers();

            return;
        } catch (e: unknown) {
            if (i < MAX_FLUSH_ATTEMPTS - 1) {
                await new Promise((resolve) => {
                    setTimeout(resolve, RETRY_INTERVAL);
                });
            }
            err = e;
        }
    }

    if (err === undefined) {
        return;
    }

    log.error(
        `Failed to submit logs after ${MAX_FLUSH_ATTEMPTS.toString()} attempts${reasonText(err)}`,
        maybeError(err),
    );
};

const resetBuffers = (): void => {
    buffers = 0;
    currentBuffIndex = 0;
    buffs[0].reset();
};

const doFetch = (): Promise<void>[] => {
    const reqs: Promise<void>[] = [];

    for (let i = 0; i < buffers; i++) {
        reqs.push(
            (async (): Promise<void> => {
                await fetch(logURL, {
                    method: "POST",
                    body: buffs[i].data(),
                    keepalive: true,
                });
            })(),
        );
    }

    return reqs;
};

const processFetchResults = (res: PromiseSettledResult<void>[]): void => {
    if (res.length === 0) {
        return;
    }

    if (res.length === 1) {
        const r = res[0];

        switch (r.status) {
            case "rejected":
                throw r.reason;
            case "fulfilled":
            default:
                return;
        }
    }

    const errors: any[] = [];

    for (let i = 0, j = 0; i < res.length; i++) {
        const r = res[i];

        switch (r.status) {
            case "rejected":
                errors.push(r.reason);

                if (i != j) {
                    const tmp = buffs[i];
                    buffs[i] = buffs[j];
                    buffs[j] = tmp;
                }
                j++;
                break;
            case "fulfilled":
            default:
                buffers--;
        }
    }

    if (errors.length > 0) {
        throw new Error(
            `Error while pushing logs: ${errors.map((err: any, i: number): string => `req#${i.toString()} ${reasonText(err, "") || "<unknown reason>"}`).join("; ")}`,
        );
    }
};

const doBeacon = (): void => {
    for (let i = 0; i < buffers; i++) {
        navigator.sendBeacon(logURL, buffs[i].data());
    }
};

const reStackTraceNotAFrame = /(.+?):(\d+?):(\d+)/;

const getStackTrace = (skipFrames: number = 0): string | undefined => {
    let raw: string | undefined;

    try {
        throw new Error();
    } catch (e: unknown) {
        raw = maybeError(e)?.stack;
    }

    if (raw === undefined) {
        return raw;
    }

    skipFrames++; // include current frame

    let start = 0;

    for (
        let i = raw.indexOf("\n", start);
        i > -1 && skipFrames > 0;
        start = i + 1, i = raw.indexOf("\n", start)
    ) {
        if (start === 0 && !reStackTraceNotAFrame.test(raw.substring(start, i + 1))) {
            continue;
        }

        skipFrames--;
    }

    // stack trace is fully skipped
    if (skipFrames > 0 || start + 1 >= raw.length) {
        return undefined;
    }

    return raw.substring(start + 1);
};

let flushTimeoutID: ReturnType<typeof setTimeout> | undefined;

const scheduleFlush = (): void => {
    flushTimeoutID = setTimeout((): void => {
        void flush().then((): void => {
            scheduleFlush();
        });
    }, AUTO_FLUSH_INTERVAL);
};

const unscheduleFlush = (): void => {
    if (flushTimeoutID !== undefined) {
        clearTimeout(flushTimeoutID);
    }
};

export const initAutoFlush = (baseURL: string): void => {
    try {
        logURL = new URL("log", baseURL).toString();
    } catch (e: unknown) {
        console.error("Failed to prepare log base URL", e);

        return;
    }

    initialized = true;

    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState !== "hidden") {
            return;
        }

        unscheduleFlush();
        doBeacon();
    });

    scheduleFlush();
};

export const initUnhandledErrorHandlers = (): void => {
    window.onerror = (
        event: Event | string,
        source?: string,
        lineno?: number,
        colno?: number,
        error?: Error,
    ) => {
        log.error(`Unhandled error${reasonText(error)}`, error);
    };

    window.addEventListener("unhandledrejection", (e: PromiseRejectionEvent) => {
        log.error(`Unhandled rejection${reasonText(e.reason)}`, maybeError(e.reason));
    });
};

export const log = {
    info(msg: string, err?: Error): void {
        push(msg, LOG_LEVEL_INFO, err, 1);
        logToConsole(msg, LOG_LEVEL_INFO, err);
    },
    warning(msg: string, err?: Error): void {
        push(msg, LOG_LEVEL_WARNING, err, 1);
        logToConsole(msg, LOG_LEVEL_WARNING, err);
    },
    error(msg: string, err?: Error): void {
        push(msg, LOG_LEVEL_ERROR, err, 1);
        logToConsole(msg, LOG_LEVEL_ERROR, err);
    },
    flush,
};

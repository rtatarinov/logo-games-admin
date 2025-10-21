import { attach } from "effector";
import { isNotEmpty, mergeDeepRight } from "ramda";

import { createEffect } from "@app/shared/effector";

import type { ResponseError } from "./schemas";

export type Request = {
    data?: unknown;
    headers?: HeadersInit;
    method?: "DELETE" | "GET" | "PATCH" | "POST" | "PUT";
    params?: { [key: string]: string | number | string[] | number[] | boolean };
    url?: string;
};

export const httpClientConfig = {
    baseURL: __API_BASE_URI__ ?? "",
};

const createRequestBody = (data: Request["data"]) => (data ? { body: JSON.stringify(data) } : {});

const mergeConfigs = (config: Request, request: Request): Request =>
    mergeDeepRight(config, request);

const buildRequestUrl = (url: Request["url"], params: URLSearchParams): string =>
    `${httpClientConfig.baseURL}${url}` + (params.size > 0 ? `?${params.toString()}` : "");

const searchParamToString = (val: string | number | boolean): string =>
    typeof val === "string" ? val : val.toString();

const buildURLSearchParams = (params: Request["params"]): URLSearchParams => {
    if (params === undefined) {
        return new URLSearchParams();
    }

    const keys = Object.keys(params);
    const raw: string[][] = [];

    for (const key of keys) {
        const val = params[key];

        if (val === undefined) {
            continue;
        }

        if (Array.isArray(val)) {
            for (const valArr of val) {
                raw.push([key, searchParamToString(valArr)]);
            }
            continue;
        }

        raw.push([key, searchParamToString(val)]);
    }

    return new URLSearchParams(raw);
};

const client = async <T>(config: Request): Promise<T | Blob | null> => {
    const { data, method, params, url, ...rest } = config;

    try {
        const requestBody = createRequestBody(data);
        const requestUrl = buildRequestUrl(url, buildURLSearchParams(params));
        const fetchInit: RequestInit = { method, ...requestBody, ...rest };

        if (import.meta.env.DEV) {
            fetchInit.credentials = "include";
        }

        const response = await fetch(requestUrl, fetchInit);
        const contentType = response.headers.get("Content-Type") ?? "";

        if (!response.ok) {
            const rawError = await response.text();

            throw {
                status: response.status as HttpErrorStatus,
                ...(isNotEmpty(rawError) && contentType.includes("application/json")
                    ? JSON.parse(rawError)
                    : {}),
            };
        }

        if (contentType.includes("application/json")) {
            const raw = await response.text();

            return isNotEmpty(raw) ? (JSON.parse(raw) as T) : null;
        }

        const blobTypes = [
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/pdf",
        ];

        if (blobTypes.some((type) => contentType.includes(type))) {
            return await response.blob();
        }

        return null;
    } catch (err) {
        throw err;
    }
};

export enum HttpErrorStatus {
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    TOO_MANY_REQUESTS = 429,
    INTERNAL_SERVER_ERROR = 500,
}

export const requestFx = attach({
    effect: createEffect<{ request: Request }, Promise<unknown>, ResponseError>(
        async ({ request }) => {
            // eslint-disable-next-line no-useless-catch
            try {
                return await client(request);
                // eslint-disable-next-line
            } catch (err: any) {
                throw err;
            }
        },
    ),
    mapParams: (request: Request) => ({ request }),
});

export const httpClient = <Response>(
    config: Partial<Request>,
    extraConfig: Partial<Request> = {},
) => requestFx(mergeConfigs(extraConfig, config)) as Promise<Response>;

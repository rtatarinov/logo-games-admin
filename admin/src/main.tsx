import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import type { Effect } from "effector";
import type { Message } from "effector/inspect";
import { inspect } from "effector/inspect";
import { isNotEmpty, isNotNil } from "ramda";

import { appDomain } from "@app/shared/effector";
import {
    initAutoFlush,
    initUnhandledErrorHandlers,
    log,
    maybeError,
    reasonText,
} from "@app/shared/lib/clilog";

import { App, createAppModel } from "./app";

if (isNotNil(__LOG_BASE_URI__) && isNotEmpty(__LOG_BASE_URI__)) {
    initAutoFlush(__LOG_BASE_URI__);
}

initUnhandledErrorHandlers();

appDomain.onCreateEffect((effect: Effect<unknown, unknown, unknown>): void => {
    // eslint-disable-next-line effector/no-watch
    effect.fail.watch(({ error }) => {
        log.error(`Error during effect${reasonText(error)}`, maybeError(error));
    });
});

inspect({
    fn: (msg: Message): void => {
        if (msg.type === "error") {
            log.error(
                `Error during effects inspect${reasonText(msg.error)}`,
                maybeError(msg.error),
            );
        }
    },
});

const $$appModel = createAppModel();

$$appModel.init();

const rootElement = document.getElementById("root");

if (!rootElement) {
    throw Error("HTML document does not have #root element");
}

ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <App $$model={$$appModel} />
    </React.StrictMode>,
);

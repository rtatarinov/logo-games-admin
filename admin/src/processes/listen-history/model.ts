import type { BrowserHistory } from "history";
import { Action } from "history";

export type HistoryModel = ReturnType<typeof launchListenHistoryModel>;

export const launchListenHistoryModel = ({ history }: { history: BrowserHistory }) => {
    history.listen((param) => {
        if (param.action !== Action.Replace) {
            window.scrollTo(0, 0);
        }
    });
};

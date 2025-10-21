import type { Domain, Effect, EffectByHandler, EventCallable, Json, StoreWritable } from "effector";
// eslint-disable-next-line no-restricted-imports
import { createDomain as origCreateDomain } from "effector";

export const appDomain = origCreateDomain({ name: "app" });

export function createEvent<Payload = void>(name?: string): EventCallable<Payload>;
export function createEvent<Payload = void>(config: {
    name?: string;
    sid?: string;
}): EventCallable<Payload>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createEvent(...args: any[]): any {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return appDomain.createEvent(...args);
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function createEffect<FN extends Function>(handler: FN): EffectByHandler<FN, Error>;
export function createEffect<Params, Done, Fail = Error>(
    handler: (params: Params) => Done | Promise<Done>,
): Effect<Params, Done, Fail>;
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function createEffect<FN extends Function, Fail>(handler: FN): EffectByHandler<FN, Fail>;
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function createEffect<FN extends Function>(config: {
    name?: string;
    handler: FN;
    sid?: string;
}): EffectByHandler<FN, Error>;
export function createEffect<Params, Done, Fail = Error>(
    name?: string,
    config?: {
        handler?: (params: Params) => Promise<Done> | Done;
        sid?: string;
    },
): Effect<Params, Done, Fail>;
export function createEffect<Params, Done, Fail = Error>(config: {
    handler?: (params: Params) => Promise<Done> | Done;
    sid?: string;
    name?: string;
}): Effect<Params, Done, Fail>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createEffect(...args: any[]): any {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return appDomain.createEffect(...args);
}

export function createStore<State, SerializedState extends Json = Json>(
    defaultState: State,
    config?: {
        name?: string;
        sid?: string;
        updateFilter?: (update: State, current: State) => boolean;
        serialize?:
            | "ignore"
            | {
                  write: (state: State) => SerializedState;
                  read: (json: SerializedState) => State;
              };
        skipVoid?: boolean;
    },
): StoreWritable<State> {
    return appDomain.createStore(defaultState, config);
}

export function createDomain(name?: string): Domain {
    return appDomain.createDomain(name);
}

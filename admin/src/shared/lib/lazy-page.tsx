import type { ComponentProps, ComponentType } from "react";
import { createElement, lazy, memo } from "react";

import type { RouteInstance, RouteParams, RouteParamsAndQuery } from "atomic-router";
import { chainRoute } from "atomic-router";
import { sample } from "effector";
import { condition, not } from "patronum";
import type { Except } from "type-fest";

import { createEffect, createEvent, createStore } from "@app/shared/effector";

export const createLazyPage = <
    Params extends RouteParams,
    Model,
    Page extends ComponentType<{ $$model: Model }>,
    StaticDeps extends Record<string, unknown>,
>(
    route: RouteInstance<Params>,
    staticDeps: StaticDeps,
    load: () => Promise<{
        component: Page;
        createModel: (
            params: { route: RouteInstance<Params> } & StaticDeps,
        ) => Model | Promise<Model>;
    }>,
) => {
    const opened = createEvent<RouteParamsAndQuery<Params>>();
    const loaded = createEvent();

    const chainedRoute = chainRoute({
        beforeOpen: opened,
        openOn: loaded,
        route,
    });

    let $$model: Promise<Model> | undefined;
    const loadFx = createEffect(async () => {
        const { component, createModel } = await load();

        if (!$$model) {
            $$model = Promise.resolve(createModel({ route: chainedRoute, ...staticDeps }));
        }

        return { $$model: await $$model, component };
    });

    const $isLoaded = createStore(false).on(loaded, () => true);

    condition({
        source: opened,
        if: $isLoaded,
        then: loaded,
        else: loadFx,
    });

    sample({
        clock: loadFx.done,
        filter: not($isLoaded),
        target: loaded,
    });

    return lazy(() =>
        loadFx().then(({ $$model, component }) => {
            const Component = memo((props: Except<ComponentProps<Page>, "$$model">) =>
                createElement(component, { $$model, ...props }),
            );

            Component.displayName = `Wrapped${component.displayName ?? "Page"}`;

            return { default: Component };
        }),
    );
};

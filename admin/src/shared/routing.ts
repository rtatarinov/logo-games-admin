import {createRoute} from "atomic-router";

export const homeRoute = createRoute();
export const notFoundRoute = createRoute();
export const usersRoute = createRoute();
export const userRoute = createRoute<{ id: string }>();
export const signInRoute = createRoute();


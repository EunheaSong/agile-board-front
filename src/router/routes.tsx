import { ROUTES } from "../utils/constants";

export const routes = {
  home: () => ROUTES.HOME,
} as const;

export type RouteKey = keyof typeof routes;

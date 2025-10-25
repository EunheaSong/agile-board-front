import { ROUTES } from "../utils/constants";

export const routes = {
  home: () => ROUTES.HOME,
  projects: () => ROUTES.PROJECTS,
  projectDetail: (id: string) => ROUTES.BOARD(id),
  roadmap: (id: string) => ROUTES.ROADMAP(id),
  board: (id: string) => ROUTES.BOARD(id),
  calendar: (id: string) => ROUTES.CALENDAR(id),
  issues: (id: string) => ROUTES.ISSUES(id),
  release: (id: string) => ROUTES.RELEASE(id),
  backlog: (id: string) => ROUTES.BACKLOG(id),
  analytics: () => ROUTES.ANALYTICS,
  settings: () => ROUTES.SETTINGS,
  signin: () => ROUTES.SIGNIN,
  signup: () => ROUTES.SIGNUP,
} as const;

export type RouteKey = keyof typeof routes;

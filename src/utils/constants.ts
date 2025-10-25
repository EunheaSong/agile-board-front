export const ROUTES = {
  HOME: "/",
  SIGNIN: "/signin",
  SIGNUP: "/signup",
  DASHBOARD: "/dashboard",
  ANALYTICS: "/analytics",
  SETTINGS: "/settings",
  BOARD: (id: string) => `/board/${id}`,
} as const;

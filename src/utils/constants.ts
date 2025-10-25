export const ROUTES = {
  HOME: "/",
  SIGNIN: "/signin",
  SIGNUP: "/signup",
  PROJECTS: "/projects",
  PROJECT_DETAIL: (id: string) => `/projects/${id}`,
  ROADMAP: (id: string) => `/projects/${id}/roadmap`,
  BOARD: (id: string) => `/projects/${id}/board`,
  CALENDAR: (id: string) => `/projects/${id}/calendar`,
  ISSUES: (id: string) => `/projects/${id}/issues`,
  RELEASE: (id: string) => `/projects/${id}/release`,
  BACKLOG: (id: string) => `/projects/${id}/backlog`,
  ANALYTICS: "/analytics",
  SETTINGS: "/settings",
} as const;

export const ISSUE_TYPES = [
  { id: "bug", label: "Bug" },
  { id: "task", label: "Task" },
  { id: "story", label: "Story" },
  { id: "epic", label: "Epic" },
];

export const ISSUE_PRIORITIES = [
  { id: "low", label: "Low" },
  { id: "medium", label: "Medium" },
  { id: "high", label: "High" },
];

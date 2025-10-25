import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { LoginPage } from "../pages/auth/LoginPage";
import { RegisterPage } from "../pages/auth/RegisterPage";
import { ROUTES } from "../utils/constants";
import { ProjectsPage } from "../pages/projects/Index";
import { ProjectDetailPage } from "../pages/projects/Detail";
import { RoadMapPage } from "../pages/projects/RoadMap";
import { BoardPage } from "../pages/projects/Board";
import { CalendarPage } from "../pages/projects/Calendar";
import { IssuesPage } from "../pages/projects/Issues";
import { ReleasePage } from "../pages/projects/Release";
import { BacklogPage } from "../pages/projects/Backlog";

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <App />,
    children: [
      {
        index: true,
        element: <div className="p-8 text-center">메인 대시보드 페이지</div>,
      },
      {
        path: "projects",
        element: <ProjectsPage />,
      },
      {
        path: "projects/:id",
        element: <ProjectDetailPage />,
        children: [
          {
            index: true,
            element: <RoadMapPage />,
          },
          {
            path: "roadmap",
            element: <RoadMapPage />,
          },
          {
            path: "board",
            element: <BoardPage />,
          },
          {
            path: "calendar",
            element: <CalendarPage />,
          },
          {
            path: "issues",
            element: <IssuesPage />,
          },
          {
            path: "release",
            element: <ReleasePage />,
          },
          {
            path: "backlog",
            element: <BacklogPage />,
          },
        ],
      },
      {
        path: "analytics",
        element: <div className="p-8 text-center">분석 페이지</div>,
      },
      {
        path: "settings",
        element: <div className="p-8 text-center">설정 페이지</div>,
      },
    ],
  },
  {
    path: ROUTES.SIGNIN,
    element: <LoginPage />,
  },
  {
    path: ROUTES.SIGNUP,
    element: <RegisterPage />,
  },
]);

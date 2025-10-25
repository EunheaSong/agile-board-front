import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { LoginPage } from "../pages/auth/LoginPage";
import { RegisterPage } from "../pages/auth/RegisterPage";
import { ROUTES } from "../utils/constants";
import { ProjectsPage } from "../pages/projects/Index";
import { ProjectDetailPage } from "../pages/projects/Detail";

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
        path: "projects/1",
        element: <ProjectDetailPage />,
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

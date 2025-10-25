import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Outlet, useParams, useNavigate, useLocation } from "react-router-dom";
import { routes } from "../../router/routes";

export const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 경로에서 activeItem 결정
  const getActiveItem = () => {
    const path = location.pathname;
    if (path.includes("/roadmap")) return "roadmap";
    if (path.includes("/board")) return "board";
    if (path.includes("/calendar")) return "calendar";
    if (path.includes("/issues")) return "issues";
    if (path.includes("/release")) return "release";
    if (path.includes("/backlog")) return "backlog";
    return "roadmap"; // 기본값
  };

  const handleNavItemClick = (itemId: string) => {
    if (!id) return;

    const routeMap = {
      roadmap: routes.roadmap(id),
      board: routes.board(id),
      calendar: routes.calendar(id),
      issues: routes.issues(id),
      release: routes.release(id),
      backlog: routes.backlog(id),
    };

    const route = routeMap[itemId as keyof typeof routeMap];
    if (route) {
      navigate(route);
    }
  };

  return (
    <div className="project-detail-page">
      <Sidebar
        projectName="AgileBoard Web App"
        activeItem={getActiveItem()}
        onItemClick={handleNavItemClick}
      />
      <div className="project-detail-content">
        <div className="project-detail-header">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

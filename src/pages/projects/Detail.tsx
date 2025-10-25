import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Outlet, useParams, useLocation } from "react-router-dom";

export const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>();
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

  // const [projectName, setProjectName] = useState("AgileBoard Web App");

  // TODO : GET project name from API
  // const getProjectName = async () => {
  //    TODO : projectId 를 가지고 백엔드에서 project 정보를 가져옴.
  // };

  // useEffect(() => {
  //   getProjectName().then((name) => {
  //     setProjectName(name);
  //   });
  // }, [id]);

  return (
    <div className="project-detail-page">
      <Sidebar
        projectId={id}
        projectName="AgileBoard Web App"
        activeItem={getActiveItem()}
      />
      <div className="project-detail-content">
        <div className="project-detail-header">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

import { Sidebar } from "./components/Sidebar";
import { Outlet, useParams, useLocation } from "react-router-dom";

export const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes("/roadmap")) return "로드맵";
    if (path.includes("/board")) return "칸반 보드";
    if (path.includes("/calendar")) return "캘린더";
    if (path.includes("/issues")) return "이슈";
    if (path.includes("/release")) return "릴리즈";
    if (path.includes("/backlog")) return "백로그";
    return "로드맵"; // 기본값
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
      <Sidebar projectId={id} projectName="AgileBoard Web App" />
      <div className="project-detail-content">
        <div className="project-detail-header">{getPageTitle()}</div>
        <Outlet />
      </div>
    </div>
  );
};

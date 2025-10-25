import { useState } from "react";
import { Sidebar } from "./components/Sidebar";

export const ProjectDetailPage = () => {
  const [activeNavItem, setActiveNavItem] = useState("roadmap");

  const handleNavItemClick = (itemId: string) => {
    setActiveNavItem(itemId);
    console.log("네비게이션 아이템 클릭:", itemId);
  };

  return (
    <div className="project-detail-page">
      <Sidebar
        projectName="AgileBoard Web App"
        activeItem={activeNavItem}
        onItemClick={handleNavItemClick}
      />
      <div className="project-detail-content">
        <div className="project-detail-header">
          <h1 className="project-detail-title">프로젝트 상세</h1>
        </div>
      </div>
    </div>
  );
};

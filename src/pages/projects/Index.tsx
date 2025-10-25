import { useState } from "react";
import { Button } from "../../components/ui/Button";
import { CreateModal } from "./components/CreateModal";
export const ProjectsPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateProject = (data: { thumbnail?: File }) => {
    console.log("프로젝트 생성!", data);
    if (data.thumbnail) {
      console.log("썸네일 파일:", data.thumbnail.name);
    }
    setIsCreateModalOpen(false);
  };

  return (
    <div className="projects-page">
      <div className="projects-header">
        <div className="projects-title-section">
          <h1 className="projects-title">프로젝트 목록</h1>
          <div className="search-container">
            <div className="search-input-wrapper">
              <svg
                className="search-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                className="search-input"
              />
            </div>
          </div>
        </div>
        <div className="create-button-container">
          <Button
            type="register"
            onClick={() => setIsCreateModalOpen(true)}
            className="create-project-btn"
          >
            새 프로젝트
          </Button>
        </div>
      </div>

      <div className="projects-table-container">
        <table className="projects-table">
          <thead>
            <tr className="table-header">
              <th className="table-header-cell">name</th>
              <th className="table-header-cell">key</th>
              <th className="table-header-cell">type</th>
              <th className="table-header-cell">lead</th>
            </tr>
          </thead>
          <tbody>
            <tr className="table-row">
              <td className="table-cell">AgileBoard Web App</td>
              <td className="table-cell">ABWA</td>
              <td className="table-cell">Software</td>
              <td className="table-cell">김개발</td>
            </tr>
            <tr className="table-row">
              <td className="table-cell name-cell">Mobile Dashboard</td>
              <td className="table-cell key-cell">MD</td>
              <td className="table-cell type-cell">Mobile</td>
              <td className="table-cell lead-cell">박디자인</td>
            </tr>
            <tr className="table-row">
              <td className="table-cell name-cell">API Integration</td>
              <td className="table-cell key-cell">API</td>
              <td className="table-cell type-cell">Backend</td>
              <td className="table-cell lead-cell">이백엔드</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 프로젝트 생성 모달 */}
      <CreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        handleCreateProject={handleCreateProject}
      />
    </div>
  );
};

import { useState } from "react";
import { NavButton } from "../../../components/ui/NavButton";
import { Avatar } from "../../../components/ui/Avatar";
import { routes } from "../../../router/routes";
import { useLocation } from "react-router-dom";

interface SidebarProps {
  projectId?: string;
  projectName?: string;
}

export const Sidebar = ({
  projectId = "1",
  projectName = "Project name",
}: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  // URL 기반으로 활성 상태 확인
  const isItemActive = (itemId: string) => {
    const path = location.pathname;
    return path.includes(`/${itemId}`);
  };

  const navigationItems = [
    {
      id: "roadmap",
      label: "Roadmap",
      icon: (
        <svg
          width="28"
          height="23"
          viewBox="0 0 28 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_168_334)">
            <path
              d="M9.33317 17.25L1.1665 21.0833V5.74996L9.33317 1.91663M9.33317 17.25L18.6665 21.0833M9.33317 17.25V1.91663M18.6665 21.0833L26.8332 17.25V1.91663L18.6665 5.74996M18.6665 21.0833V5.74996M18.6665 5.74996L9.33317 1.91663"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_168_334">
              <rect width="28" height="23" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    // {
    //   id: "board",
    //   label: "Board",
    //   icon: (
    //     <svg
    //       width="26"
    //       height="26"
    //       viewBox="0 0 26 26"
    //       fill="none"
    //       xmlns="http://www.w3.org/2000/svg"
    //     >
    //       <path
    //         d="M10.8333 3.25H3.25V10.8333H10.8333V3.25Z"
    //         stroke="currentColor"
    //         strokeWidth="1.5"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //       />
    //       <path
    //         d="M22.75 3.25H15.1667V10.8333H22.75V3.25Z"
    //         stroke="currentColor"
    //         strokeWidth="1.5"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //       />
    //       <path
    //         d="M22.75 15.1667H15.1667V22.75H22.75V15.1667Z"
    //         stroke="currentColor"
    //         strokeWidth="1.5"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //       />
    //       <path
    //         d="M10.8333 15.1667H3.25V22.75H10.8333V15.1667Z"
    //         stroke="currentColor"
    //         strokeWidth="1.5"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //       />
    //     </svg>
    //   ),
    // },
    // {
    //   id: "calendar",
    //   label: "Calendar",
    //   icon: (
    //     <svg
    //       width="26"
    //       height="26"
    //       viewBox="0 0 26 26"
    //       fill="none"
    //       xmlns="http://www.w3.org/2000/svg"
    //     >
    //       <path
    //         d="M17.3333 2.16663V6.49996M8.66667 2.16663V6.49996M3.25 10.8333H22.75M5.41667 4.33329H20.5833C21.78 4.33329 22.75 5.30334 22.75 6.49996V21.6666C22.75 22.8632 21.78 23.8333 20.5833 23.8333H5.41667C4.22005 23.8333 3.25 22.8632 3.25 21.6666V6.49996C3.25 5.30334 4.22005 4.33329 5.41667 4.33329Z"
    //         stroke="currentColor"
    //         strokeWidth="1.5"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //       />
    //     </svg>
    //   ),
    // },
    {
      id: "issues",
      label: "Issues",
      icon: (
        <svg
          width="27"
          height="27"
          viewBox="0 0 27 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 13.725H16.875M9 18.225H13.9275M18 4.5225C21.7462 4.725 23.625 6.10875 23.625 11.25V18C23.625 22.5 22.5 24.75 16.875 24.75H10.125C4.5 24.75 3.375 22.5 3.375 18V11.25C3.375 6.12 5.25375 4.725 9 4.5225M11.25 6.75H15.75C18 6.75 18 5.625 18 4.5C18 2.25 16.875 2.25 15.75 2.25H11.25C10.125 2.25 9 2.25 9 4.5C9 6.75 10.125 6.75 11.25 6.75Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "release",
      label: "Release",
      icon: (
        <svg
          width="27"
          height="27"
          viewBox="0 0 27 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.0925 21.375L12.9825 19.7775C13.2637 19.5412 13.7363 19.5412 14.0288 19.7775L15.9075 21.375C16.3463 21.6 16.8862 21.375 17.0437 20.9025L17.4038 19.8225C17.4938 19.5638 17.4038 19.1812 17.2125 18.99L15.3675 17.1337C15.2325 16.9987 15.1312 16.74 15.1312 16.56V14.4787C15.1312 14.0062 15.48 13.7812 15.9187 13.9612L19.6875 15.5813C20.3063 15.8513 20.8238 15.5138 20.8238 14.8388V13.7925C20.8238 13.2525 20.4188 12.6225 19.9125 12.4087L15.48 10.4962C15.2888 10.4175 15.1425 10.1812 15.1425 9.97875V7.65C15.1425 6.885 14.58 5.985 13.905 5.63625C13.6575 5.5125 13.3763 5.5125 13.1288 5.63625C12.4425 5.97375 11.8912 6.885 11.8912 7.65V9.97875C11.8912 10.1812 11.7338 10.4175 11.5538 10.4962L7.12125 12.4087C6.62625 12.6225 6.21 13.2525 6.21 13.7925V14.8388C6.21 15.5138 6.71625 15.8513 7.34625 15.5813L11.115 13.9612C11.5425 13.77 11.9025 14.0062 11.9025 14.4787V16.56C11.9025 16.7513 11.79 17.01 11.6662 17.1337L9.7875 18.9788C9.59625 19.17 9.50625 19.5525 9.59625 19.8113L9.95625 20.8912C10.1138 21.375 10.6425 21.6 11.0925 21.375Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.125 24.75H16.875C22.5 24.75 24.75 22.5 24.75 16.875V10.125C24.75 4.5 22.5 2.25 16.875 2.25H10.125C4.5 2.25 2.25 4.5 2.25 10.125V16.875C2.25 22.5 4.5 24.75 10.125 24.75Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "backlog",
      label: "Backlog",
      icon: (
        <svg
          width="27"
          height="35"
          viewBox="0 0 27 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.9229 11.595L13.7443 12.9124L17.5789 11.3519M20.1564 6.45472C22.6272 7.38166 23.6321 8.56933 22.6927 11.4676L21.4595 15.2727C20.6373 17.8095 19.4731 18.8338 15.7076 17.6134L11.189 16.1489C7.42352 14.9285 7.08151 13.416 7.90367 10.8793L9.13692 7.07413C10.0742 4.18222 11.5867 3.80344 14.1316 4.50208M15.2308 6.24593L18.2432 7.22225C19.7494 7.71042 19.9549 7.07623 20.1605 6.44204C20.5716 5.17365 19.8185 4.92957 19.0654 4.68549L16.053 3.70917C15.2999 3.46509 14.5468 3.22101 14.1357 4.48939C13.7246 5.75777 14.4777 6.00185 15.2308 6.24593Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 13H3.74001C4.82001 13 5.67 13.93 5.58 15L4.75 24.96C4.61 26.59 5.89999 27.99 7.53999 27.99H18.19C19.63 27.99 20.89 26.81 21 25.38L21.54 17.88C21.66 16.22 20.4 14.87 18.73 14.87H5.82001"
            fill="transparent"
          />
          <path
            d="M16.25 33C16.9404 33 17.5 32.4404 17.5 31.75C17.5 31.0596 16.9404 30.5 16.25 30.5C15.5596 30.5 15 31.0596 15 31.75C15 32.4404 15.5596 33 16.25 33Z"
            fill="transparent"
          />
          <path
            d="M8.25 33C8.94036 33 9.5 32.4404 9.5 31.75C9.5 31.0596 8.94036 30.5 8.25 30.5C7.55964 30.5 7 31.0596 7 31.75C7 32.4404 7.55964 33 8.25 33Z"
            fill="transparent"
          />
          <path
            d="M2 13H3.74001C4.82001 13 5.67 13.93 5.58 15L4.75 24.96C4.61 26.59 5.89999 27.99 7.53999 27.99H18.19C19.63 27.99 20.89 26.81 21 25.38L21.54 17.88C21.66 16.22 20.4 14.87 18.73 14.87H5.82001M9 19H21M17.5 31.75C17.5 32.4404 16.9404 33 16.25 33C15.5596 33 15 32.4404 15 31.75C15 31.0596 15.5596 30.5 16.25 30.5C16.9404 30.5 17.5 31.0596 17.5 31.75ZM9.5 31.75C9.5 32.4404 8.94036 33 8.25 33C7.55964 33 7 32.4404 7 31.75C7 31.0596 7.55964 30.5 8.25 30.5C8.94036 30.5 9.5 31.0596 9.5 31.75Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className={`sidebar ${isCollapsed ? "sidebar-collapsed" : ""}`}>
      {/* 프로젝트 헤더 */}
      <div className="sidebar-header">
        <div className="project-info">
          <Avatar size={32} />
          <span className="project-name">{projectName}</span>
        </div>
        {/* <div className="sidebar-separator"></div> */}
        <button
          className="sidebar-collapse-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d={isCollapsed ? "M6 4L10 8L6 12" : "M10 12L6 8L10 4"}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* 네비게이션 메뉴 */}
      <div className="sidebar-navigation">
        {navigationItems.map((item) => {
          const isActive = isItemActive(item.id);
          const routeMap = {
            roadmap: routes.roadmap(projectId),
            board: routes.board(projectId),
            calendar: routes.calendar(projectId),
            issues: routes.issues(projectId),
            release: routes.release(projectId),
            backlog: routes.backlog(projectId),
          };

          return (
            <NavButton
              key={item.id}
              to={routeMap[item.id as keyof typeof routeMap]}
              className={`nav-item ${isActive ? "nav-item-active" : ""}`}
            >
              <div className="nav-item-icon">{item.icon}</div>
              <span className="nav-item-label">{item.label}</span>
            </NavButton>
          );
        })}
      </div>

      {/* 설정 메뉴 */}
      <div className="sidebar-settings">
        <button className="nav-item">
          <div className="nav-item-icon">
            <svg
              width="22"
              height="21"
              viewBox="0 0 22 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.75 13.1896C12.4069 13.1896 13.75 11.8465 13.75 10.1896C13.75 8.53278 12.4069 7.18963 10.75 7.18963C9.09315 7.18963 7.75 8.53278 7.75 10.1896C7.75 11.8465 9.09315 13.1896 10.75 13.1896Z"
                stroke="#292D32"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M0.75 11.0696V9.30963C0.75 8.26963 1.6 7.40963 2.65 7.40963C4.46 7.40963 5.2 6.12963 4.29 4.55963C3.77 3.65963 4.08 2.48963 4.99 1.96963L6.72 0.979634C7.51 0.509634 8.53 0.789634 9 1.57963L9.11 1.76963C10.01 3.33963 11.49 3.33963 12.4 1.76963L12.51 1.57963C12.98 0.789634 14 0.509634 14.79 0.979634L16.52 1.96963C17.43 2.48963 17.74 3.65963 17.22 4.55963C16.31 6.12963 17.05 7.40963 18.86 7.40963C19.9 7.40963 20.76 8.25963 20.76 9.30963V11.0696C20.76 12.1096 19.91 12.9696 18.86 12.9696C17.05 12.9696 16.31 14.2496 17.22 15.8196C17.74 16.7296 17.43 17.8896 16.52 18.4096L14.79 19.3996C14 19.8696 12.98 19.5896 12.51 18.7996L12.4 18.6096C11.5 17.0396 10.02 17.0396 9.11 18.6096L9 18.7996C8.53 19.5896 7.51 19.8696 6.72 19.3996L4.99 18.4096C4.08 17.8896 3.77 16.7196 4.29 15.8196C5.2 14.2496 4.46 12.9696 2.65 12.9696C1.6 12.9696 0.75 12.1096 0.75 11.0696Z"
                stroke="#292D32"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="nav-item-label">Setting</span>
        </button>
      </div>
    </div>
  );
};

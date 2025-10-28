import { useState } from "react";
import { BoardPage } from "./components/Board";
import { Button } from "../../components/ui/Button";
import { SearchInput } from "../../components/ui/SearchInput";
import { CreateIssueModal } from "./components/CreateIusseModal";
import { ListPage } from "./components/List";

export const IssuesPage = () => {
  const [viewMode, setViewMode] = useState<"LIST" | "KANBAN">("LIST");
  const [isCreateIssueModalOpen, setIsCreateIssueModalOpen] = useState(false);

  const handleViewModeChange = (mode: "LIST" | "KANBAN") => {
    setViewMode(mode);
  };

  const dummyData = [
    {
      id: 1,
      title: "이슈 1",
      category: "카테고리",
      type: "BUG",
      ticketId: "티켓 ID",
      status: "TODO",
      assignee: "김개발",
      avatar: "https://via.placeholder.com/150",
      priority: "HIGH",
    },
    {
      id: 2,
      title: "이슈 2",
      category: "카테고리",
      type: "BUG",
      ticketId: "티켓 ID",
      status: "IN_PROGRESS",
      assignee: "박개발",
      avatar: "https://via.placeholder.com/150",
      priority: "MEDIUM",
    },
    {
      id: 3,
      title: "이슈 3",
      category: "카테고리",
      type: "TASK",
      ticketId: "티켓 ID",
      status: "DONE",
      assignee: "이개발",
      avatar: "",
      priority: "LOW",
    },
    {
      id: 4,
      title: "이슈 4",
      category: "카테고리",
      type: "EPIC",
      ticketId: "티켓 ID",
      status: "DONE",
      assignee: "최개발",
      avatar: "",
      priority: "LOW",
    },
    {
      id: 5,
      title: "이슈 5",
      category: "카테고리",
      type: "STORY",
      ticketId: "티켓 ID",
      status: "DONE",
      assignee: "정개발",
      avatar: "",
      priority: "LOW",
    },
  ];

  return (
    <div>
      <div className="issues-header">
        <div className="board-header">
          <div>
            <SearchInput />
          </div>
          <div>
            <Button
              type="register"
              onClick={() => setIsCreateIssueModalOpen(true)}
            >
              Create
            </Button>
          </div>
        </div>
        {/* 보는 방식 선택 TAP . (list, kanban) */}
        <div className="issues-ui-filter">
          <button
            className={viewMode === "LIST" ? "active" : ""}
            onClick={() => handleViewModeChange("LIST")}
          >
            List
          </button>
          <button
            className={viewMode === "KANBAN" ? "active" : ""}
            onClick={() => handleViewModeChange("KANBAN")}
          >
            Kanban
          </button>
        </div>
        <div className="flex gap-2 md-sm">
          {/* filter : 	Category	Type	Status	Assignee	필터링 가능. */}
          <div>
            <select>
              <option value="all">필터</option>
              <option value="category">Category</option>
              <option value="type">Type</option>
              <option value="status">Status</option>
              <option value="assignee">Assignee</option>
            </select>
          </div>
          {/* group by : Category	Type	Status	Assignee 그룹화 가능. */}
          <div>
            <select>
              <option value="all">그룹화</option>
              <option value="category">Category</option>
              <option value="type">Type</option>
              <option value="status">Status</option>
              <option value="assignee">Assignee</option>
            </select>
          </div>
        </div>
      </div>
      {viewMode === "LIST" && <ListPage dummyData={dummyData} />}
      {viewMode === "KANBAN" && (
        <div className="issues-kanban">
          <BoardPage dummyData={dummyData} />
        </div>
      )}

      <CreateIssueModal
        isOpen={isCreateIssueModalOpen}
        onClose={() => setIsCreateIssueModalOpen(false)}
      />
    </div>
  );
};

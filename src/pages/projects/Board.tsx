import { Button } from "../../components/ui/Button";
import { SearchInput } from "../../components/ui/SearchInput";
import { Avatar } from "../../components/ui/Avatar";
import { useState } from "react";
import { CreateIssueModal } from "./components/CreateIusseModal";

// 우선순위 아이콘 컴포넌트
const PriorityIcon = ({ priority }: { priority: string }) => {
  const getPriorityDisplay = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return (
          <div className="priority-lines priority-high">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        );
      case "MEDIUM":
        return (
          <div className="priority-lines priority-medium">
            <div className="line"></div>
            <div className="line"></div>
          </div>
        );
      case "LOW":
        return (
          <div className="priority-lines priority-low">
            <div className="line"></div>
          </div>
        );
      default:
        return null;
    }
  };

  return getPriorityDisplay(priority);
};

export const BoardPage = () => {
  const dummyData = [
    {
      id: 1,
      title: "이슈 1",
      category: "카테고리",
      type: "타입 아이콘",
      ticketId: "티켓 ID",
      status: "TODO",
      manager: "김개발",
      avatar: "https://via.placeholder.com/150",
      priority: "HIGH",
    },
    {
      id: 2,
      title: "이슈 2",
      category: "카테고리",
      type: "타입 아이콘",
      ticketId: "티켓 ID",
      status: "IN_PROGRESS",
      manager: "박개발",
      avatar: "https://via.placeholder.com/150",
      priority: "MEDIUM",
    },
    {
      id: 3,
      title: "이슈 3",
      category: "카테고리",
      type: "타입 아이콘",
      ticketId: "티켓 ID",
      status: "DONE",
      manager: "이개발",
      avatar: "",
      priority: "LOW",
    },
    {
      id: 4,
      title: "이슈 4",
      category: "카테고리",
      type: "타입 아이콘",
      ticketId: "티켓 ID",
      status: "DONE",
      manager: "최개발",
      avatar: "",
      priority: "LOW",
    },
    {
      id: 5,
      title: "이슈 5",
      category: "카테고리",
      type: "타입 아이콘",
      ticketId: "티켓 ID",
      status: "DONE",
      manager: "정개발",
      avatar: "",
      priority: "LOW",
    },
  ];

  const statusList = ["TODO", "IN_PROGRESS", "DONE"];

  const [isCreateIssueModalOpen, setIsCreateIssueModalOpen] = useState(false);

  return (
    <div>
      <div className="board-container">
        <div className="board-header">
          <div>
            <SearchInput />
          </div>
          <div>
            <Button
              type="register"
              onClick={() => setIsCreateIssueModalOpen(true)}
            >
              새 이슈
            </Button>
          </div>
        </div>
        <div className="kanban-board">
          {statusList.map((status) => (
            <div className="kanban-board-column" key={status}>
              <div className="kanban-board-content">
                <div className="kanban-board-content-header">
                  <h3>{status}</h3>
                </div>
                <div className="kanban-board-content-body">
                  {dummyData
                    .filter((item) => item.status === status)
                    .map((item) => (
                      <div
                        className="kanban-board-content-body-item"
                        key={item.id}
                      >
                        <h4>{item.title}</h4>
                        <p>{item.category}</p>
                        <div className="flex justify-between ">
                          <div>
                            <span>{item.type}</span>
                            <span>{item.ticketId}</span>
                          </div>
                          <div className="flex items-center gap-5">
                            <PriorityIcon priority={item.priority} />
                            <Avatar
                              size={25}
                              name={item.manager}
                              src={item.avatar}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <CreateIssueModal
        isOpen={isCreateIssueModalOpen}
        onClose={() => setIsCreateIssueModalOpen(false)}
      />
    </div>
  );
};

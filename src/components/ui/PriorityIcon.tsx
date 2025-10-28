export const PriorityIcon = ({ priority }: { priority: string }) => {
  const getPriorityDisplay = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            className="priority-icon priority-high"
          >
            <line
              x1="2"
              y1="3"
              x2="14"
              y2="3"
              stroke="#ef4444"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <line
              x1="2"
              y1="8"
              x2="14"
              y2="8"
              stroke="#ef4444"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <line
              x1="2"
              y1="13"
              x2="14"
              y2="13"
              stroke="#ef4444"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        );
      case "MEDIUM":
        return (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            className="priority-icon priority-medium"
          >
            <line
              x1="2"
              y1="5"
              x2="14"
              y2="5"
              stroke="#fbbf24"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <line
              x1="2"
              y1="11"
              x2="14"
              y2="11"
              stroke="#fbbf24"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        );
      case "LOW":
        return (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            className="priority-icon priority-low"
          >
            <line
              x1="2"
              y1="8"
              x2="14"
              y2="8"
              stroke="#22c55e"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return getPriorityDisplay(priority);
};

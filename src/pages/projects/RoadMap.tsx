import { useState, useEffect } from "react";

interface Epic {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "completed" | "in-progress" | "planned";
  assignee?: string;
  color: string;
}

interface TimelineDate {
  date: string;
  label: string;
  isWeekend: boolean;
}

export const RoadMapPage = () => {
  const [timelineDateWidth, setTimelineDateWidth] = useState(120);

  // 컨테이너 너비와 타임라인 날짜 너비 계산
  useEffect(() => {
    const calculateWidths = () => {
      const container = document.querySelector(".timeline-container");
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const availableWidth = containerRect.width - 200; // 에픽 정보 열 너비 제외
        const baseTimelineWidth = 12 * 120; // 기본 타임라인 너비 (12개월 * 120px)

        if (availableWidth > baseTimelineWidth) {
          // 추가 공간을 12로 나누어 각 날짜에 분배
          const extraWidth = availableWidth - baseTimelineWidth;
          const additionalWidthPerMonth = extraWidth / 12;
          setTimelineDateWidth(120 + additionalWidthPerMonth);
        } else {
          setTimelineDateWidth(120);
        }
      }
    };

    calculateWidths();
    window.addEventListener("resize", calculateWidths);

    return () => window.removeEventListener("resize", calculateWidths);
  }, []);
  // 타임라인 날짜 생성 (2024년 1월-12월)
  const generateTimelineDates = (): TimelineDate[] => {
    const dates: TimelineDate[] = [];
    const months = [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ];

    months.forEach((month, index) => {
      dates.push({
        date: `2024-${String(index + 1).padStart(2, "0")}-01`,
        label: month,
        isWeekend: false,
      });
    });

    return dates;
  };

  const timelineDates = generateTimelineDates();

  const epics: Epic[] = [
    {
      id: "epic-1",
      name: "프로젝트 기초 설정",
      description: "프로젝트 구조 및 환경 설정",
      startDate: "2024-01-01",
      endDate: "2024-02-10",
      status: "completed",
      assignee: "김개발",
      color: "#10B981",
    },
    {
      id: "epic-2",
      name: "사용자 인증 시스템",
      description: "로그인/회원가입 기능 구현",
      startDate: "2024-02-01",
      endDate: "2024-02-15",
      status: "completed",
      assignee: "박백엔드",
      color: "#3B82F6",
    },
    {
      id: "epic-3",
      name: "프로젝트 관리",
      description: "프로젝트 생성, 수정, 삭제 기능",
      startDate: "2024-03-01",
      endDate: "2024-04-01",
      status: "completed",
      assignee: "이프론트",
      color: "#8B5CF6",
    },
    {
      id: "epic-4",
      name: "사이드바 네비게이션",
      description: "프로젝트 내 네비게이션 메뉴",
      startDate: "2024-04-01",
      endDate: "2024-05-01",
      status: "completed",
      assignee: "최UI",
      color: "#F59E0B",
    },
    {
      id: "epic-5",
      name: "칸반 보드",
      description: "태스크 관리 보드 구현",
      startDate: "2024-05-01",
      endDate: "2024-06-01",
      status: "in-progress",
      assignee: "김개발",
      color: "#EF4444",
    },
    {
      id: "epic-6",
      name: "드래그 앤 드롭",
      description: "태스크 이동 기능",
      startDate: "2024-06-01",
      endDate: "2024-07-01",
      status: "planned",
      assignee: "박백엔드",
      color: "#06B6D4",
    },
    {
      id: "epic-7",
      name: "이슈 추적",
      description: "버그 및 이슈 관리 시스템",
      startDate: "2024-07-01",
      endDate: "2024-08-01",
      status: "planned",
      assignee: "이프론트",
      color: "#84CC16",
    },
    {
      id: "epic-8",
      name: "리포팅",
      description: "프로젝트 진행률 리포트",
      startDate: "2024-08-01",
      endDate: "2024-09-01",
      status: "planned",
      assignee: "최UI",
      color: "#F97316",
    },
    {
      id: "epic-9",
      name: "성능 최적화",
      description: "애플리케이션 성능 개선",
      startDate: "2024-09-01",
      endDate: "2024-10-01",
      status: "planned",
      assignee: "김개발",
      color: "#EC4899",
    },
    {
      id: "epic-10",
      name: "모바일 지원",
      description: "모바일 반응형 UI 구현",
      startDate: "2024-10-01",
      endDate: "2024-11-01",
      status: "planned",
      assignee: "박백엔드",
      color: "#14B8A6",
    },
    {
      id: "epic-11",
      name: "API 문서화",
      description: "REST API 문서 작성",
      startDate: "2024-11-01",
      endDate: "2024-12-01",
      status: "planned",
      assignee: "이프론트",
      color: "#F59E0B",
    },
  ];

  // 날짜를 픽셀 위치로 변환하는 함수 (월과 일 모두 고려)
  const getDatePosition = (date: string): number => {
    const targetDate = new Date(date);
    const month = targetDate.getMonth(); // 0-11
    const day = targetDate.getDate(); // 1-31

    // 월 단위 위치 + 일 단위 위치
    const monthPosition = month * timelineDateWidth;
    const dayPosition = (day - 1) * (timelineDateWidth / 30); // 하루당 픽셀

    return monthPosition + dayPosition;
  };

  // 에픽의 실제 기간(날짜 수)을 계산하는 함수
  const getEpicDuration = (startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end.getTime() - start.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // 시작일과 종료일 포함
    return daysDiff;
  };

  // 에픽의 시작 위치와 너비 계산 (실제 기간 기반)
  const getEpicStyle = (epic: Epic) => {
    const startPos = getDatePosition(epic.startDate);
    const duration = getEpicDuration(epic.startDate, epic.endDate);

    // 하루당 픽셀 계산 (한 달을 평균 30일로 가정)
    const pixelsPerDay = timelineDateWidth / 30;
    const width = duration * pixelsPerDay;

    return {
      marginLeft: `${startPos}px`,
      width: `${width}px`,
      backgroundColor: epic.color,
      opacity:
        epic.status === "completed"
          ? 1
          : epic.status === "in-progress"
          ? 0.8
          : 0.6,
    };
  };

  return (
    <div className="roadmap-page">
      <div className="timeline-container">
        {/* 타임라인 헤더 (날짜) */}
        <div className="timeline-header">
          <div className="timeline-labels">
            <div className="epic-label-header">에픽</div>
          </div>
          <div className="timeline-dates-scrollable">
            {timelineDates.map((date) => (
              <div
                key={date.date}
                className="timeline-date"
                style={{ width: `${timelineDateWidth}px` }}
              >
                <div className="date-label">{date.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 에픽 타임라인 */}
        <div className="timeline-content">
          {epics.map((epic) => (
            <div key={epic.id} className="epic-row">
              <div className="epic-info">
                <div className="epic-name">{epic.name}</div>
                <div className="epic-assignee">{epic.assignee}</div>
              </div>
              <div className="epic-timeline-scrollable">
                <div className="epic-bar" style={getEpicStyle(epic)}>
                  <div className="epic-bar-content">
                    <span className="epic-bar-text">{epic.name}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

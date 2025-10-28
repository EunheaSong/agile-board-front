import { Modal } from "../../../components/ui/Modal";
import { Button } from "../../../components/ui/Button";
import { TextEditor } from "../../../components/ui/TextEditor";
import { useState } from "react";
import { ISSUE_TYPES } from "../../../utils/constants";

interface CreateIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateIssueModal = ({
  isOpen,
  onClose,
}: CreateIssueModalProps) => {
  const [step, setStep] = useState(1);
  const [description, setDescription] = useState("");

  const handleNextStep = () => {
    setStep(step + 1);
  };
  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleDescriptionChange = (content: string) => {
    setDescription(content);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="새 이슈 생성">
      {/* 이슈 depth 1 */}
      {step === 1 && (
        <div>
          <div className="flex flex-col gap-2">
            <h3>CreateIssueModal</h3>
            <p className="form-label-text">Title</p>
            <input type="text" />
            <p className="form-label-text">Type</p>
            <select>
              {ISSUE_TYPES.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div className="modal-actions">
            <Button type="cancel" onClick={onClose}>
              Cancel
            </Button>
            <Button type="register" onClick={handleNextStep}>
              Next
            </Button>
          </div>
        </div>
      )}
      {/* 이슈 depth 2 */}
      {step === 2 && (
        <div className="issue-create-form">
          <div className="issue-form-content">
            {/* 좌측 영역 - 이슈 본문 (70%) */}
            <div className="issue-main-content">
              <div className="form-group">
                <p className="form-label-text">제목</p>
                <input
                  type="text"
                  className="form-input"
                  placeholder="이슈 제목을 입력하세요"
                />
              </div>
              <div className="form-group">
                {/* <p className="form-label-text">설명</p> */}
                <TextEditor
                  placeholder="이슈에 대한 상세 설명을 입력하세요"
                  onChange={handleDescriptionChange}
                  className="issue-description-editor"
                  initialValue=""
                />
              </div>
            </div>

            {/* 우측 영역 - 메타데이터 (30%) */}
            <div className="issue-sidebar">
              <div className="form-group">
                <p className="form-label-text">담당자</p>
                <input
                  type="text"
                  className="form-input"
                  placeholder="담당자 선택"
                />
              </div>
              <div className="form-group">
                <p className="form-label-text">카테고리</p>
                <select className="form-select">
                  <option value="">카테고리 선택</option>
                  <option value="bug">버그</option>
                  <option value="feature">기능</option>
                  <option value="improvement">개선</option>
                </select>
              </div>
              <div className="form-group">
                <p className="form-label-text">우선순위</p>
                <select className="form-select">
                  <option value="">우선순위 선택</option>
                  <option value="HIGH">높음</option>
                  <option value="MEDIUM">중간</option>
                  <option value="LOW">낮음</option>
                </select>
              </div>
              <div className="form-group">
                <p className="form-label-text">시작 일자</p>
                <input type="date" className="form-input" />
              </div>
              <div className="form-group">
                <p className="form-label-text">완료 예정 일자</p>
                <input type="date" className="form-input" />
              </div>
              <div className="form-group">
                <p className="form-label-text">상위 이슈</p>
                <input
                  type="text"
                  className="form-input"
                  placeholder="상위 이슈 선택"
                />
              </div>
              <div className="form-group">
                <p className="form-label-text">깃 연결</p>
                <input
                  type="text"
                  className="form-input"
                  placeholder="깃허브 링크"
                />
              </div>
            </div>
          </div>

          <div className="modal-actions">
            <Button type="cancel" onClick={handlePreviousStep}>
              Back
            </Button>
            <Button type="register" onClick={handleNextStep}>
              Create
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

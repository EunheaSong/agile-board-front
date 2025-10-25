import { useState } from "react";
import { Modal } from "../../../components/ui/Modal";
import { Button } from "../../../components/ui/Button";
import { Avatar } from "../../../components/ui/Avatar";

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleCreateProject: (data: { thumbnail?: File }) => void;
}

export const CreateModal = ({
  isOpen,
  onClose,
  handleCreateProject,
}: CreateModalProps) => {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setThumbnail(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleRemoveThumbnail = () => {
    setThumbnail(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="새 프로젝트 생성">
      <div className="create-project-form">
        {/* 썸네일 업로드 영역 */}
        <div className="thumbnail-upload-section">
          <div className="thumbnail-upload-container">
            {previewUrl ? (
              <div className="thumbnail-preview">
                <Avatar src={previewUrl} alt="프로젝트 썸네일" size={100} />
                <button
                  type="button"
                  className="thumbnail-remove"
                  onClick={handleRemoveThumbnail}
                  title="썸네일 제거"
                >
                  ×
                </button>
              </div>
            ) : (
              <label className="thumbnail-upload-button">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="thumbnail-input"
                />
                <Avatar size={100} />
              </label>
            )}
          </div>
        </div>
        <div className="form-group">
          <input type="text" placeholder=" " className="form-input-light" />
          <label className="form-label">이름</label>
        </div>
        <div className="form-group">
          <input type="text" placeholder=" " className="form-input-light" />
          <label className="form-label">키</label>
        </div>
        <div className="form-group">
          <input type="text" placeholder=" " className="form-input-light" />
          <label className="form-label">타입</label>
        </div>
        <div className="form-group">
          <input type="text" placeholder=" " className="form-input-light" />
          <label className="form-label">리더</label>
        </div>
        <div className="form-group">
          <textarea placeholder=" " className="form-input-light" />
          <label className="form-label">설명</label>
        </div>
        <div className="modal-actions">
          <Button type="cancel" onClick={onClose}>
            취소
          </Button>
          <Button
            type="register"
            onClick={() =>
              handleCreateProject({ thumbnail: thumbnail || undefined })
            }
          >
            생성
          </Button>
        </div>
      </div>
    </Modal>
  );
};

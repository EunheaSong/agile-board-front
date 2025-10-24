import type { ReactNode } from "react";

interface ButtonProps {
  type: "delete" | "register" | "cancel";
  onClick: () => void;
  children?: ReactNode;
  disabled?: boolean;
  className?: string;
}

export const Button = ({
  type,
  onClick,
  children,
  disabled = false,
  className = "",
}: ButtonProps) => {
  const getButtonClass = () => {
    const baseClass = "btn";
    const typeClass = `btn-${type}`;
    const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";
    return `${baseClass} ${typeClass} ${disabledClass} ${className}`.trim();
  };

  const getDefaultText = () => {
    switch (type) {
      case "delete":
        return "삭제";
      case "register":
        return "등록";
      case "cancel":
        return "취소";
      default:
        return "";
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={getButtonClass()}
    >
      {children || getDefaultText()}
    </button>
  );
};

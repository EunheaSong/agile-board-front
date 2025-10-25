import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";

interface NavButtonProps {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export const NavButton = ({
  to,
  children,
  className = "",
  onClick,
  disabled = false,
  type = "button",
}: NavButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (disabled) return;

    if (onClick) {
      onClick();
    }

    navigate(to);
  };

  return (
    <button
      type={type}
      className={`nav-button ${className}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

import type { ReactNode } from "react";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
  fallback?: ReactNode;
  name?: string; // 사용자 이름 (첫 글자 표시용)
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const Avatar = ({
  src,
  alt = "Avatar",
  size,
  width,
  height,
  fallback,
  name,
  className = "",
  onClick,
  disabled = false,
}: AvatarProps) => {
  // 크기 설정: size가 있으면 정사각형, width/height가 있으면 각각 적용
  const avatarSize = size ? { width: size, height: size } : { width, height };

  // fallback 결정: 사용자 이름이 있으면 첫 글자, 없으면 빈 회색 원형
  const getFallback = () => {
    if (fallback) return fallback;

    if (name) {
      return (
        <div className="avatar-initial">{name.charAt(0).toUpperCase()}</div>
      );
    }

    // 빈 회색 원형 (아이콘 없음)
    return null;
  };

  const avatarContent = src ? (
    <img src={src} alt={alt} className="avatar-image" style={avatarSize} />
  ) : (
    getFallback()
  );

  return (
    <div
      className={`avatar ${className} ${onClick ? "avatar-clickable" : ""} ${
        disabled ? "avatar-disabled" : ""
      }`}
      style={avatarSize}
      onClick={disabled ? undefined : onClick}
    >
      {avatarContent}
    </div>
  );
};

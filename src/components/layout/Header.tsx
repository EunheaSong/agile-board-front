import { Logo } from "../ui/Logo";
import { ThemeToggle } from "../ui/ThemeToggle";

// 헤더 컴포넌트
export const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <Logo />
        <div className="header-actions">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

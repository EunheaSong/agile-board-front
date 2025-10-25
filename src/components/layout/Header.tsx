import { Logo } from "../ui/Logo";
import { ThemeToggle } from "../ui/ThemeToggle";
import { NavButton } from "../ui/NavButton";
import { routes } from "../../router/routes";
import { UserMenu } from "../ui/UserMenu";

// 헤더 컴포넌트
export const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <Logo />
        <div className="header-nav">
          <NavButton to={routes.projects()}>Projects</NavButton>
        </div>
        <div className="header-actions">
          <UserMenu />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

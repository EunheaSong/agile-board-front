import type { ReactNode } from "react";
import { Logo } from "../../components/ui/Logo";

interface AuthPageProps {
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export const AuthPage = ({
  title,
  description,
  children,
  footer,
}: AuthPageProps) => {
  return (
    <div className="auth-page-light">
      <div className="auth-container-light">
        <div className="auth-header">
          <Logo />
          {description && (
            <p className="auth-description text-gray-600">{description}</p>
          )}
          <h2 className="auth-title text-gray-800">{title}</h2>
        </div>

        <div className="auth-form">{children}</div>

        {footer && <div className="auth-footer text-center">{footer}</div>}
      </div>
    </div>
  );
};

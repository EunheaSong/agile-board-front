import { useState } from "react";
import { authApi } from "../../api/auth";
import { ROUTES } from "../../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { AuthPage } from "./AuthPage";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await authApi.login({ email, password });

      if (response.token) {
        localStorage.setItem("token", response.token);
        navigate(ROUTES.HOME);
      }
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  const footer = (
    <p className="text-gray-600">
      아직 계정이 없으신가요?{" "}
      <Link to={ROUTES.SIGNUP} className="text-primary font-semibold">
        회원가입
      </Link>
    </p>
  );

  return (
    <AuthPage
      title="로그인"
      // description="Enterprise Project Management Solution"
      footer={footer}
    >
      <div className="form-group">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder=" "
          className="form-input-light"
        />
        <label className="form-label">이메일</label>
      </div>
      <div className="form-group">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder=" "
          className="form-input-light"
        />
        <label className="form-label">비밀번호</label>
      </div>
      <button onClick={handleLogin} className="btn btn-primary w-full">
        로그인
      </button>
    </AuthPage>
  );
};

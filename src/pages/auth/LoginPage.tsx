import { useState } from "react";
import { authApi } from "../../api/auth";
import { ROUTES } from "../../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../../components/ui/Logo";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await authApi.login({ email, password });

    if (response.token) {
      localStorage.setItem("token", response.token);
      navigate(ROUTES.HOME);
    }
  };

  return (
    <div className="">
      <div className="">
        <div>
          <Logo />
          <p className="logo-description">
            Enterprise Project Management Solution
          </p>
          <h2 className="">로그인</h2>
        </div>
        <div className="">
          <p className="">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>로그인</button>
          </p>
        </div>
        <div>
          아직 계정이 없으신가요?
          <Link to={ROUTES.SIGNUP}>회원가입</Link>
        </div>
      </div>
    </div>
  );
};

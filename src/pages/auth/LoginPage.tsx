import { useState } from "react";
import { authApi } from "../../api/auth";
import { ROUTES } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            로그인
          </h2>
        </div>
        <div className="bg-white p-8 rounded-lg shadow">
          <p className="text-center text-gray-600">
            로그인 페이지 컴포넌트가 여기에 구현됩니다.
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
      </div>
    </div>
  );
};

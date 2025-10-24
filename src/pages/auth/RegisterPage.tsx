import { useState } from "react";
import { userApi } from "../../api/user";

export const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setPasswordConfirm] = useState("");

  const handleRegister = async () => {
    const response = await userApi.register({
      email,
      name,
      password,
      confirmPassword,
    });
    console.log(response);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            회원가입
          </h2>
        </div>
        <div className="bg-white p-8 rounded-lg shadow">
          <p className="text-center text-gray-600">
            회원가입 페이지 컴포넌트가 여기에 구현됩니다.
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일"
            />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="비밀번호 확인"
            />
            <button onClick={handleRegister}>회원가입</button>
          </p>
        </div>
      </div>
    </div>
  );
};

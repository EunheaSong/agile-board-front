import { useState } from "react";
import { userApi } from "../../api/user";
import { Button } from "../../components/ui/Button";

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
    <div className="">
      <div className="">
        <div>
          <h2 className="">회원가입</h2>
        </div>
        <div className="">
          <p className="">
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
            <Button type="register" onClick={handleRegister}>
              회원가입
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

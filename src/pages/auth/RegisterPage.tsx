import { useState } from "react";
import { userApi } from "../../api/user";
import { Button } from "../../components/ui/Button";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/constants";
import { AuthPage } from "./AuthPage";

export const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setPasswordConfirm] = useState("");

  const handleRegister = async () => {
    try {
      const response = await userApi.register({
        email,
        name,
        password,
        confirmPassword,
      });
      console.log(response);
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  const footer = (
    <p className="text-gray-600">
      이미 계정이 있으신가요?{" "}
      <Link to={ROUTES.SIGNIN} className="text-primary font-semibold">
        로그인
      </Link>
    </p>
  );

  return (
    <AuthPage title="회원가입" footer={footer}>
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
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder=" "
          className="form-input-light"
        />
        <label className="form-label">이름</label>
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
      <div className="form-group">
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          placeholder=" "
          className="form-input-light"
        />
        <label className="form-label">비밀번호 확인</label>
      </div>
      <Button type="register" onClick={handleRegister} className="w-full">
        회원가입
      </Button>
    </AuthPage>
  );
};

import { AuthContextConsumer } from "./contexts/AuthContexts";

export const LoginPage = () => {
  // AuthContextConsumer からログインユーザ、ログイン・ログアウト処理取得
  const { loginUser, login, logout } = AuthContextConsumer();
  return (
    <>
      <div className="user_info">
        <p className="user_name">
          {loginUser ? loginUser.displayName : "ゲスト"}
        </p>
        <button className="login_btn" onClick={loginUser ? logout : login}>
          {loginUser ? "logout" : "login"}
        </button>
      </div>
    </>
  );
};
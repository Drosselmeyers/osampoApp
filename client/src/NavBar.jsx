import { Link, useNavigate } from "react-router-dom";
import { AuthContextConsumer } from "./contexts/AuthContexts";

export const NavBar = () => {
  const { logout } = AuthContextConsumer();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (!confirm("ログアウトしますか？")) {
      return;
    }

    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("ログアウトエラー:", error);
      alert("ログアウトに失敗しました");
    }
  };
  return (
    <nav
      style={{
        backgroundColor: "#f2c057",
        padding: "1rem",
        marginBottom: "1rem",
      }}
    >
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          gap: "1.5rem",
          margin: 0,
          padding: 0,
        }}
      >
        <li>
          <Link
            to="/"
            style={{
              color: "black",
              fontWeight: "bold",
            }}
          >
            ホーム(Bingo)
          </Link>
        </li>
        <li>
          <Link
            to="/post"
            style={{
              color: "black",
              fontWeight: "bold",
            }}
          >
            投稿
          </Link>
        </li>
        <li>
          <Link
            to="/sampo"
            style={{
              color: "black",
              fontWeight: "bold",
            }}
          >
            お散歩
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            style={{
              color: "black",
              fontWeight: "bold",
            }}
          >
            プロフィール
          </Link>
        </li>
        <li>
          <Link
            to="/reminder"
            style={{
              color: "black",
              fontWeight: "bold",
            }}
          >
            リマインダー
          </Link>
        </li>
        <li style={{ marginLeft: "auto" }}>
          <button
            onClick={handleLogout}
            style={{
              color: "black",
              fontWeight: "bold",
              background: "none",
              cursor: "pointer",
              fontSize: "1rem",
              padding: 0,
            }}
          >
            ログアウト
          </button>
        </li>
      </ul>
    </nav>
  );
};

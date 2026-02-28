import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContextConsumer } from "./contexts/AuthContexts";

export function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUpWithEmail, signUpWithGoogle } = AuthContextConsumer();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // バリデーション
    if (!email || !password) {
      setError("すべてのフィールドを入力してください");
      return;
    }

    if (password.length < 8) {
      setError("パスワードは8文字以上にしてください");
      return;
    }

    setLoading(true);

    try {
      await signUpWithEmail(email, password);
      // 登録成功 → トップページへ
      navigate("/");
    } catch (err) {
      console.error("Sign up error:", err);
      // firebaseのエラーメッセージを日本語にする
      if (err.code === "auth/email-already-in-use") {
        setError("このメールアドレスは既に使用されています");
      } else if (err.code === "auth/weak-password") {
        setError("パスワードが弱すぎます");
      } else if (err.code === "auth/invalid-email") {
        setError("無効なメールアドレスです");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setError("");
    setLoading(true);
    try {
      await signUpWithGoogle();
      navigate("/");
    } catch (err) {
      console.error("Google signup error:", err);
      if (
        err.code === "auth/email-already-in-use" ||
        err.message.includes("already in use")
      ) {
        setError("このメールアドレスは既に使用されています");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <h2>新規ユーザー登録</h2>
        {error && <div>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">メールアドレス</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="password">パスワード</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              placeholder="8文字以上"
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "登録中..." : "登録"}
          </button>
        </form>

        <div>
          <hr />
          <button onClick={handleGoogleSignUp} disabled={loading} type="button">
            Googleで登録＆ログイン
          </button>
        </div>

        <div>
          <p>
            既にアカウントをお持ちですか？ <Link to="/login">ログイン</Link>
          </p>
        </div>
      </div>
    </>
  );
}

import { useState, useEffect } from "react";
import { AuthContextConsumer } from "./contexts/AuthContexts";
import { NavBar } from "./NavBar";
import "./Profile.css";

export const Profile = () => {
  // 1. 状態管理
  const { loginUser } = AuthContextConsumer();
  const [displayName, setDisplayName] = useState("");
  const [frequency, setFrequency] = useState("1");
  const [isNewUser, setIsNewUser] = useState(true);
  const [loading, setLoading] = useState(true);

  // 2. イベントハンドラー
  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = await loginUser.getIdToken();

    const url = isNewUser 
      ? "/api/profiles" 
      : `/api/profiles/${loginUser.uid}`;

    const method = isNewUser 
      ? "POST" 
      : "PUT";

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id: loginUser.uid,
        displayname: displayName,
        frequency: parseInt(frequency),
      }),
    });

    if (response.ok) {
      alert(isNewUser ? "登録しました" : "更新しました");
      setIsNewUser(false);
    } else {
      alert("保存に失敗しました");
    }
  };

  // 3. 副作用処理 - 初回レンダリング時に既存データを取得
  useEffect(() => {
    const fetchUserData = async () => {
      if (!loginUser) {
        return;
      }

      try {
        const token = await loginUser.getIdToken();
        const res = await fetch(`/api/profiles/${loginUser.uid}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (res.ok) {
          // 既存データがある場合
          const data = await res.json();
          setDisplayName(data.data.displayname);
          setFrequency(data.data.frequency.toString());
          setIsNewUser(false); // 更新モード
        } else if (res.status === 404) {
          // 新規ユーザー（エラーではない）
          setIsNewUser(true); // 登録モード
          console.log("新規ユーザーです");
        } else {
          // その他のエラー
          console.error("プロフィール取得エラー:", res.status);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [loginUser]);

  // 4. ローディング表示
  if (loading) {
    return <div>読み込み中...</div>;
  }

  // 5. 返り値構築
  return (
    <>
      <NavBar />
      <div className="profile-container">
        <h2>Profile {isNewUser ? "登録" : "更新"}</h2>

        <div className="profile-info">
          <p>User ID: {loginUser.uid}</p>
          <p>Email Address: {loginUser.email}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <p>今の表示名: {displayName}</p>
            <label>表示名</label>
            <input
              type="text"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              placeholder="Enter your display name"
              required
            />
          </div>

          <div className="form-group">
            <p>今のお散歩頻度: {frequency}</p>
            <label>お散歩頻度</label>
            <select
              value={frequency}
              onChange={(event) => setFrequency(event.target.value)}
              required
            >
              <option value="1">1日</option>
              <option value="3">3日</option>
              <option value="5">5日</option>
              <option value="7">7日</option>
            </select>
          </div>

          <button type="submit">{isNewUser ? "登録" : "更新"}</button>
        </form>
      </div>
    </>
  );
};

import { useState, useEffect } from "react";
import { AuthContextConsumer } from "./contexts/AuthContexts";
import { NavBar } from "./NavBar";
import "./Reminder.css";

export const Reminder = () => {
  // 1. 状態管理
  const { loginUser } = AuthContextConsumer();
  const [reminderData, setReminderData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 2. イベントハンドラー
  const handleSetReminder = async () => {
    // loginUserがいない場合に、loginUser.getIdToken()が動くのを防止
    if (!loginUser) {
      return;
    }

    const token = await loginUser.getIdToken();
    const res = await fetch("/api/reminders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      alert("リマインダーを設定しました");
      window.location.reload();
    } else {
      alert("設定に失敗しました");
    }
  };

  // 3. 副作用処理
  useEffect(() => {
    const fetchReminder = async () => {
      // loginUserがいない場合に、loginUser.getIdToken()が動くのを防止
      if (!loginUser) {
        return;
      }

      try {
        const token = await loginUser.getIdToken();
        const res = await fetch("/api/reminders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setReminderData(data.data);
          setLoading(false);
        } else if (res.status === 404) {
          setReminderData(null);
          setLoading(false);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setLoading(false);
      }
    };

    fetchReminder();
  }, [loginUser]);

  
  // 4. ローディング表示
  if (loading) {
    return <div>読み込み中...</div>;
  }

  // 5. 返り値構築
  return (
    <div className="reminder-container">
      <NavBar />
      <h2>リマインダー</h2>

      <div className="reminder-content">
        <button onClick={handleSetReminder}>
          {reminderData ? "更新" : "設定"}
        </button>

        {reminderData && (
          <div className="reminder-info">
            <p>
              最終設定日時:
              {new Date(reminderData.base_time).toLocaleString("ja-JP", {
                timeZone: "Asia/Tokyo",
              })}
            </p>
          </div>
        )}
      </div>

      {reminderData && reminderData.shouldRemind && (
        <p className="reminder-alert">お散歩に行きましょう！</p>
      )}
    </div>
  );
};

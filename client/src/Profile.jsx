import { useState, useEffect } from 'react';
import { AuthContextConsumer } from './contexts/AuthContexts';

export const Profile = () => {
  // 1. 状態管理
  const { loginUser } = AuthContextConsumer();
  const [displayName, setDisplayName] = useState('');
  const [frequency, setFrequency] = useState('1');
  const [isNewUser, setIsNewUser] = useState(true);

  // 2. イベントハンドラー
  const handleSubmit = async(event) => {
    // 下部のfetch処理が完了する前に、ページがリロードするのを防ぐ
    event.preventDefault();

    if (!loginUser) {
      console.log("!!!!!!loginUserがない");
      return;
    }

    const token = await loginUser.getIdToken();
    console.log("トークン", token);
    console.log("ユーザーID", loginUser.uid);

    const url = isNewUser
        ? '/api/profiles' 
        : `/api/profiles/${loginUser.uid}`; 
      
    const method = isNewUser 
      ? 'POST' 
      : 'PUT';
      
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ 
        user_id: loginUser.uid, 
        displayname: displayName,
        frequency: parseInt(frequency)
      }),
    });
    if (response.ok) {
      console.error('保存しました');
      setIsNewUser(false)
    } else {
      console.error(`保存に失敗しました:`);
    }
  }

  // 3. 副作用処理
  useEffect(() => {
    const fetchUserData = async () => {
      if (!loginUser) {
        console.log("****loginUserがない");
        return;
      }

      
      try {
        const token = await loginUser.getIdToken();
        const res = await fetch(`/api/profiles/${loginUser.uid}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        if (res.ok) {
          const data = await res.json();
          setDisplayName(data.data.displayname);
          setFrequency(data.data.frequency.toString());
          setIsNewUser(false); 
        } else if (res.status === 404) {
          setIsNewUser(true);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } 
    };

    fetchUserData();
  }, [loginUser]);

  // 4. 返り値構築
  return (
    <div>
      <h1>Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User ID: {loginUser ? loginUser.uid : "Not logged in"}</label>
        </div>
        <div>
          <label>Email: {loginUser ? loginUser.email : "Not logged in"}</label>
        </div>

        <div>
          <label>Display Name: </label>
          <input
            type="text"
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            placeholder="Enter your display name"
          />
        </div>

        <div>
          <label>Walking Frequency: </label>
          <select
            value={frequency}
            onChange={(event) => setFrequency(event.target.value)}
          >
            <option value="1">1 day</option>
            <option value="3">3 days</option>
            <option value="5">5 days</option>
            <option value="7">7 days</option>
          </select>
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

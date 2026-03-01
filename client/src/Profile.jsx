import { useState, useEffect } from 'react';
import { AuthContextConsumer } from './contexts/AuthContexts';

export const Profile = () => {
  // 1. 状態管理
  const { loginUser } = AuthContextConsumer();
  const [displayName, setDisplayName] = useState('');
  const [frequency, setFrequency] = useState('1');

  // 2. イベントハンドラー
  const handleSubmit = (event) => {
    // 下部のfetch処理が完了する前に、ページがリロードするのを防ぐ
    event.preventDefault();
    fetch(`/api/profiles/${loginUser.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        user_id: loginUser.id,
        displayName, 
        frequency 
    }),
    })
  }

  // 3. 副作用処理
  useEffect(() => {
    const fetchUserData = async () => {
      if (loginUser) {
        const res = await fetch(`/api/profiles/${loginUser.id}`);
        const data = await res.json();
        setDisplayName(data.displayName);
        setFrequency(data.frequency);
      } else {
       setDisplayName('displayName not found'); 
       setFrequency('1');
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
          <label>Display Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            placeholder="Enter your display name"
          />
        </div>

        <div>
          <label>Walking Frequency (days)</label>
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

        <button type="submit"></button>
      </form>
    </div>
  );
};

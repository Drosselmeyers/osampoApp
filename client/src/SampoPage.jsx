import { useEffect } from "react";
import { useState } from "react";
import { AuthContextConsumer } from "./contexts/AuthContexts";
import { useNavigate } from "react-router-dom";

export const SampoPage = () => {
  const { loginUser } = AuthContextConsumer();
  const [second, setSecond] = useState(localStorage.getItem("time"));
  const [click, setClick] = useState(false);
  const [timerId, setTimerId] = useState("");
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const timeTextMaker = (seconds) => {
    const hour = Math.floor(seconds / 3600);
    const min = Math.floor((seconds % 3600) / 60);
    const sec = seconds % 60;
    let hh;
    // hour が3桁以上の場合は左0埋めをしない
    hour < 100 ? (hh = `00${hour}`.slice(-2)) : (hh = hour);
    const mm = `00${min}`.slice(-2);
    const ss = `00${sec}`.slice(-2);
    let time = "";
    hour !== 0 ? (time = `${hh}:${mm}:${ss}`) : (time = `${mm}:${ss}`);
    return time;
  };
  const searchTimer = async () => {
    if (!loginUser) return;
    try {
      const getRequest = await fetch("/api/timer/" + loginUser.uid);
      const targetTimer = await getRequest.json();
      return targetTimer[0];
    } catch (error) {
      throw new Error(error.message);
    }
  };
  const postTimer = async () => {
    const targetTimer = await searchTimer();
    if (!targetTimer) {
      try {
        await fetch("/api/timer/" + loginUser.uid, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ time: second }),
        });
      } catch (error) {
        throw new Error(error.message);
      }
    } else {
      setSecond(targetTimer.time);
    }
  };
  const patchTimer = async () => {
    const targetTimer = await searchTimer();
    if (!targetTimer) return;
    try {
      await fetch("/api/timer/" + targetTimer.timer_id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ time: second }),
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  const startTimer = async () => {
    const timer = setInterval(() => {
      setSecond((prev) => prev + 1);
    }, 1000);
    setTimerId(timer);
    setClick(!click);
    postTimer();
  };
  const stopTimer = () => {
    clearInterval(timerId);
    setClick(!click);
  };
  const moveBingo = () => {
    const isMove = window.confirm("timerを一時停止します。");
    if (isMove) navigate("/bingo");
  };
  useEffect(() => {
    setText(timeTextMaker(second));
    localStorage.setItem("time", timeTextMaker(second));
    patchTimer();
  }, [second]);

  useEffect(() => {
    const get = async () => {
      if (!loginUser) return;
      const getRes = await searchTimer();
      if (getRes) {
        setSecond(getRes.time);
      } else {
        setSecond(0);
      }
    };
    get();
  }, []);

  return (
    <div>
      <h1>osampo timer</h1>
      {click ? (
        <button onClick={stopTimer}>stop</button>
      ) : (
        <button onClick={startTimer} className="sampo-timer-button">
          散歩を始める
        </button>
      )}
      <h2>{text}</h2>
      <button onClick={moveBingo}>ビンゴページ</button>
      <button onClick={() => console.log(text)}>散歩終了</button>
    </div>
  );
};

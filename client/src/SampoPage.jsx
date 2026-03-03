import { useEffect } from "react";
import { useState } from "react";
import { AuthContextConsumer } from "./contexts/AuthContexts";
import { useNavigate } from "react-router-dom";

export const SampoPage = () => {
  const { loginUser } = AuthContextConsumer();
  const [second, setSecond] = useState(0);
  const [twoSecond, setTwoSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [twoMinute, setTwoMinute] = useState(0);
  const [hour, setHour] = useState(0);
  const [twoHour, setTwoHour] = useState(0);
  const [click, setClick] = useState(false);
  const [timerId, setTimerId] = useState("");
  const [text, setText] = useState("");
  const navigate = useNavigate();

  function timeTextMaker(seconds) {
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
  }

  const createTimerData = () => {
    return {
      hour: `${twoHour}${hour}`,
      minute: `${twoMinute}${minute}`,
      second: `${twoSecond}${second}`,
    };
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
        const postRequest = await fetch("/api/timer/" + loginUser.uid, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(createTimerData()),
        });
        const res = await postRequest.json();
        setText(res.time);
      } catch (error) {
        throw new Error(error.message);
      }
    } else {
      setText(targetTimer.time);
    }
  };
  const patchTimer = async () => {
    const targetTimer = await searchTimer();
    if (!targetTimer) return;
    try {
      const patchResponse = await fetch("/api/timer/" + targetTimer.timer_id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hour: `${twoHour}${hour}`,
          minute: `${twoMinute}${minute}`,
          second: `${twoSecond}${second}`,
        }),
      });
      const res = await patchResponse.json();
      setText(res[0].time);
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
    /* 初めての押下だった場合post */
    postTimer();
  };
  const stopTimer = () => {
    clearTimeout(timerId);
    setClick(!click);
  };
  const moveBingo = () => {
    const isMove = window.confirm("移動するとtimerが消えてしまいます。");
    if (isMove) navigate("/bingo");
  };
  useEffect(() => {
    const countUpView = () => {
      if (second === 10) {
        setTwoSecond((prev) => prev + 1);
        setSecond(0);
      }
      if (twoSecond === 6) {
        setMinute((prev) => prev + 1);
        setTwoSecond(0);
      }
      if (minute === 10) {
        setTwoMinute((prev) => prev + 1);
        setMinute(0);
      }
      if (twoMinute === 6) {
        setHour((prev) => prev + 1);
        setTwoMinute(0);
      }
      if (hour === 10) {
        setTwoHour((prev) => prev + 1);
        setHour(0);
      }
    };
    countUpView();
    patchTimer();
  }, [second]);

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

import { useEffect } from "react";
import { useState } from "react";
import { AuthContextConsumer } from "./contexts/AuthContexts";

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

  const createTimerData = () => {
    return {
      hour: `${twoHour}${hour}`,
      minute: `${twoMinute}${minute}`,
      second: `${twoSecond}${second}`,
    };
  };
  const searchTimer = async () => {
    if (!loginUser) return;
    const foo = await fetch("/api/timer/" + loginUser.uid);
    const result = await foo.json();
    return result[0];
  };
  const postTimer = async () => {
    const targetTimer = await searchTimer();
    if (!targetTimer) {
      const postRequest = await fetch("/api/timer/" + loginUser.uid, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createTimerData()),
      });
      const res = await postRequest.json();
      setText(res.time);
    } else {
      setText(targetTimer.time);
    }
  };
  const patchTimer = async () => {
    const targetTimer = await searchTimer();
    if (!targetTimer) return;
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
      <button onClick={() => console.log(text)}>散歩終了</button>
    </div>
  );
};

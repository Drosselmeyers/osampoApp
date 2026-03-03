import { useEffect } from "react";
import { useState } from "react";

export const SampoPage = () => {
  const [second, setSecond] = useState(0);
  const [twoSecond, setTwoSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [twoMinute, setTwoMinute] = useState(0);
  const [hour, setHour] = useState(0);
  const [twoHour, setTwoHour] = useState(0);
  const [click, setClick] = useState(false);
  const [timerId, setTimerId] = useState("");
  const [text, setText] = useState("");

  const startTimer = () => {
    const timer = setInterval(() => {
      setSecond((prev) => prev + 1);
    }, 1000);
    setTimerId(timer);
    setClick(!click);
  };
  const stopTimer = () => {
    clearTimeout(timerId);
    setClick(!click);
  };
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

  useEffect(() => {
    countUpView();
    localStorage.setItem(
      "timer",
      JSON.stringify({
        hour: `${twoHour}${hour}`,
        minute: `${twoMinute}${minute}`,
        second: `${twoSecond}${second}`,
      }),
    );
    const timerData = JSON.parse(localStorage.getItem("timer"));
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
      <h2>{`${twoHour}${hour}:${twoMinute}${minute}:${twoSecond}${second}`}</h2>
    </div>
  );
};

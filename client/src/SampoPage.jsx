import { useEffect } from "react";
import { useState } from "react";
import { AuthContextConsumer } from "./contexts/AuthContexts";
import { NavBar } from "./NavBar";
import { motion } from "motion/react";
import "./SampoPage.css";

export const SampoPage = () => {
  const { loginUser } = AuthContextConsumer();
  const [second, setSecond] = useState(localStorage.getItem("time"));
  const [click, setClick] = useState(false);
  const [timerId, setTimerId] = useState("");
  const [text, setText] = useState("");
  const [login, setLogin] = useState(false);

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
  const resetTimer = async () => {
    const isReset = window.confirm("タイマーをリセットしますか？");
    if (isReset) {
      const targetTimer = await searchTimer();
      await fetch("/api/sampo/" + targetTimer.timer_id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ time: 0 }),
      });
      localStorage.setItem("time", timeTextMaker(0));
      setText(timeTextMaker(0));
      setSecond(0);
    }
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
    setTimeout(() => {
      setLogin(true);
    }, 1000);
  }, []);

  return (
    <>
      {login ? (
        <>
          <NavBar />
          <div className="sampo-main-container">
            <h1 className="sampo-title">
              osampo <br />
              Timer
            </h1>
            <div className="sampo-anime-container">
              <h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`sampo-timer-text ${click && "click"}`}
              >
                {text}
              </h2>
            </div>
            <div className="sampo-button-container">
              {click ? (
                <motion.button
                  whileTap={{ y: 10 }}
                  transition={{ direction: 1 }}
                  className="sampo-timer-button"
                  onClick={stopTimer}
                >
                  STOP
                </motion.button>
              ) : (
                <motion.button
                  whileTap={{ y: 10 }}
                  transition={{ direction: 1 }}
                  onClick={startTimer}
                  className="sampo-timer-button"
                >
                  START
                </motion.button>
              )}
              <motion.button
                whileTap={{ y: 10 }}
                transition={{ direction: 1 }}
                className="sampo-timer-button"
                onClick={resetTimer}
                style={{ backgroundColor: "#D13525" }}
              >
                RESET
              </motion.button>
            </div>
          </div>
        </>
      ) : (
        <div>読み込み中..</div>
      )}
    </>
  );
};

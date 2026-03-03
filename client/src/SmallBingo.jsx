import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import "./SmallBingo.css";

export const SmallBingo = () => {
  const [bingoList, setBingoList] = useState([]);
  const [targetIndex, setTargetIndex] = useState(null);
  const [bingoCount, setBingoCount] = useState(0);
  const navigate = useNavigate();

  const testRowCreator = () => {
    return [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ];
  };
  const changeStatus = (index) => {
    const newArray = [...bingoList];
    newArray[index].status = true;
    setBingoList([...newArray]);
  };
  const patchStatus = async (index) => {
    const targetBingoId = bingoList[index].bingo_id;
    await fetch("/api/smallBingo/" + targetBingoId, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });
  };
  const resetBingo = async () => {
    const reset = window.confirm("リセットする？");
    if (reset) {
      await fetch("/api/smallBingo", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });
      bingoList.map((obj) => (obj.status = false));
      const bingoPanel = bingoList.find((obj) => obj.title === "Bingo");
      bingoPanel.status = true;
      setBingoList([...bingoList]);
      setBingoCount(0);
    }
  };

  const alreadyBingoChecker = (allRow, index) => {
    const find = allRow.find((array) => array.includes(index));
    if (!find) return;
    const alreadyBingo = find.every((index) => bingoList[index].status);
    return alreadyBingo;
  };
  const rowChecker = (index) => {
    const [firstRow, secondeRow, thirdRow] = testRowCreator();
    if (firstRow.includes(index)) {
      const firstRowBingo = firstRow.every((index) => bingoList[index].status);
      if (firstRowBingo) setBingoCount((prev) => prev + 1);
    }
    if (secondeRow.includes(index)) {
      const secondRowBingo = secondeRow.every(
        (index) => bingoList[index].status,
      );
      if (secondRowBingo) setBingoCount((prev) => prev + 1);
    }
    if (thirdRow.includes(targetIndex)) {
      const thirdRowBingo = thirdRow.every((index) => bingoList[index].status);
      if (thirdRowBingo) setBingoCount((prev) => prev + 1);
    }
  };
  const testColumnCreator = () => {
    return [
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];
  };
  const columnChecker = (index) => {
    const [firstColumn, secondeColumn, thirdColumn] = testColumnCreator();
    if (firstColumn.includes(index)) {
      const firstColumnBingo = firstColumn.every(
        (index) => bingoList[index].status,
      );
      if (firstColumnBingo) setBingoCount((prev) => prev + 1);
    }
    if (secondeColumn.includes(index)) {
      const secondColumnBingo = secondeColumn.every(
        (index) => bingoList[index].status,
      );
      if (secondColumnBingo) setBingoCount((prev) => prev + 1);
    }
    if (thirdColumn.includes(targetIndex)) {
      const thirdColumnBingo = thirdColumn.every(
        (index) => bingoList[index].status,
      );
      if (thirdColumnBingo) setBingoCount((prev) => prev + 1);
    }
  };
  const testDiagonallyCreator = () => {
    return [
      [0, 4, 8],
      [2, 4, 6],
    ];
  };
  const diagonallyChecker = (index) => {
    const [firstDiagonally, secondeDiagonally] = testDiagonallyCreator();
    if (firstDiagonally.includes(index)) {
      const firstDiagonallyBingo = firstDiagonally.every(
        (index) => bingoList[index].status,
      );
      if (firstDiagonallyBingo) setBingoCount((prev) => prev + 1);
    }
    if (secondeDiagonally.includes(index)) {
      const secondDiagonallyBingo = secondeDiagonally.every(
        (index) => bingoList[index].status,
      );
      if (secondDiagonallyBingo) setBingoCount((prev) => prev + 1);
    }
  };
  const shuffleArray = (array) => {
    const cloneArray = [...array];
    const result = cloneArray.reduce((_, cur, index) => {
      let rand = Math.floor(Math.random() * (index + 1));
      cloneArray[index] = cloneArray[rand];
      cloneArray[rand] = cur;
      return cloneArray;
    });
    return result;
  };
  const randomPanel = () => {
    const bingoPanel = bingoList.find((obj) => obj.title === "Bingo");
    const shuffled = shuffleArray([...bingoList]);
    const bingoIndex = shuffled
      .map((obj) => JSON.stringify(obj))
      .indexOf(JSON.stringify(bingoPanel));
    const cash = shuffled[bingoIndex];
    const temp = shuffled[4];
    shuffled[4] = cash;
    shuffled[bingoIndex] = temp;
    setBingoList([...shuffled]);
  };

  /* 初回のbingoPanel表示 */
  useEffect(() => {
    const getBingoData = async () => {
      const response = await fetch("/api/smallBingo");
      const allBingoData = await response.json();
      const bingoPanel = allBingoData.find((obj) => obj.title === "Bingo");
      bingoPanel.status = true;
      setBingoList(allBingoData);
    };
    getBingoData();
  }, []);

  /* clickが変わるたびに列が揃っているかの精査 */
  useEffect(() => {
    const testRowBingo = () => {
      if (targetIndex === null) return;
      if (alreadyBingoChecker(testRowCreator(), targetIndex)) return;
      if (alreadyBingoChecker(testColumnCreator(), targetIndex)) return;
      if (alreadyBingoChecker(testDiagonallyCreator(), targetIndex)) return;
      changeStatus(targetIndex);
      patchStatus(targetIndex);
      rowChecker(targetIndex);
      columnChecker(targetIndex);
      diagonallyChecker(targetIndex);
    };
    testRowBingo();
  }, [targetIndex]);

  return (
    <>
      <div className="bingo-top">
        <motion.button
          onClick={() => navigate("/smallBingo")}
          whileTap={{ y: 5 }}
        >
          小
        </motion.button>

        <p className="bingo-count-view">{`ビンゴ点数: ${bingoCount}`}</p>
        <motion.button onClick={() => navigate("/bingo")} whileTap={{ y: 5 }}>
          大
        </motion.button>
      </div>
      <div className="small-bingo-main">
        {bingoList.map((obj, index) => (
          <div
            onClick={() => {
              setTargetIndex(index);
            }}
            key={index}
            className={`small-bingo-container ${obj.status && "click"}`}
          >
            <img
              className="bingo-image"
              width={253}
              height={205}
              src={`/${obj.src}.jpg`}
              alt="画像"
            />
            <p className="small-bingo-title">{obj.title}</p>
          </div>
        ))}
      </div>
      <div className="bingo-bottom-container">
        <motion.button
          whileTap={{ y: 10 }}
          transition={{ direction: 1 }}
          className="bingo-reset-button"
          onClick={resetBingo}
        >
          リセット
        </motion.button>
        <Link to={"/sampo"}>
          <motion.button
            whileTap={{ y: 10 }}
            transition={{ direction: 1 }}
            className="bingo-finish-button"
          >
            散歩
          </motion.button>
        </Link>
        <motion.button
          whileTap={{ y: 10 }}
          transition={{ direction: 1 }}
          className="bingo-finish-button"
          onClick={randomPanel}
        >
          ランダム
        </motion.button>
      </div>
    </>
  );
};

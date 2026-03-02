import { useEffect, useState } from "react";
import "./Bingo.css";

export const Bingo = () => {
  const [bingoList, setBingoList] = useState([]);
  const [targetIndex, setTargetIndex] = useState(null);
  const [bingoCount, setBingoCount] = useState(0);

  const changeStatus = (index) => {
    const newArray = [...bingoList];
    newArray[index].status = true;
    setBingoList([...newArray]);
  };
  const patchStatus = async (index) => {
    const targetBingoId = bingoList[index].bingo_id;
    await fetch("/api/bingo/" + targetBingoId, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });
  };
  const resetBingo = async () => {
    const res = await fetch("/api/bingo/", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });
    const resetStatusAllData = await res.json();
    const bingoPanel = resetStatusAllData.find((obj) => obj.title === "Bingo");
    bingoPanel.status = true;
    setBingoList([...resetStatusAllData]);
  };

  /* bingo判定関数群 */
  const testRowCreator = () => {
    return [
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24],
    ];
  };
  const alreadyBingoChecker = (allRow, index) => {
    const find = allRow.find((array) => array.includes(index));
    if (!find) return;
    const alreadyBingo = find.every((index) => bingoList[index].status);
    return alreadyBingo;
  };
  const rowChecker = (index) => {
    const [firstRow, secondeRow, thirdRow, fourthRow, fifthRow] =
      testRowCreator();
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
    if (fourthRow.includes(targetIndex)) {
      const fourthRowBingo = fourthRow.every(
        (index) => bingoList[index].status,
      );
      if (fourthRowBingo) setBingoCount((prev) => prev + 1);
    }
    if (fifthRow.includes(targetIndex)) {
      const fifthRowBingo = fifthRow.every((index) => bingoList[index].status);
      if (fifthRowBingo) setBingoCount((prev) => prev + 1);
    }
  };
  const testColumnCreator = () => {
    return [
      [0, 5, 10, 15, 20],
      [1, 6, 11, 16, 21],
      [2, 7, 12, 17, 22],
      [3, 8, 13, 18, 23],
      [4, 9, 14, 19, 24],
    ];
  };
  const columnChecker = (index) => {
    const [firstColumn, secondeColumn, thirdColumn, fourthColumn, fifthColumn] =
      testColumnCreator();
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
    if (fourthColumn.includes(targetIndex)) {
      const fourthColumnBingo = fourthColumn.every(
        (index) => bingoList[index].status,
      );
      if (fourthColumnBingo) setBingoCount((prev) => prev + 1);
    }
    if (fifthColumn.includes(targetIndex)) {
      const fifthColumnBingo = fifthColumn.every(
        (index) => bingoList[index].status,
      );
      if (fifthColumnBingo) setBingoCount((prev) => prev + 1);
    }
  };
  const testDiagonallyCreator = () => {
    return [
      [0, 6, 12, 18, 24],
      [4, 8, 12, 16, 20],
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

  /* 初回のbingoPanel表示 */
  useEffect(() => {
    const getBingoData = async () => {
      const response = await fetch("/api/bingo");
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
      <div className="bingo-main">
        {bingoList.map((obj, index) => (
          <div
            onClick={() => {
              setTargetIndex(index);
            }}
            key={index}
            className={`bingo-container ${obj.status && "click"}`}
          >
            <img
              className="bingo-image"
              width={130}
              height={130}
              src={`/${obj.src}.jpg`}
              alt="画像"
            />
            <p className="bingo-title">{obj.title}</p>
          </div>
        ))}
      </div>
      <button className="reset-button" onClick={resetBingo}>
        bingo reset
      </button>
      <button onClick={() => console.log(bingoCount)}>point check</button>
    </>
  );
};

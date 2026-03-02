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
  const testRowCreator = () => {
    const allRow = [
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24],
    ];
    return allRow;
  };
  const alreadyBingoChecker = (index) => {
    const allRow = testRowCreator();
    const find = allRow.find((array) => array.includes(index));
    const alreadyBingoRow = find.every((index) => bingoList[index].status);
    return alreadyBingoRow;
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
  const testRowBingo = (index) => {
    if (targetIndex === null) return;
    if (alreadyBingoChecker(index)) return;
    changeStatus(index);
    patchStatus(index);
    rowChecker(index);
  };

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
    testRowBingo(targetIndex);
  }, [targetIndex]);

  return (
    <>
      <div className="bingo-main">
        {bingoList.map((obj, index) => (
          <div
            onClick={() => {
              setTargetIndex(index);
              console.log(bingoList[index]);
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

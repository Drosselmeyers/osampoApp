import { useEffect, useState } from 'react';
import './Bingo.css';

export const Bingo = () => {
  const [bingoList, setBingoList] = useState([]);
  const [targetIndex, setTargetIndex] = useState(null);

  const getBingoData = async () => {
    const response = await fetch('/api/bingo');
    const allBingoData = await response.json();
    setBingoList(allBingoData);
  };
  const changeStatus = (index) => {
    const newArray = [...bingoList];
    newArray[index].status = true;
    setBingoList([...newArray]);
  };
  const patchStatus = async (index) => {
    const targetBingoId = bingoList[index].bingo_id;
    await fetch('/api/bingo/' + targetBingoId, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
    });
  };
  const bingoReset = async () => {
    const res = await fetch('/api/bingo/', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
    });
    const resetStatusAllData = await res.json();
    setBingoList([...resetStatusAllData]);
  };

  useEffect(() => {
    getBingoData();
  }, []);

  return (
    <>
      <div className="bingo-main">
        {bingoList.map((obj, index) => (
          <div
            onClick={() => {
              changeStatus(index);
              patchStatus(index);
              setTargetIndex(index);
            }}
            key={index}
            className={`bingo-container ${obj.status && 'click'}`}
          >
            <img src={obj.src} alt="画像" />
            <p className="bingo-title">{obj.title}</p>
          </div>
        ))}
      </div>
      <button onClick={bingoReset}>bingo reset</button>
    </>
  );
};

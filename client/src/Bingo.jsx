import './Bingo.css';

export const Bingo = ({ bingoList, setBingoList }) => {
  const testBingo = {
    title: 'test',
    src: 'https://placehold.jp/130x130.png',
    status: false,
  };

  const changeStatus = (index) => {
    const newArray = [...bingoList];
    newArray[index].status = true;
    setBingoList([...newArray]);
  };
  return (
    <>
      <div className="bingo-main">
        {bingoList.map((obj, index) => (
          <div
            onClick={() => {
              changeStatus(index);
            }}
            key={index}
            className={`bingo-container ${obj.status && 'click'}`}
          >
            <img src={obj.src} alt="画像" />
            <p className="bingo-title">{obj.title}</p>
          </div>
        ))}
      </div>
      <button onClick={() => setBingoList([...bingoList, testBingo])}>
        test
      </button>
    </>
  );
};

import './Bingo.css';

export const Bingo = ({ bingoList, setBingoList }) => {
  const testBingo = {
    title: 'test',
    src: 'https://placehold.jp/150x150.png',
    stats: true,
  };
  const testBingoList = (limit) => {
    for (let i = 0; i < limit; i++) {
      console.log(i);
    }
  };
  testBingoList(20);
  return (
    <div>
      {bingoList.map((obj, index) => (
        <div key={index} className="bingo-container">
          <p>{obj.title}</p>
          <img src={obj.src} alt="画像" />
        </div>
      ))}
      <button onClick={() => setBingoList([...bingoList, testBingo])}></button>
    </div>
  );
};

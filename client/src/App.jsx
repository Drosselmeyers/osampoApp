import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Bingo } from './Bingo';
import { useEffect, useState } from 'react';
import { AuthContextProvider } from './contexts/AuthContexts';
import { LoginPage } from './LoginPage';

function App() {
  const [bingoList, setBingoList] = useState([]);
  const cash = [];
  const testBingo = {
    title: 'test',
    src: 'https://placehold.jp/150x150.png',
    stats: true,
  };
  const testBingoList = (limit) => {
    for (let i = 0; i < limit; i++) {
      cash.push(testBingo);
    }
  };
  testBingoList(20);

  /* 初回レンダリング時にbingoのlistをGET */
  useEffect(() => {}, []);
  return (
    <AuthContextProvider>
      <Routes>
        <Route
          path="/"
          element={<Bingo bingoList={bingoList} setBingoList={setBingoList} />}
        ></Route>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;

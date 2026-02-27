import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Bingo } from './Bingo';
import { useEffect, useState } from 'react';

function App() {
  const [bingoList, setBingoList] = useState([]);

  /* 初回レンダリング時にbingoのlistをGET */
  useEffect(() => {}, []);
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<Bingo bingoList={bingoList} setBingoList={setBingoList} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;

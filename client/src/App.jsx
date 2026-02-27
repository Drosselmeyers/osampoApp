import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Bingo } from './Bingo';
import { useEffect, useState } from 'react';
import { AuthContextProvider } from './contexts/AuthContexts';
import { LoginPage } from './LoginPage';

function App() {
  const [bingoList, setBingoList] = useState([]);

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

import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Bingo } from "./Bingo";
import { useEffect, useState } from "react";
import { AuthContextProvider } from "./contexts/AuthContexts";
import { LoginPage } from "./LoginPage";
import { SignUpPage } from "./SignUpPage";

function App() {
  const [bingoList, setBingoList] = useState([]);

  /* 初回レンダリング時にbingoのlistをGET */
  useEffect(() => {}, []);
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/"
          element={<Bingo bingoList={bingoList} setBingoList={setBingoList} />}
        ></Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;

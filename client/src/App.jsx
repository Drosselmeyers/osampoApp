import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Bingo } from "./Bingo";
import { useEffect, useState } from "react";
import { AuthContextProvider } from "./contexts/AuthContexts";
import { LoginPage } from "./LoginPage";
import { SignUpPage } from "./SignUpPage";
<<<<<<< feature/profile
import { Profile } from "./Profile";
=======
import { PostPage } from "./PostPage";
>>>>>>> main

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
<<<<<<< feature/profile
        <Route
          path="/"
          element={<Bingo bingoList={bingoList} setBingoList={setBingoList} />}
        ></Route>
        <Route path="/profile" element={<Profile />} />
=======
        <Route path="/" element={<Bingo />}></Route>
        <Route path="/post" element={<PostPage />}></Route>
>>>>>>> main
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;

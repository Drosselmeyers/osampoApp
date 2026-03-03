import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Bingo } from "./Bingo";
import { useEffect, useState } from "react";
import { AuthContextProvider } from "./contexts/AuthContexts";
import { LoginPage } from "./LoginPage";
import { SignUpPage } from "./SignUpPage";
import { Profile } from "./Profile";
import { PostPage } from "./PostPage";
import { SampoPage } from "./sampoPage";
import { SmallBingo } from "./SmallBingo";

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Bingo />}></Route>
        <Route path="/post" element={<PostPage />}></Route>
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/sampo" element={<SampoPage />} />
        <Route path="/smallBingo" element={<SmallBingo />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;

import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Bingo } from "./Bingo";
import { AuthContextProvider } from "./contexts/AuthContexts";
import { PrivateRoute } from "./PrivateRoute";
import { LoginPage } from "./LoginPage";
import { SignUpPage } from "./SignUpPage";
import { Profile } from "./Profile";
import { PostPage } from "./PostPage";
import { SampoPage } from "./sampoPage";

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Bingo />}></Route>
        <Route
          path="/post"
          element={
            <PrivateRoute>
              <PostPage />
            </PrivateRoute>
          }
        ></Route>
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/sampo" element={<SampoPage />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;

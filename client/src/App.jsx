import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Bingo } from "./Bingo";
import { AuthContextProvider } from "./contexts/AuthContexts";
import { PrivateRoute } from "./PrivateRoute";
import { LoginPage } from "./LoginPage";
import { SignUpPage } from "./SignUpPage";
import { Profile } from "./Profile";
import { PostPage } from "./PostPage";
import { SampoPage } from "./SampoPage";
import { SmallBingo } from "./SmallBingo";
import { Reminder } from "./Reminder";

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Bingo />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/post"
          element={
            <PrivateRoute>
              <PostPage />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/sampo"
          element={
            <PrivateRoute>
              <SampoPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/smallBingo"
          element={
            <PrivateRoute>
              <SmallBingo />
            </PrivateRoute>
          }
        />
        <Route
          path="/reminder"
          element={
            <PrivateRoute>
              <Reminder />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;

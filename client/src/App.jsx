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
import { SmallBingo } from "./SmallBingo";
import { Reminder } from "./Reminder";

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Bingo />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/post"
          element={
            <PrivateRoute>
              <PostPage />
            </PrivateRoute>
          }
        ></Route>
        <Route path="*" element={<Navigate to="/" replace />} />
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
        <Route path="/reminder" element={<Reminder />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;

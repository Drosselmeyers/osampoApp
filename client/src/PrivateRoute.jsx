import { Navigate } from "react-router-dom";
import { AuthContextConsumer } from "./contexts/AuthContexts";

export function PrivateRoute({ children }) {
  const { loginUser, loading } = AuthContextConsumer();

  if (loading) {
    return <div>読み込み中...</div>;
  }

  if (!loginUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

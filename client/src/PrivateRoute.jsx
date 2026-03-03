import { Navigate } from "react-router-dom";
import { AuthContextConsumer } from "./contexts/AuthContexts";

export function PrivateRoute({ children }) {
  const { loginUser } = AuthContextConsumer();

  if (!loginUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

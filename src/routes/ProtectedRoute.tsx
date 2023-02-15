import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export type RouteProps = {
  isAuthenticated: boolean;
  outlet: JSX.Element;
};

export default function ProtectedRoute({
  isAuthenticated,
  outlet,
}: RouteProps) {
  if (isAuthenticated) {
    return outlet;
  } else {
    return <Navigate to={{ pathname: "/" }} />;
  }
}

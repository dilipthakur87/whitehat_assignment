import { Navigate } from "react-router-dom";
import { RouteProps } from "./types";

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

import React from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute, { RouteProps } from "./routes/ProtectedRoute";
import "./App.css";
import PublicRoute from "./routes/PublicRoute";

function App() {
  const { walletAddress } = useAuth();

  const defaultProtectedRouteProps: Omit<RouteProps, "outlet"> = {
    isAuthenticated: !!walletAddress,
  };

  return (
    <div>
      <Routes>
        <Route
          index
          element={
            <PublicRoute
              {...defaultProtectedRouteProps}
              outlet={<LoginPage />}
            />
          }
        />
        <Route
          path="login"
          element={
            <PublicRoute
              {...defaultProtectedRouteProps}
              outlet={<LoginPage />}
            />
          }
        />
        <Route
          path="home"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<HomePage />}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;

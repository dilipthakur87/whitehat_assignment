import React from "react";
import { Routes, Route } from "react-router-dom";

import { useWallet } from "./hooks/useWallet";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import { RouteProps } from "./routes/types";
import "./App.css";

function App() {
  const { walletAddress } = useWallet();

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

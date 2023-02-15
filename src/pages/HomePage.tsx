import React from "react";
import { Navigate } from "react-router-dom";
import ButtonComponent from "../components/ButtonComponent";

import { useAuth } from "../hooks/useAuth";

const HomePage = () => {
  const { walletAddress, disconnectFromWallet } = useAuth();

  const handleDisconnect = async () => {
    try {
      await disconnectFromWallet();
      <Navigate to={"/"} replace />;
    } catch (e: any) {
      console.log(" error disconnecting == ", e);
    }
  };

  return (
    <div>
      <h1>This is home page and my wallet address is ${walletAddress}</h1>
      <ButtonComponent
        text="Logout/Disconnect"
        onClick={() => handleDisconnect()}
      />
    </div>
  );
};

export default HomePage;

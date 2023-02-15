import React, { createContext, useContext, useMemo, useState } from "react";
import {
  AuthState,
  AuthProviderProps,
  ConnectType,
  DisconnectType,
} from "./types";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext<AuthState | undefined>(undefined);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [walletAddress, setWalletAddress] = useLocalStorage(
    "WALLET_ADDRESS",
    null
  );

  // call this function when you want to connect the user to metamask wallet
  const connectToWallet: ConnectType = async () => {
    setTimeout(() => {
      setWalletAddress("382971923jeds9f0q389jpehg39488");
    }, 1500);
  };

  // call this function to disconnect the user
  const disconnectFromWallet: DisconnectType = async () => {
    setTimeout(() => {
      setWalletAddress(null);
    }, 1500);
  };

  const value = useMemo(
    () => ({
      walletAddress,
      connectToWallet,
      disconnectFromWallet,
    }),
    [walletAddress]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
};

export { AuthProvider, useAuth };

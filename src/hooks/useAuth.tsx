import React, { createContext, useContext, useMemo, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../connectors/connectors";
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

  let { ethereum } = window as any;
  const hexChainId = "0x" + Number(11155111).toString(16);
  const data = [
    {
      chainId: hexChainId,
      chainName: "Sepolia test network",
      nativeCurrency: {
        name: "SepoliaETH",
        symbol: "SepoliaETH",
        decimals: 18,
      },
      rpcUrls: "https://sepolia.infura.io/v3/",
      blockExplorerUrls: ["https://sepolia.etherscan.io"],
    },
  ];

  const { account, activate, deactivate } = useWeb3React();

  // call this function when you want to connect the user to metamask wallet
  const connectToWallet: ConnectType = async () => {
    if (ethereum !== "undefined") {
      try {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: hexChainId }],
        });
        activate(injected);
      } catch (switchErr: any) {
        if (switchErr?.code !== 4001 && switchErr?.code !== -32002) {
          try {
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: data,
            });
            activate(injected);
          } catch (addError) {
            if (process.env.REACT_APP_DEV_ENV === "development") {
              console.log(addError);
            }
          }
        } else {
          console.log(" Couldn't Connect. ");
        }
      }
      setWalletAddress(account ? account.toString() : null);
    } else {
      alert(
        " Seems like you haven't installed Metamask. Please make sure to install it to your browser to use this application."
      );
    }
  };

  // call this function to disconnect the user
  const disconnectFromWallet: DisconnectType = async () => {
    try {
      deactivate();
      setWalletAddress(null);
    } catch (error: any) {
      console.log("disconnect errrr ", error);
    }
  };

  const value = {
    walletAddress,
    connectToWallet,
    disconnectFromWallet,
  };

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

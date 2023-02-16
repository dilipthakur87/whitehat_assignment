import React, { createContext, useContext, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../connectors/connectors";
import {
  UseWalletState,
  AuthProviderProps,
  ConnectType,
  DisconnectType,
} from "./types";
import { useLocalStorage } from "./useLocalStorage";
import {
  HEX_CHAINID,
  SEPOLIA_CONNECTION_DATA,
} from "../constants/WalletConstants";

const WallerContext = createContext<UseWalletState | undefined>(undefined);

const WalletProvider = ({ children }: AuthProviderProps) => {
  const [walletAddress, setWalletAddress] = useLocalStorage(
    "WALLET_ADDRESS",
    null
  );

  let { ethereum } = window as any;

  const { active, account, activate, deactivate } = useWeb3React();

  useEffect(() => {
    if (active && account) {
      setWalletAddress(account);
    }
  }, [active, account]);

  // call this function when you want to connect the user to metamask wallet
  const connectToWallet: ConnectType = async () => {
    if (ethereum !== "undefined") {
      try {
        console.log("here");

        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: HEX_CHAINID }],
        });
        await activate(injected);
      } catch (switchErr: any) {
        if (switchErr?.code !== 4001 && switchErr?.code !== -32002) {
          try {
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: SEPOLIA_CONNECTION_DATA,
            });
            await activate(injected);
          } catch (addError) {
            console.log(addError);
          }
        } else {
          alert(" Couldn't Connect. ");
        }
      }
    } else {
      alert(
        " Seems like you haven't installed Metamask. Please make sure to install it to your browser to use this application."
      );
    }
  };

  // call this function to disconnect the user
  const disconnectFromWallet: DisconnectType = async () => {
    try {
      await deactivate();
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

  return (
    <WallerContext.Provider value={value}>{children}</WallerContext.Provider>
  );
};

const useWallet = () => {
  const context = useContext(WallerContext);

  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }

  return context;
};

export { WalletProvider, useWallet };

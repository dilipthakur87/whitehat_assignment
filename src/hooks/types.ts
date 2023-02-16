export type ConnectType = () => Promise<void>;
export type DisconnectType = () => Promise<void>;
export type AuthProviderProps = {
  children: React.ReactNode;
};

export type UseWalletState = {
  walletAddress: string | null;
  connectToWallet: ConnectType;
  disconnectFromWallet: DisconnectType;
};

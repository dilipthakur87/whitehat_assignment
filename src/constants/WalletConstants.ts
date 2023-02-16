import { SEPOLIA_CHAINID } from "./ConnectorConstants";

export const HEX_CHAINID = "0x" + Number(SEPOLIA_CHAINID).toString(16);

export const SEPOLIA_CONNECTION_DATA = [
  {
    chainId: HEX_CHAINID,
    chainName: "Sepolia test network",
    nativeCurrency: {
      name: "SepoliaETH",
      symbol: "SepoliaETH",
      decimals: 18,
    },
    rpcUrls: process.env.REACT_APP_SEPOLIA_RPC_URL,
    blockExplorerUrls: [process.env.REACT_APP_SEPOLIA_BLOCK_EXPLORER_URL],
  },
];

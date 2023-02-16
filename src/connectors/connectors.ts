import { InjectedConnector } from "@web3-react/injected-connector";
import { SEPOLIA_CHAINID } from "../constants/ConnectorConstants";

export const injected = new InjectedConnector({
  supportedChainIds: [SEPOLIA_CHAINID], // chainId for Sepolia test network
});

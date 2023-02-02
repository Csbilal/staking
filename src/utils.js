import React from "react";

import { createContext } from "react";
import { useState } from "react";
import { providers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      networkUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      rpc: {
        97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      },
      chainId: 97,
    },
  },
};
const web3Modal = new Web3Modal({
  network: "testnet",
  providerOptions, // required
});

let initialState = {
  provider: null,
  web3Provider: null,
  account: null,
  chainId: null,
  signer: null,
};
export const AppContext = createContext(initialState);
export const AppContextProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  const connect = async () => {
    const provider = await web3Modal.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const signer = web3Provider.getSigner();
    const account = await signer.getAddress();
    const network = await web3Provider.getNetwork();
    setState({
      ...state,
      provider: provider,
      web3Provider: web3Provider,
      account: account,
      signer: signer,
      chainId: network.chainId,
    });
  };
  const disconnect = React.useCallback(
    async function () {
      await web3Modal.clearCachedProvider();
      if (
        state.provider?.disconnect &&
        typeof state.provider.disconnect === "function"
      ) {
        await state.provider.disconnect();
      }
      setState({
        ...state,
        provider: null,
        web3Provider: null,
        account: null,
        chainId: null,
        signer: null,
      });
      window.location.reload();
    },
    [state.provider]
  );
  React.useEffect(() => {
    if (state.provider?.on) {
      const handleAccountsChanged = (accounts) => {
        setState({
          ...state,
          account: accounts[0],
        });
      };
      const handleChainChanged = (_hexChainId) => {
        window.location.reload();
      };
      const handleDisconnect = (error) => {
        disconnect();
      };
      state.provider.on("accountsChanged", handleAccountsChanged);
      state.provider.on("chainChanged", handleChainChanged);
      state.provider.on("disconnect", handleDisconnect);
      return () => {
        if (state.provider.removeListener) {
          state.provider.removeListener(
            "accountsChanged",
            handleAccountsChanged
          );
          state.provider.removeListener("chainChanged", handleChainChanged);
          state.provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [state.provider, disconnect]);
  return (
    <AppContext.Provider
      value={{
        account: state.account,
        signer: state.signer,
        connect,
        disconnect,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

import React, { useContext, useEffect, useState } from "react";
import { Button, Box, Container } from "@mui/material";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { ethers } from "ethers";
import { AppContext } from "../utils";

const Navbar = () => {
  const { account, connect, disconnect, signer } = useContext(AppContext);

  // const [web3Modal, setWeb3Modal] = useState(null);
  // const [provider, setProvider] = useState();
  // const [library, setLibrary] = useState();
  // const [account, setAccount] = useState();
  // const [network, setNetwork] = useState();

  // useEffect(() => {
  //   // initiate web3modal
  //   // const providerOptions = {
  //   //   walletconnect: {
  //   //     package: WalletConnectProvider,
  //   //     options: {
  //   //       networkUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  //   //       rpc: {
  //   //         97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  //   //       },
  //   //       chainId: 97,
  //   //     },
  //   //   },
  //   // };

  //   const providerOptions = {
  //     coinbasewallet: {
  //       package: CoinbaseWalletSDK,
  //       options: {
  //         networkUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  //         rpc: {
  //           97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  //         },
  //         chainId: 97,
  //       },
  //     },
  //     walletconnect: {
  //       package: WalletConnectProvider,
  //       options: {
  //         networkUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  //         rpc: {
  //           97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  //         },
  //         chainId: 97,
  //       },
  //     },
  //   };

  //   const newWeb3Modal = new Web3Modal({
  //     cacheProvider: true, // very important
  //     network: "mainnet",
  //     providerOptions,
  //   });

  //   setWeb3Modal(newWeb3Modal);
  // }, []);

  // async function connectWallet() {
  //   // const provider = await web3Modal.connect();

  //   try {
  //     const provider = await web3Modal.connect();
  //     const library = new ethers.providers.Web3Provider(provider);
  //     const accounts = await library.listAccounts();
  //     const network = await library.getNetwork();
  //     setProvider(provider);
  //     setLibrary(library);
  //     if (accounts) setAccount(accounts[0]);
  //     setNetwork(network);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // async function disconnectFromWallet() {
  //   await web3Modal.clearCachedProvider();
  //   setAccount("");
  //   setProvider("");
  // }
  return (
    <Container>
      <Box display="flex" justifyContent="space-between" padding="2rem">
        <Button variant="contained">Home</Button>

        <Box mb={1}>
          {account ? (
            <Box
              width="200px"
              height="42px"
              bgcolor="#098CDC"
              borderRadius="8px"
              sx={{ cursor: "pointer" }}
              display="flex"
              justifyContent="center"
              alignItems="center"
              color="#ffffff"
              fontWeight="500"
              fontSize="16px"
              onClick={() => disconnect()}
              style={{ zIndex: 1 }}
            >
              {account.slice(0, 4) + "..." + account.slice(-4)}
            </Box>
          ) : (
            <Box
              zIndex={1}
              style={{
                cursor: "pointer",
              }}
              bgcolor="#098CDC"
              width="200px"
              height="42px"
              fontWeight="500"
              borderRadius="8px"
              fontSize="20px"
              color="#ffffff"
              display="flex"
              justifyContent="center"
              alignItems="center"
              onClick={() => connect()}
            >
              Connect
            </Box>
          )}
        </Box>

        {/* {account ? (
          <Button variant="contained" onClick={disconnectFromWallet}>
            Disconnect
          </Button>
        ) : (
          <Button variant="contained" onClick={connectWallet}>
            connect wallet
          </Button>
        )} */}
        {/* <div>Connection Status: ${!!account}</div>
        <div>Wallet Address: ${account}</div> */}
      </Box>
    </Container>
  );
};

export default Navbar;

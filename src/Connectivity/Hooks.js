import { stakingContract, tokenContract } from "./environment";
import stakingAbi from "../Connectivity/skatingAbi.json";

import tokenAbi from "../Connectivity/tokenAbi.json";

import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import React from "react";

let walletadress = "0xFf244442B0FB78952aAD680508B3e07e48AA00ff";

const provider = new ethers.providers.JsonRpcProvider(
  "https://data-seed-prebsc-1-s1.binance.org:8545/"
);

const voidAccount = new ethers.VoidSigner(walletadress, provider);

function useContract(address, ABI, signer) {
  return React.useMemo(() => {
    if (signer) {
      return new Contract(address, ABI, signer);
    } else {
      return new Contract(address, ABI, voidAccount);
    }
  }, [address, ABI, signer]);
}

export function useTokenContract(signer) {
  return useContract(tokenContract, tokenAbi, signer);
}

export function useStakingContract(signer) {
  return useContract(stakingContract, stakingAbi, signer);
}

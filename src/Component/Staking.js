import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  TextField,
} from "@mui/material";

import { Add, ArrowDownward } from "@mui/icons-material";
import { formatUnits, parseUnits } from "@ethersproject/units";
import { useStakingContract, useTokenContract } from "../Connectivity/Hooks";
import { AppContext } from "../utils";
import { toast } from "react-toastify";

const Staking = () => {
  const [Balance, setBalance] = useState();
  const [symbols, setSymbol] = useState();
  const [decimal, setDecimals] = useState();
  const [totalSupplys, setTotalSupply] = useState();
  const [stakedToken, setStakedToken] = useState();
  const [amount, setAmount] = useState("");
  const [planeIndex, setPlaneIndex] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [alowance, setGetAlowance] = useState("");
  const [loading, setLoading] = useState(false);

  const { account, signer, connect } = useContext(AppContext);

  console.log(account);

  const stakingContract = useStakingContract(signer);

  console.log(stakingContract.address, "abc");

  const tokenContract = useTokenContract(signer);

  const init = async () => {
    try {
      const balance = await tokenContract.balanceOf(account);
      const symbol = await tokenContract.symbol();
      const decimals = await tokenContract.decimals();
      const totalSupply = await tokenContract.totalSupply();

      const totalStakedToken = await stakingContract.totalStakedToken();

      setStakedToken(formatUnits(totalStakedToken.toString(), 18));

      setBalance(formatUnits(balance.toString(), 18));
      setSymbol(symbol);
      setDecimals(decimals);
      setTotalSupply(formatUnits(totalSupply.toString(), 18));

      console.log(symbol);
    } catch (error) {
      console.log(error, "error");
    }
  };

  // console.log(parseUnits(amount, 18), " parseUnits(amount, 18)");

  useEffect(() => {
    init();
  }, [account]);

  const stakeHandler = async () => {
    if (!account) {
      console.log("Error! Please connect your wallet.");
    } else if (!amount) {
      console.log("Error! Please enter amount.");
    } else {
      try {
        let allowance = await tokenContract.allowance(
          account,
          stakingContract.address
        );
        console.log(+allowance, "allowance");
        if (+allowance <= 0) {
          let getAmounts = parseUnits(Balance.toString(), 18);
          const tx = await tokenContract.approve(
            stakingContract.address,
            getAmounts.toString()
          );
          await tx.wait();
          console.log("Success! Approved Confirmed.");
        }
        const tx1 = await stakingContract.stake(
          parseUnits(amount, 18),
          planeIndex.toString()
        );
        await tx1.wait();
        console.log("Success! Transaction Confirmed.");
      } catch (err) {
        if (err?.data?.message) {
          console.log(err?.data?.message);
        } else {
          console.log(err?.message);
        }
      }
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const unsatkePercent = await stakingContract.unstakePercent();
        const bonus = await stakingContract.Bonus(planeIndex.toString());
        let bonusToken = (+bonus / +unsatkePercent) * +amount;
        console.log(+bonus, +unsatkePercent, "data");
        console.log(bonusToken, "bonusToken");

        setBonus(+amount + bonusToken);
        console.log(+amount + bonusToken, "+amount + bonusTokenbonusToken");
      } catch (error) {
        console.log(error);
      }
    };
    init();
  }, [amount, planeIndex]);

  // const ApproveHandler = async () => {
  //   if (!account) {
  //     console.log("Error! Please connect your wallet.");
  //   } else if (!amount) {
  //     console.log("Error! Please enter amount.");
  //   } else {
  //     try {
  //       setLoading(true);
  //       let allowance = await tokenContract.allowance(
  //         account,
  //         stakingContract.address
  //       );
  //       let getAmount = parseUnits(amount.toString(), 18);
  //       setGetAlowance(+allowance);

  //       console.log(+allowance, "allowance abc");
  //       console.log(getAmount.toString(), "amountbnb");

  //       const tx = await tokenContract.approve(
  //         stakingContract,
  //         getAmount.toString()
  //       );
  //       await tx.wait();
  //       console.log("Success! Approved Confirmed.");
  //       setLoading(false);
  //     } catch (err) {
  //       if (err?.data?.message) {
  //         console.log(err?.data?.message);
  //       } else {
  //         console.log(err?.message);
  //       }
  //       setLoading(false);
  //     }
  //   }
  // };

  return (
    <Box py={2}>
      {loading && <h1>loading....</h1>}
      <Container>
        <Typography variant="h2" textAlign="center">
          STAKE TOKENS TO EARN MORE
        </Typography>
        <Grid container spacing={4} mt={4}>
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                padding: "2rem",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
            >
              <Box display="flex" justifyContent="space-between">
                <Button variant="contained">Locked</Button>
                <Button variant="contained">UnLocked</Button>
              </Box>
              <Typography mt={2}>
                Calculate your ADTk depending on the amount of staked tokens and
                your lock time.
              </Typography>
              <Box
                py={2}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography>Tk</Typography>
                <TextField
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                ></TextField>
              </Box>
              <Box textAlign="center">
                <Add textAlign="center" />
                <Typography mb={2}>Lock tokens for Days</Typography>
              </Box>
              <Box display="flex " justifyContent="space-around">
                <Button variant="contained" onClick={() => setPlaneIndex(0)}>
                  7days
                </Button>
                <Button variant="contained" onClick={() => setPlaneIndex(1)}>
                  14days
                </Button>
                <Button variant="contained" onClick={() => setPlaneIndex(2)}>
                  21days
                </Button>
                <Button variant="contained" onClick={() => setPlaneIndex(3)}>
                  30days
                </Button>
                <Button variant="contained" onClick={() => setPlaneIndex(4)}>
                  60days
                </Button>
              </Box>
              <Box textAlign="center" py={2}>
                <ArrowDownward></ArrowDownward>
              </Box>

              <Box
                py={2}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography>Tk</Typography>
                <TextField
                  type="number"
                  placeholder="0"
                  value={bonus}
                ></TextField>
              </Box>

              <Box textAlign="center">
                <Typography mb={2}>Locked until 04/05/2023</Typography>
                {!account ? (
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => connect()}
                  >
                    Connect Wallet
                  </Button>
                ) : (
                  <>
                    {/* <Button
                      variant="contained"
                      disabled={+alowance === 0 ? false : true}
                      fullWidth
                      onClick={() => ApproveHandler()}
                    >
                      approve
                    </Button> */}
                    <Button
                      variant="contained"
                      // disabled={+alowance > 0 ? false : true}
                      fullWidth
                      onClick={() => stakeHandler()}
                    >
                      Stake
                    </Button>
                  </>
                )}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={7}>
            <Box
              sx={{
                padding: "3rem",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
            >
              <Box display="flex" justifyContent="space-around">
                <Box>
                  <Typography mb={2}>Your Balance</Typography>
                  <Typography mb={2}>Your have staked</Typography>
                  <Typography mb={2}>Token Name</Typography>
                  <Typography mb={2}>Total Decimals</Typography>
                  <Typography mb={2}>Total Supply</Typography>
                </Box>
                <Box>
                  <Typography mb={2}>{Balance ? Balance : "0"}</Typography>
                  <Typography mb={2}>
                    {stakedToken ? stakedToken : "0"}
                  </Typography>
                  <Typography mb={2}>{symbols ? symbols : "tk"}</Typography>
                  <Typography mb={2}>{decimal ? decimal : "0"}</Typography>
                  <Typography mb={2}>
                    {totalSupplys ? totalSupplys : "0"}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Staking;

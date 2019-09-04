import Web3 from "web3";
// import FestakingJson from "../contracts/Festaking.json";
// import FerrumJson from "../contracts/FerrumToken.json";
// import FestakingTest from "../contracts/FestakingTest.json";

import FestakingJson from "../abi/Festaking.json";
import FerrumJson from "../abi/FerrumToken.json";
import FestakingTest from "../abi/FestakingTest.json";

let web3;
let ac1;

const getWeb3 = () =>
  new Promise(async (resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    // window.addEventListener("load", async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        // Request account access if needed
        await window.ethereum.enable();
        // Acccounts now exposed
        resolve(web3);
      } catch (error) {
        reject(error);
      }
    } else if (window.web3) {
      const web3 = window.web3;
      console.log("Injected web3 detected.");
      resolve(web3);
    } else {
      const provider = new Web3.providers.HttpProvider(
        "https://rinkeby.infura.io//v3/6a43b00591fa422da11c6a3b8b31bc1f"
      );
      console.log("using rinkeby provider");
      const web3 = new Web3(provider);
      resolve(web3);
    }
    // });
  });

export const connect = async Contractaddress =>
  new Promise(async (resolve, reject) => {
    try {
      web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      ac1 = accounts[0];
    } catch (error) {
      reject(error);
    }

    console.log("account deploying", ac1);
    console.log("web3", web3);
    const owner = "0x306728aE98A1Fa0bE6D40F7d93989689bd4D0b7C";
    const GAS = 6000000;
    let festaking;
    let frm;

    const address = "0xB6933c5A570EA88cC411b38b5A1FcA9315D9965d";
    try {
      frm = await new web3.eth.Contract(FerrumJson.abi, address);
      festaking = await new web3.eth.Contract(
        FestakingTest["abi"],
        Contractaddress
      );
    } catch (error) {
      reject(error);
    }
    resolve({
      web3,
      owner,
      festaking,
      frm,
      contractAddress: Contractaddress,
      ac1,
      GAS
    });
  });

export const deploy = (data) =>
  new Promise(async (resolve, reject) => {
    let web3;
    let owner;
    let ac1;
    const STAKING_CAP = 10000;

    try {
      web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      owner = accounts[0];
      ac1 = accounts[0];
    } catch (error) {
      resolve(error);
    }
    console.log(owner, '----owner-------')
    const GAS = 6000000;
    let festaking;
    let frm;

    try {
      frm = await new web3.eth.Contract(FerrumJson["abi"])
        .deploy({ data: FerrumJson["bytecode"] })
        .send({ from: owner, gas: GAS });
      console.log("ferrum deployed successfully");
    } catch (error) {
      reject(error)
      console.log("error", error);
    }

    try {
      festaking = await new web3.eth.Contract(FestakingTest["abi"])
        .deploy({
          data: FestakingTest["bytecode"],
          arguments: ["Test Staking", frm._address, STAKING_CAP]
        })
        .send({ from: owner, gas: "5000000" });

      console.log("festaking deployed successfully");
      const Contractaddress = festaking._address;
      console.log("contract address", Contractaddress);
    } catch (error) {
      reject(error);
    }

    //   const {
    //     stakingStart,
    //     stakingEnd,
    //     withdrawStart,
    //     withdrawEnd,
    //     stakingCap
    //   } = data;

    //   festaking = await new web3.eth.Contract(FestakingJson.abi)
    //     .deploy({
    //       data: FestakingJson.bytecode,
    //       arguments: [
    //         "Staking contract",
    //         "0x03e7E52d3DdD78b8ad58d3F9150335718472a34b",
    //         stakingStart,
    //         stakingEnd,
    //         withdrawStart,
    //         withdrawEnd,
    //         stakingCap
    //       ]
    //     })
    //     .send({ from: owner, gas: GAS })
    //     .on("error", function(error) {
    //       reject(error);
    //       console.log(error, "--error---");
    //     });

    // const contractAddress = festaking._address;

    // await frm.methods.approve(contractAddress, STAKING_CAP).send({ from: owner });
    // await frm.methods.approve(address, STAKING_CAP).send({ from: owner });

    resolve({
      web3,
      owner,
      festaking,
      frm,
      contractAddress: festaking._address || "",
      ac1,
      // ac2,
      // ac3,
      // accounts,
      GAS,
      STAKING_CAP
    });
  });

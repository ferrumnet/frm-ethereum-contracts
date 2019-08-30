import Web3 from "web3";
import FestakingJson from "../contracts/Festaking.json";
import FerrumJson from "../contracts/FerrumToken.json";
import FestakingTest from "../contracts/FestakingTest.json";

const deployContarct = async (type = "default", data = {}) => {
  const web3 = new Web3("ws://localhost:7545");
  const accounts = await web3.eth.getAccounts();
  const owner = accounts[0];
  const ac1 = accounts[1];
  const ac2 = accounts[2];
  const ac3 = accounts[3];
  const STAKING_CAP = data.stakingCap || 10000;
  const GAS = 3000000;
  let festaking;

  let frm = await new web3.eth.Contract(FerrumJson.abi)
    .deploy({ data: FerrumJson.bytecode })
    .send({ from: owner, gas: GAS });

  if (type !== "default") {
    const {
      stakingStart,
      stakingEnd,
      withdrawStart,
      withdrawEnd,
      stakingCap
    } = data;

    festaking = await new web3.eth.Contract(FestakingJson.abi)
      .deploy({
        data: FestakingJson.bytecode,
        arguments: [
          "Staking contract",
          frm._address,
          stakingStart,
          stakingEnd,
          withdrawStart,
          withdrawEnd,
          stakingCap
        ]
      })
      .send({ from: owner, gas: GAS });
  } else {
    festaking = await new web3.eth.Contract(FestakingTest["abi"])
      .deploy({
        data: FestakingTest["bytecode"],
        arguments: ["Test Staking", frm._address, STAKING_CAP]
      })
      .send({ from: owner, gas: GAS });
  }

  const contractAddress = festaking._address;

  // Approve the owner
  await frm.methods.approve(contractAddress, STAKING_CAP).send({ from: owner });

  festaking.events.allEvents(
    {
      fromBlock: "latest"
    },
    (error, event) => {
      if (error) {
        console.error("error", error);
      } else {
        console.log("event", event);
      }
    }
  );

  return {
    web3,
    owner,
    festaking,
    frm,
    contractAddress,
    ac1,
    ac2,
    ac3,
    accounts,
    GAS,
    STAKING_CAP
  };
};

export default deployContarct;
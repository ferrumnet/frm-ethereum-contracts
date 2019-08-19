const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
// const web3 = new Web3(ganache.provider());
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
<<<<<<< HEAD
const festakingJson = require('../build/contracts/FestakingTest.json');
const frmJson = require('../build/contracts/FerrumToken.json');
const abiDecoder = require('abi-decoder');

=======
const festakingJson = require("../build/contracts/FestakingTest.json");
const frmJson = require("../build/contracts/FerrumToken.json");
>>>>>>> process log events
const STAKING_CAP = 1000;
const GAS = "5000000";

let accounts;
let festaking;
let frm;
let owner, contractAddress;
let ac1, ac2, ac3;

function wei(val) {
  return web3.utils.toWei(val, "ether");
}

beforeEach(async () => {
<<<<<<< HEAD
    accounts = await web3.eth.getAccounts();
    owner = accounts[0];
    ac1 = accounts[1];
    ac2 = accounts[2];
    ac3 = accounts[3];

    frm = await new web3.eth.Contract(frmJson['abi'])
        .deploy({ data: frmJson['bytecode'] })
        .send({ from: owner, gas: GAS });
    festaking = await new web3.eth.Contract(festakingJson['abi'])
        .deploy({ data: festakingJson['bytecode'], arguments: ["Test Staking", frm._address, STAKING_CAP] })
        .send({ from: owner, gas: '5000000' });
    contractAddress = festaking._address;
    // Approve the owner
    await frm.methods.approve(contractAddress, STAKING_CAP).send({from: owner});
    const allowance = await frm.methods.allowance(owner, contractAddress).call();
    abiDecoder.addABI(festakingJson['abi']);
    console.log('Owner allowance is', allowance.toString());
=======
  accounts = await web3.eth.getAccounts();
  owner = accounts[0];
  ac1 = accounts[1];
  ac2 = accounts[2];
  ac3 = accounts[3];

  frm = await new web3.eth.Contract(frmJson["abi"])
    .deploy({ data: frmJson["bytecode"] })
    .send({ from: owner, gas: GAS });

  festaking = await new web3.eth.Contract(festakingJson["abi"])
    .deploy({
      data: festakingJson["bytecode"],
      arguments: ["Test Staking", frm._address, STAKING_CAP]
    })
    .send({ from: owner, gas: "5000000" });
  contractAddress = festaking._address;

  // Approve the owner
  await frm.methods.approve(contractAddress, STAKING_CAP).send({ from: owner });
  const allowance = await frm.methods.allowance(owner, contractAddress).call();
  console.log("Owner allowance is", allowance.toString());
>>>>>>> process log events
});

async function allow(addr, amount) {
  console.log("Transferring");
  await frm.methods.transfer(addr, amount).send({ from: owner, gas: GAS });
  console.log("Approving");
  await frm.methods.approve(contractAddress, amount).send({ from: addr });
  const allowance = await frm.methods.allowance(addr, contractAddress).call();
  console.log("Approved ", allowance.toString());
  assert(
    allowance.toString() === amount.toString(),
    "Allowance didn'nt happen"
  );
}

async function addReward() {
  return festaking.methods.addReward(1000, 500).send({ from: owner, gas: GAS });
}

async function call(method, ...args) {
  return await festaking.methods[method](...args).call();
}

async function vars() {
  const stakedTotal = await call("stakedTotal");
  const totalReward = await call("totalReward");
  const earlyWithdrawReward = await call("earlyWithdrawReward");
  const rewardBalance = await call("rewardBalance");
  const stakedBalance = await call("stakedBalance");
  return {
    stakedTotal,
    totalReward,
    earlyWithdrawReward,
    rewardBalance,
    stakedBalance
  };
}

async function balance(addr) {
  const res = await frm.methods.balanceOf(addr).call();
  return res.toString();
}

async function debugVars() {
  const var1 = await call("var1");
  const var2 = await call("var2");
  const var3 = await call("var3");
  console.log("VARS", var1, var2, var3);
}

async function setUpStakes() {
<<<<<<< HEAD
    await addReward();
    await allow(ac1, 200);
    const tx = await festaking.methods.stake(100).send({from: ac1, gas: GAS});
    await getTransactionLogs(tx.transactionHash);
    let stake = await festaking.methods.stakeOf(ac1).call();
    console.log('Staked ', stake.toString());

    await festaking.methods.stake(100).send({from: ac1, gas: GAS});
    stake = await festaking.methods.stakeOf(ac1).call();
    console.log('Staked ', stake.toString());

    await allow(ac2, 1000);
    await festaking.methods.stake(1000).send({from: ac2, gas: GAS});
    stake = await festaking.methods.stakeOf(ac2).call();
    console.log('Staked ', stake.toString());
    const allowance = await frm.methods.allowance(ac2, contractAddress).call();
    console.log('Allowance after stake overflow ', allowance.toString());
}

async function getTransactionLogs(txId) {
    const receipts = await web3.eth.getTransactionReceipt(txId);
    const decodedLogs = abiDecoder.decodeLogs(receipts.logs);
    decodedLogs.forEach(l => {
        if (l) {
            console.log(JSON.stringify(l));
        }
    })
    return decodedLogs.filter(Boolean);
}

describe('Happy Festaking', () => {
    it('Sets the reward', async () => {
        const totalRewBefore = await festaking.methods.totalReward().call();
        console.log('Total reward before add', totalRewBefore.toString());
        await festaking.methods.addReward(100, 10).send({from: owner, gas: GAS});
        let totalRewAfter = await festaking.methods.totalReward().call();
        console.log('Total reward after add', totalRewAfter.toString());
        let earlyWithdrawReward = await festaking.methods.earlyWithdrawReward().call();
        console.log('earlyWithdrawReward reward after add', earlyWithdrawReward.toString());

        await festaking.methods.addReward(50, 40).send({from: owner, gas: GAS});
        totalRewAfter = await festaking.methods.totalReward().call();
        console.log('Total reward after add', totalRewAfter.toString());
        earlyWithdrawReward = await festaking.methods.earlyWithdrawReward().call();
        console.log('earlyWithdrawReward reward after add', earlyWithdrawReward.toString());
    });

    it('Withdraw right after it opens gives no reward', async function() {
        this.timeout(0);
        await setUpStakes();

        // Now moving to the first moment of withdawal phase
        await festaking.methods.setEarlyWithdrawalPeriod(0).send({from: owner, gas: GAS});

        const before = await vars();
        console.log('BEFORE', before);
        console.log(await balance(ac2));

        // Withdraw at the first moment
        const tx = await festaking.methods.withdraw(400).send({from: ac2, gas: GAS});
        await getTransactionLogs(tx.transactionHash);
        let after = await vars();
        console.log('AFTER', after);
        let bal = await balance(ac2);
        console.log(bal);
    });

    it('Withdraw halfway before it ends', async function () {
        this.timeout(0);
        await setUpStakes();

        // Now moving to the first moment of withdawal phase
        await festaking.methods.setEarlyWithdrawalPeriod(30000).send({from: owner, gas: GAS});

        const before = await vars();
        console.log('BEFORE', before);
        console.log(await balance(ac2));

        // Withdraw at the first moment
        await festaking.methods.withdraw(400).send({from: ac2, gas: GAS});
        let after = await vars();
        console.log('AFTER', after);
        let bal = await balance(ac2);
        console.log(bal);
    });

    it('Withdraw right before close', async function() {
        this.timeout(0);
        await setUpStakes();

        // Now moving to the first moment of withdawal phase
        await festaking.methods.setEarlyWithdrawalPeriod(59990).send({from: owner, gas: GAS});

        const before = await vars();
        console.log('BEFORE', before);
        console.log(await balance(ac2));

        // Withdraw at the first moment
        await festaking.methods.withdraw(400).send({from: ac2, gas: GAS});
        let after = await vars();
        console.log('AFTER', after);
        let bal = await balance(ac2);
        console.log(bal);

        // Now continue after close
        await festaking.methods.setEarlyWithdrawalPeriod(60000).send({from: owner, gas: GAS});

        // Withdraw another 400
        await festaking.methods.withdraw(400).send({from: ac2, gas: GAS});
        after = await vars();
        console.log('AFTER', after);
        console.log('Expected balance', 801 * 400 / 600 + 400 + 799);
        bal = await balance(ac2);
        console.log(bal);
        let stakes = await festaking.methods.stakeOf(ac2).call();
        console.log('Remaining stake', stakes);
        // Here I expect 80% of the remaining reward because my balance at the time is 80% of the remaining balance

        // Withdraw ac1
        await festaking.methods.withdraw(200).send({from: ac1, gas: GAS});
        bal = await balance(ac1);
        console.log(bal);
        stakes = await festaking.methods.stakeOf(ac1).call();
        console.log('Remaining stake', stakes);
        // Here I expect remaining 20% of the reward because my balance at the time withdraw was finished,
        // was 20% of the remaining balance
    });

    it('Withdraw after close', async function() {
        this.timeout(0);
        await setUpStakes();

        // Now moving to the first moment of withdawal phase
        await festaking.methods.setEarlyWithdrawalPeriod(60000).send({from: owner, gas: GAS});

        const before = await vars();
        console.log('BEFORE', before);
        console.log(await balance(ac2));

        // Withdraw at the first moment
        await festaking.methods.withdraw(400).send({from: ac2, gas: GAS});
        let after = await vars();
        console.log('AFTER', after);
        let bal = await balance(ac2);
        console.log(bal);
    });

    it('withdraw more than balance', () => {});

    it('withdraw before period opens', () => {});

    it('stake after period closes', () => {});

    it('stake after period closes', () => {});

    it('stake without allocation', () => {});
=======
  await addReward();
  await allow(ac1, 200);
  await festaking.methods.stake(100).send({ from: ac1, gas: GAS });
  let stake = await festaking.methods.stakeOf(ac1).call();
  console.log("Staked ", stake.toString());

  await festaking.methods.stake(100).send({ from: ac1, gas: GAS });
  stake = await festaking.methods.stakeOf(ac1).call();
  console.log("Staked ", stake.toString());

  await allow(ac2, 1000);
  await festaking.methods.stake(1000).send({ from: ac2, gas: GAS });
  stake = await festaking.methods.stakeOf(ac2).call();
  console.log("Staked ", stake.toString());
  const allowance = await frm.methods.allowance(ac2, contractAddress).call();
  console.log("Allowance after stake overflow ", allowance.toString());
}

describe("Happy Festaking", () => {
  it("Sets the reward", async () => {
    const totalRewBefore = await festaking.methods.totalReward().call();
    console.log("Total reward before add", totalRewBefore.toString());
    await festaking.methods.addReward(100, 10).send({ from: owner, gas: GAS });
    let totalRewAfter = await festaking.methods.totalReward().call();
    console.log("Total reward after add", totalRewAfter.toString());
    let earlyWithdrawReward = await festaking.methods
      .earlyWithdrawReward()
      .call();
    console.log(
      "earlyWithdrawReward reward after add",
      earlyWithdrawReward.toString()
    );

    await festaking.methods.addReward(50, 40).send({ from: owner, gas: GAS });
    totalRewAfter = await festaking.methods.totalReward().call();
    console.log("Total reward after add", totalRewAfter.toString());
    earlyWithdrawReward = await festaking.methods.earlyWithdrawReward().call();
    console.log(
      "earlyWithdrawReward reward after add",
      earlyWithdrawReward.toString()
    );
  });

  it("Withdraw right after it opens gives no reward", async function() {
    this.timeout(0);
    await setUpStakes();

    // Now moving to the first moment of withdawal phase
    await festaking.methods
      .setEarlyWithdrawalPeriod(0)
      .send({ from: owner, gas: GAS });

    const before = await vars();
    console.log("BEFORE", before);
    console.log(await balance(ac2));

    // Withdraw at the first moment
    await festaking.methods.withdraw(400).send({ from: ac2, gas: GAS });
    let after = await vars();
    console.log("AFTER", after);
    let bal = await balance(ac2);
    console.log(bal);
  });

  it("Withdraw halfway before it ends", async function() {
    this.timeout(0);
    await setUpStakes();

    // Now moving to the first moment of withdawal phase
    await festaking.methods
      .setEarlyWithdrawalPeriod(30000)
      .send({ from: owner, gas: GAS });

    const before = await vars();
    console.log("BEFORE", before);
    console.log(await balance(ac2));

    // Withdraw at the first moment
    await festaking.methods.withdraw(400).send({ from: ac2, gas: GAS });
    let after = await vars();
    console.log("AFTER", after);
    let bal = await balance(ac2);
    console.log(bal);
  });

  it("Withdraw right before close", async function() {
    this.timeout(0);
    await setUpStakes();

    // Now moving to the first moment of withdawal phase
    await festaking.methods
      .setEarlyWithdrawalPeriod(59990)
      .send({ from: owner, gas: GAS });

    const before = await vars();
    console.log("BEFORE", before);
    console.log(await balance(ac2));

    // Withdraw at the first moment
    await festaking.methods.withdraw(400).send({ from: ac2, gas: GAS });
    let after = await vars();
    console.log("AFTER", after);
    let bal = await balance(ac2);
    console.log(bal);

    // Now continue after close
    await festaking.methods
      .setEarlyWithdrawalPeriod(60000)
      .send({ from: owner, gas: GAS });

    // Withdraw another 400
    await festaking.methods.withdraw(400).send({ from: ac2, gas: GAS });
    after = await vars();
    console.log("AFTER", after);
    console.log("Expected balance", (801 * 400) / 600 + 400 + 799);
    bal = await balance(ac2);
    console.log(bal);
    let stakes = await festaking.methods.stakeOf(ac2).call();
    console.log("Remaining stake", stakes);
    // Here I expect 80% of the remaining reward because my balance at the time is 80% of the remaining balance

    // Withdraw ac1
    await festaking.methods.withdraw(200).send({ from: ac1, gas: GAS });
    bal = await balance(ac1);
    console.log(bal);
    stakes = await festaking.methods.stakeOf(ac1).call();
    console.log("Remaining stake", stakes);
    // Here I expect remaining 20% of the reward because my balance at the time withdraw was finished,
    // was 20% of the remaining balance
  });

  it("Withdraw after close", async function() {
    this.timeout(0);
    await setUpStakes();

    // Now moving to the first moment of withdawal phase
    await festaking.methods
      .setEarlyWithdrawalPeriod(60000)
      .send({ from: owner, gas: GAS });

    const before = await vars();
    console.log("BEFORE", before);
    console.log(await balance(ac2));

    // Withdraw at the first moment
    await festaking.methods.withdraw(400).send({ from: ac2, gas: GAS });
    let after = await vars();
    console.log("AFTER", after);
    let bal = await balance(ac2);
    console.log(bal);
  });

  it("withdraw more than balance", () => {});

  it("withdraw before period opens", () => {});

  it("stake after period closes", () => {});

  it("stake after period closes", () => {});

  it("stake without allocation", () => {});
>>>>>>> process log events
});

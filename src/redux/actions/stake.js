import * as types from "../actions/types";
import { errorToast, successToast } from "../../utils/toasts";
import getDeploymentValues from "../../utils/deploymentValues";

export const addStakeSuccessfull = payload => ({
  type: types.ADD_STAKE_SUCCESSFULL,
  payload
});

export const addStakeRequest = () => ({
  type: types.ADD_STAKE_REQUEST
});

export const addStakeFailure = payload => ({
  type: types.ADD_STAKE_FAILED,
  payload
});

export const approveStakeSuccesfull = () => ({
  type: types.APPROVE_STAKE_SUCCESSFULL
});

export const approveStakeFailure = payload => ({
  type: types.APPROVE_STAKE_FAILED,
  payload
});

export const updateStakeVariables = payload => ({
  type: types.UPDATE_STAKE_VARIABLES,
  payload
});

export const authorizeAddStake = (amount, data) => async dispatch => {
  const { frm, ac1,contractAddress, festaking } = data;
  dispatch(addStakeRequest());
  try {
    // await frm.methods.approve(contractAddress, amount).send({ from: owner });
    // await frm.methods.transfer(ac1, 1000).send({ from: owner, gas: GAS });
    // console.log("successfully transfered");
    await frm.methods.approve(contractAddress, amount).send({ from: ac1 });
    await festaking.methods.setStakingPeriod();
    const allowance = await frm.methods.allowance(ac1, contractAddress).call();
    console.log("allowance", allowance);
    const bal = await frm.methods.balanceOf(ac1).call();
    console.log("balance", bal);
    dispatch(approveStakeSuccesfull());
  } catch (error) {
    errorToast("Unable to approve the stake, try again");
    dispatch(approveStakeFailure());
  }
};

export const vars = data => async dispatch => {
  const { festaking, frm, ac1 } = data;

  const call = async (method, ...args) => {
    return await festaking.methods[method](...args).call();
  };
  const stakedTotal = await call("stakedTotal");
  const totalReward = await call("totalReward");
  const earlyWithdrawReward = await call("earlyWithdrawReward");
  const rewardBalance = await call("rewardBalance");
  const stakedBalance = await call("stakedBalance");
  const balanceOf = await frm.methods.balanceOf(ac1).call();
  const stakeOf = await festaking.methods.stakeOf(ac1).call();

  const deploymentValues = await getDeploymentValues(festaking);

  dispatch(
    updateStakeVariables({
      ...deploymentValues,
      stakedTotal,
      totalReward,
      earlyWithdrawReward,
      rewardBalance,
      stakedBalance,
      balanceOf,
      stakeOf
    })
  );
};

export const stake = (amount, data) => async dispatch => {
  const { festaking, ac1, GAS } = data;
  dispatch(addStakeRequest());
  try {
    const res = await festaking.methods
      .stake(amount)
      .send({ from: ac1, gas: GAS });
    dispatch(addStakeSuccessfull(res));
    successToast("Stake was successfully added");
    dispatch(vars(data));
  } catch (e) {
    dispatch(addStakeFailure(e));
    errorToast("Error adding a stake");
  }
};

import { errorToast, successToast } from "../../utils/toasts";
import * as types from "../actions/types";

export const addRewardSuccessfull = payload => ({
  type: types.ADD_REWARD_SUCCESSFULL,
  payload
});

export const addRewardRequest = () => ({
  type: types.ADD_REWARD_REQUEST
});

export const addRewardFailure = payload => ({
  type: types.ADD_REWARD_FAILED,
  payload
});

export const addReward = (
  rewardAmount,
  withdrawableAmount,
  data
) => async dispatch => {
  const { owner, festaking, GAS, frm, contractAddress } = data;
  try {
    dispatch(addRewardRequest());
    // const reward = web3.utils.toWei(rewardAmount, "ether");
    // const withdrawable = web3.utils.toWei(withdrawableAmount, "ether");
    // console.log("reward---->", reward, "withdrawable---->", withdrawable);
    await frm.methods
      .approve(contractAddress, rewardAmount)
      .send({ from: owner });

    await festaking.methods.setStakingPeriod();

    const res = await festaking.methods
      .addReward(rewardAmount, withdrawableAmount)
      .send({ from: owner, gas: GAS });

    dispatch(addRewardSuccessfull(res));
    successToast("Reward Added Successfully");
  } catch (error) {
    dispatch(addRewardFailure(error));
    console.log(error, "--------error-------");
    console.log(owner, "--------owner address-------");
    errorToast("Error adding a Reward");
  }
};

import * as types from "../actions/types";
import DeployContract from "../../utils/deployContract";

const addContractSuccessfull = payload => ({
  type: types.DEPLOY_CONTRACT_SUCCESSFUL,
  payload
});
const addContractFailed = payload => ({
  type: types.DEPLOY_CONTRACT_FAILED,
  payload
});

export const addContractData = () => async dispatch => {
  try {
    const data = await DeployContract();
    console.log(data, "--------data--------");
    dispatch(addContractSuccessfull(data));
  } catch (error) {
    dispatch(addContractFailed(error));
  }
};

const addReward = (rewardAmount, withdrawableAmount) => dispatch => {};

export default addReward;

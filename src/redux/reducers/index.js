import { combineReducers } from "redux";
import addRewardReducer from "./addReward";
import withdrawReducer from "./withdraw";
import stakeReducer from "./stake";
import deployContractReducer from "./deployContract";

const reducer = combineReducers({
  reward: addRewardReducer,
  withdraw: withdrawReducer,
  stake: stakeReducer,
  contract: deployContractReducer
});

export default reducer;

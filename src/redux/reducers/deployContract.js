import intialState from "./initialState";
import * as types from "../actions/types";

const deployContractReducer = (state = intialState.contract, action) => {
  switch (action.type) {
    case types.DEPLOY_CONTRACT_FAILED:
      return { ...state, error: action.payload };
    case types.DEPLOY_CONTRACT_SUCCESSFUL:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export default deployContractReducer;

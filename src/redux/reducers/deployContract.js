import intialState from "./initialState";
import * as types from "../actions/types";

const deployContractReducer = (state = intialState.contract, action) => {
  switch (action.type) {
    case types.DEPLOY_CONTRACT_FAILED:
      return { ...state, error: action.payload };

    case types.DEPLOY_CONTRACT_SUCCESSFUL:
      return { ...state, data: action.payload };

    case types.DEPLOY_CONTRACT_LOADING:
      return { ...state, loading: action.payload };

    case types.DEPLOYMENT_VALUES_LOADING:
      return { ...state, valuesLoading: action.payload };

    case types.DEPLOYMENT_VALUES_SUCCESS:
      return { ...state, deploymentValues: action.payload };

    case types.DEPLOYMENT_VALUES_ERROR:
      return { ...state, valuesError: action.payload };

    default:
      return state;
  }
};

export default deployContractReducer;

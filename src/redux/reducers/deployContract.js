import intialState from "./initialState";
import * as types from "../actions/types";

const deployContractReducer = (state = intialState.contract, action) => {
  switch (action.type) {
    case types.DEPLOY_CONTRACT_FAILED:
      return { ...state, error: action.payload, loading: false };

    case types.DEPLOY_CONTRACT_SUCCESSFUL:
      return { ...state, data: action.payload, loading: false };

    case types.DEPLOY_CONTRACT_LOADING:
      return { ...state, loading: action.payload, error: null, data: null };

    case types.DEPLOYMENT_VALUES_LOADING:
      return { ...state, valuesLoading: action.payload };

    case types.DEPLOYMENT_VALUES_SUCCESS:
      return { ...state, deploymentValues: action.payload, loading:false };

    case types.DEPLOYMENT_VALUES_ERROR:
      return { ...state, valuesError: action.payload, loading:false };

    default:
      return state;
  }
};

export default deployContractReducer;

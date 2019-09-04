import intialState from "./initialState";
import * as types from "../actions/types";

const stakeReducer = (state = intialState.stake, action) => {
  switch (action.type) {
    case types.ADD_STAKE_REQUEST:
      return { ...state, loading: true, complete: false };

    case types.ADD_STAKE_SUCCESSFULL:
      return { ...state, loading: true, complete: true, data: action.payload };

    case types.ADD_STAKE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        complete: false
      };

    case types.APPROVE_STAKE_SUCCESSFULL:
      return { ...state, loading: false };

    case types.APPROVE_STAKE_FAILED:
      return {
        ...state,
        loading: false,
        complete: false
      };

    case types.UPDATE_STAKE_VARIABLES:
      return { ...state, variables: action.payload };
    default:
      return state;
  }
};

export default stakeReducer;

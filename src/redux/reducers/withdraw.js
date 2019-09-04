import intialState from "./initialState";
import * as types from "../actions/types";

const widrawReducer = (state = intialState.withdraw, action) => {
  switch (action.type) {
    case types.WITHDRAW_REQUEST:
      return { ...state, loading: true, complete: false };

    case types.SET_WITHDRAW_TO_DEFAULT_STATE:
      return { ...state, loading: false, complete: false };

    case types.WITHDRAW_SUCCESSFULL:
      return { ...state, loading: true, complete: true, data: action.payload };

    case types.WITHDRAW_FAILED:
      return {
        ...state,
        loading: false,
        complete: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export default widrawReducer;

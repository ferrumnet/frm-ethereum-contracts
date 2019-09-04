import intialState from "./initialState";
import * as types from "../actions/types";

const addRewardReducer = (state = intialState.reward, action) => {
  switch (action.type) {
    case types.ADD_REWARD_REQUEST:
      return { ...state, loading: true };

    case types.ADD_REWARD_SUCCESSFULL:
      return { ...state, loading: false, data: action.payload };

    case types.ADD_REWARD_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default addRewardReducer;

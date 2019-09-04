import AddRewardReducer from "../../redux/reducers/addReward";
import initialState from "../../redux/reducers/initialState";
import * as types from "../../redux/actions/types";

describe("Add Reward Reducer", () => {
  const actionTypes = (action, payload) => ({
    type: action,
    payload
  });

  test("test default for add reward reducer", () => {
    expect(AddRewardReducer(initialState.reward, { type: null })).toEqual(
      initialState.reward
    );
  });

  test("for ADD_REWARD_REQUEST action", () => {
    expect(
      AddRewardReducer(
        initialState.reward,
        actionTypes(types.ADD_REWARD_REQUEST, {})
      )
    ).toEqual({ ...initialState.reward, loading: true });
  });

  test("for ADD_REWARD_SUCCESSFULL action", () => {
    expect(
      AddRewardReducer(
        initialState.reward,
        actionTypes(types.ADD_REWARD_SUCCESSFULL, {})
      )
    ).toEqual({ ...initialState.reward, loading: false, data: {} });
  });

  test("for ADD_REWARD_FAILED action", () => {
    expect(
      AddRewardReducer(
        initialState.reward,
        actionTypes(types.ADD_REWARD_FAILED, "an error ocurred")
      )
    ).toEqual({
      ...initialState.reward,
      loading: false,
      error: "an error ocurred"
    });
  });
});

import StakeReducer from "../../redux/reducers/stake";
import initialState from "../../redux/reducers/initialState";
import * as types from "../../redux/actions/types";

describe("Stake Reducer", () => {
  const actionTypes = (action, payload) => ({
    type: action,
    payload
  });

  test("test default for stake reducer", () => {
    expect(StakeReducer(initialState.stake, { type: null })).toEqual(
      initialState.stake
    );
  });

  test("for ADD_STAKE_REQUEST action", () => {
    expect(
      StakeReducer(initialState.stake, actionTypes(types.ADD_STAKE_REQUEST, {}))
    ).toEqual({ ...initialState.stake, loading: true, complete: false });
  });

  test("for UPDATE_STAKE_VARIABLES action", () => {
    expect(
      StakeReducer(
        initialState.stake,
        actionTypes(types.UPDATE_STAKE_VARIABLES, {})
      )
    ).toEqual({ ...initialState.stake, variables: {} });
  });

  test("for ADD_STAKE_SUCCESSFULL action", () => {
    expect(
      StakeReducer(
        initialState.stake,
        actionTypes(types.ADD_STAKE_SUCCESSFULL, {})
      )
    ).toEqual({
      ...initialState.stake,
      loading: true,
      complete: true,
      data: {}
    });
  });

  test("for ADD_STAKE_FAILED action", () => {
    expect(
      StakeReducer(
        initialState.stake,
        actionTypes(types.ADD_STAKE_FAILED, "An error occured")
      )
    ).toEqual({
      ...initialState.stake,
      loading: false,
      complete: false,
      error: "An error occured"
    });
  });

  test("for APPROVE_STAKE_SUCCESSFULL action", () => {
    expect(
      StakeReducer(
        initialState.stake,
        actionTypes(types.APPROVE_STAKE_SUCCESSFULL, {})
      )
    ).toEqual({ ...initialState.stake, loading: false });
  });

  test("for APPROVE_STAKE_FAILED action", () => {
    expect(
      StakeReducer(
        initialState.stake,
        actionTypes(types.APPROVE_STAKE_FAILED, {})
      )
    ).toEqual({ ...initialState.stake, loading: false, complete: false });
  });
});

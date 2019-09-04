import WithdrawReducer from "../../redux/reducers/withdraw";
import initialState from "../../redux/reducers/initialState";
import * as types from "../../redux/actions/types";

describe("Withdraw Reducer", () => {
  const actionTypes = (action, payload) => ({
    type: action,
    payload
  });

  test("test default for withdraw reducer", () => {
    expect(WithdrawReducer(initialState.withdraw, { type: null })).toEqual(
      initialState.withdraw
    );
  });

  test("for WITHDRAW_REQUEST action", () => {
    expect(
      WithdrawReducer(
        initialState.withdraw,
        actionTypes(types.WITHDRAW_REQUEST, {})
      )
    ).toEqual({ ...initialState.withdraw, loading: true, complete: false });
  });

  test("for SET_WITHDRAW_TO_DEFAULT_STATE action", () => {
    expect(
      WithdrawReducer(
        initialState.withdraw,
        actionTypes(types.SET_WITHDRAW_TO_DEFAULT_STATE, {})
      )
    ).toEqual({ ...initialState.withdraw, loading: false, complete: false });
  });

  test("for WITHDRAW_SUCCESSFULL action", () => {
    expect(
      WithdrawReducer(
        initialState.withdraw,
        actionTypes(types.WITHDRAW_SUCCESSFULL, {})
      )
    ).toEqual({
      ...initialState.withdraw,
      loading: true,
      complete: true,
      data: {}
    });
  });

  test("for WITHDRAW_FAILED action", () => {
    expect(
      WithdrawReducer(
        initialState.withdraw,
        actionTypes(types.WITHDRAW_FAILED, "An error occured")
      )
    ).toEqual({
      ...initialState.withdraw,
      loading: false,
      complete: false,
      error: "An error occured"
    });
  });
});

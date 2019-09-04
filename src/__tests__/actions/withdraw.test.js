import * as types from "../../redux/actions/types";
import * as actions from "../../redux/actions/withdraw";

describe("Test withdraw actions", () => {
  it("should create an action to withdraw successfully", () => {
    const expectWithdrawSuccessfully = {
      type: types.WITHDRAW_SUCCESSFULL,
      payload: "successfully withdrew"
    };
    expect(actions.withdrawSuccessfull("successfully withdrew")).toEqual(
      expectWithdrawSuccessfully
    );
  });

  it("should create an action to set withdraw default state", () => {
    const expectedWithdrawDefaultState = {
      type: types.SET_WITHDRAW_TO_DEFAULT_STATE
    };
    expect(actions.withdrawToDefaultState()).toEqual(
      expectedWithdrawDefaultState
    );
  });

  it("should create an action to set withdraw default state", () => {
    const expectedWithdrawDefaultState = {
      type: types.SET_WITHDRAW_TO_DEFAULT_STATE
    };
    expect(actions.withdrawToDefaultState()).toEqual(
      expectedWithdrawDefaultState
    );
  });

  it("should create an action to set withdraw request", () => {
    const expectedWithdrawRequest = {
      type: types.WITHDRAW_REQUEST
    };
    expect(actions.withdrawRequest()).toEqual(expectedWithdrawRequest);
  });

  it("should create an action when withdraw fails", () => {
    const expectWithdrawFailure = {
      type: types.WITHDRAW_FAILED,
      payload: "Withdrawal Failed"
    };
    expect(actions.withdrawFailure("Withdrawal Failed")).toEqual(
      expectWithdrawFailure
    );
  });
});

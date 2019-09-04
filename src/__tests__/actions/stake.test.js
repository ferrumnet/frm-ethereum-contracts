import * as types from "../../redux/actions/types";
import * as actions from "../../redux/actions/stake";

describe("Test add stake action", () => {
  it("should create an action to add a Stake successfully", () => {
    const expectedAddStakeSuccessfully = {
      type: types.ADD_STAKE_SUCCESSFULL,
      payload: "stake added successfully"
    };
    expect(actions.addStakeSuccessfull("stake added successfully")).toEqual(
      expectedAddStakeSuccessfully
    );
  });

  it("should create an action to add a stake request", () => {
    const expectedAddStakeRequest = {
      type: types.ADD_STAKE_REQUEST
    };
    expect(actions.addStakeRequest()).toEqual(expectedAddStakeRequest);
  });

  it("should create an action for failing to add a stake", () => {
    const expectedAddStakeFailure = {
      type: types.ADD_STAKE_FAILED,
      payload: "error adding a stake"
    };
    expect(actions.addStakeFailure("error adding a stake")).toEqual(
      expectedAddStakeFailure
    );
  });

  it("should create an action when an error occurs while approving a stake", () => {
    const expectedErrorApproveStake = {
      type: types.APPROVE_STAKE_FAILED,
      payload: "error approving a stake"
    };
    expect(actions.approveStakeFailure("error approving a stake")).toEqual(
      expectedErrorApproveStake
    );
  });

  it("should create an action to add a Stake successfully", () => {
    const expectedUpdateStakeVariables = {
      type: types.UPDATE_STAKE_VARIABLES,
      payload: "stake variables updated successfully"
    };
    expect(
      actions.updateStakeVariables("stake variables updated successfully")
    ).toEqual(expectedUpdateStakeVariables);
  });

  it("should create an action to approve a stake successfully", () => {
    const expectedAPPROVE_STAKE_SUCCESSFULLY = {
      type: types.APPROVE_STAKE_SUCCESSFULL
    };
    expect(actions.approveStakeSuccesfull()).toEqual(
      expectedAPPROVE_STAKE_SUCCESSFULLY
    );
  });
});

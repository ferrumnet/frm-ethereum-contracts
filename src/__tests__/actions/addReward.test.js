import * as types from "../../redux/actions/types";
import * as actions from "../../redux/actions/addReward";

describe("Test add reward action", () => {
  it("should create an action to add a reward successfully", () => {
    const expectedAddRewardSuccessfully = {
      type: types.ADD_REWARD_SUCCESSFULL,
      payload: "reward added successfully"
    };
    expect(actions.addRewardSuccessfull("reward added successfully")).toEqual(
      expectedAddRewardSuccessfully
    );
  });

  it("should create an action to add a reward request", () => {
    const expectedAddRewardRequest = {
      type: types.ADD_REWARD_REQUEST
    };
    expect(actions.addRewardRequest()).toEqual(expectedAddRewardRequest);
  });

  it("should create an action for failing to add a reward", () => {
    const expectedAddRewardFailure = {
      type: types.ADD_REWARD_FAILED,
      payload: "error adding a reward"
    };
    expect(actions.addRewardFailure("error adding a reward")).toEqual(
      expectedAddRewardFailure
    );
  });
});

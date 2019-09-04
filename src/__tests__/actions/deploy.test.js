import * as types from "../../redux/actions/types";
import * as actions from "../../redux/actions/deploy";

describe("Test deploy action", () => {
  it("should create an action to add a contract successfull", () => {
    const expectedAddContractSuccessfull = {
      type: types.DEPLOY_CONTRACT_SUCCESSFUL,
      payload: "contract added successfully"
    };
    expect(
      actions.addContractSuccessfull("contract added successfully")
    ).toEqual(expectedAddContractSuccessfull);
  });

  it("should create an action for failed contract deployment", () => {
    const expectedAddContractFailed = {
      type: types.DEPLOY_CONTRACT_FAILED,
      payload: "unable to deploy contract"
    };
    expect(actions.addContractFailed("unable to deploy contract")).toEqual(
      expectedAddContractFailed
    );
  });

  it("test contract loading", () => {
    const expectedContractLoading = {
      type: types.DEPLOY_CONTRACT_LOADING,
      payload: true
    };
    expect(actions.contractLoading(true)).toEqual(expectedContractLoading);
  });

  it("test values loading", () => {
    const expectedValuesLoading = {
      type: types.DEPLOYMENT_VALUES_LOADING,
      payload: true
    };
    expect(actions.valuesLoading(true)).toEqual(expectedValuesLoading);
  });

  it("test add values successfully", () => {
    const expectedAddValueSuccess = {
      type: types.DEPLOYMENT_VALUES_SUCCESS,
      payload: "values added successfully"
    };
    expect(actions.valuesSuccess("values added successfully")).toEqual(
      expectedAddValueSuccess
    );
  });

  it("test error adding values", () => {
    const expectedErrorAddingValues = {
      type: types.DEPLOYMENT_VALUES_ERROR,
      payload: "error adding values"
    };
    expect(actions.valuesError("error adding values")).toEqual(
      expectedErrorAddingValues
    );
  });
});

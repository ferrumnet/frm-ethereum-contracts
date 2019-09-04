import DeployReducer from "../../redux/reducers/deployContract";
import initialState from "../../redux/reducers/initialState";
import * as types from "../../redux/actions/types";

describe("Deploy Reducer", () => {
  const actionTypes = (action, payload) => ({
    type: action,
    payload
  });
  test("test default for Deploy reducer", () => {
    expect(DeployReducer(initialState.contract, { type: null })).toEqual(
      initialState.contract
    );
  });

  test("for DEPLOY_CONTRACT_FAILED action", () => {
    expect(
      DeployReducer(
        initialState.contract,
        actionTypes(types.DEPLOY_CONTRACT_FAILED, "deploy failed")
      )
    ).toEqual({ ...initialState.contract, error: "deploy failed" });
  });

  test("for DEPLOY_CONTRACT_SUCCESSFUL action", () => {
    expect(
      DeployReducer(
        initialState.contract,
        actionTypes(types.DEPLOY_CONTRACT_SUCCESSFUL, {})
      )
    ).toEqual({ ...initialState.contract, data: {} });
  });

  test("for DEPLOY_CONTRACT_LOADING action", () => {
    expect(
      DeployReducer(
        initialState.contract,
        actionTypes(types.DEPLOY_CONTRACT_LOADING, true)
      )
    ).toEqual({ ...initialState.contract, loading: true });
  });

  test("for DEPLOYMENT_VALUES_LOADING action", () => {
    expect(
      DeployReducer(
        initialState.contract,
        actionTypes(types.DEPLOYMENT_VALUES_LOADING, true)
      )
    ).toEqual({ ...initialState.contract, valuesLoading: true });
  });

  test("for DEPLOYMENT_VALUES_SUCCESS action", () => {
    expect(
      DeployReducer(
        initialState.contract,
        actionTypes(types.DEPLOYMENT_VALUES_SUCCESS, {})
      )
    ).toEqual({ ...initialState.contract, deploymentValues: {} });
  });

  test("for DEPLOYMENT_VALUES_ERROR action", () => {
    expect(
      DeployReducer(
        initialState.contract,
        actionTypes(types.DEPLOYMENT_VALUES_ERROR, "Error occured")
      )
    ).toEqual({ ...initialState.contract, valuesError: "Error occured" });
  });
});

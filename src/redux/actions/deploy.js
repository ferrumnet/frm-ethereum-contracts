import * as types from "../actions/types";
import DeployContract from "../../utils/deployContract";
import getDeploymentValues from "../../utils/deploymentValues";
import { errorToast, successToast } from "../../utils/toasts";

const addContractSuccessfull = payload => ({
  type: types.DEPLOY_CONTRACT_SUCCESSFUL,
  payload
});

const addContractFailed = payload => ({
  type: types.DEPLOY_CONTRACT_FAILED,
  payload
});

const contractLoading = payload => ({
  type: types.DEPLOY_CONTRACT_LOADING,
  payload
});

const valuesLoading = payload => ({
  type: types.DEPLOYMENT_VALUES_LOADING,
  payload
});

const valuesSuccess = payload => ({
  type: types.DEPLOYMENT_VALUES_SUCCESS,
  payload
});

const valuesError = payload => ({
  type: types.DEPLOYMENT_VALUES_ERROR,
  payload
});

export const deployContractAction = (
  type = "default",
  contractData = {}
) => async dispatch => {
  dispatch(contractLoading(true));
  try {
    if (type !== "default") {
      let data = await DeployContract(type, contractData);
      successToast("contract deployed");
      dispatch(addContractSuccessfull(data));
    } else {
      let data = await DeployContract();
      successToast("contract deployed");
      dispatch(addContractSuccessfull(data));
    }

    dispatch(contractLoading(false));
  } catch (error) {
    errorToast("Unable to deploy contract ");
    dispatch(addContractFailed(error));
    dispatch(contractLoading(false));
  }
};

export const fetchDeploymentValues = festaking => async dispatch => {
  try {
    const data = await getDeploymentValues(festaking);
    dispatch(valuesSuccess(data));
  } catch (error) {
    errorToast("Unable to get deployment values");
    console.log(error, "deployment values error");
    dispatch(valuesError(error));
    dispatch(valuesLoading(false));
  }
};

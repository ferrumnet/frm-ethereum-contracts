import * as types from "../actions/types";
import { connect, deploy } from "../../utils/contracts";
import getDeploymentValues from "../../utils/deploymentValues";
import { errorToast, successToast } from "../../utils/toasts";
import { vars } from "./stake";

export const addContractSuccessfull = payload => ({
  type: types.DEPLOY_CONTRACT_SUCCESSFUL,
  payload
});

export const addContractFailed = payload => ({
  type: types.DEPLOY_CONTRACT_FAILED,
  payload
});

export const contractLoading = payload => ({
  type: types.DEPLOY_CONTRACT_LOADING,
  payload
});

export const valuesLoading = payload => ({
  type: types.DEPLOYMENT_VALUES_LOADING,
  payload
});

export const valuesSuccess = payload => ({
  type: types.DEPLOYMENT_VALUES_SUCCESS,
  payload
});

export const valuesError = payload => ({
  type: types.DEPLOYMENT_VALUES_ERROR,
  payload
});

export const deployContractAction = (data) => async dispatch => {
  dispatch(contractLoading(true));
  try {
    const res = await deploy(data);
    successToast("contract deployed");
    await dispatch(fetchDeploymentValues(res.festaking))
    dispatch(addContractSuccessfull(res));
  } catch (error) {
    errorToast("Unable to deploy contract ");
    dispatch(addContractFailed(error));
  }
};

export const connectContractAction = address => async dispatch => {
  dispatch(contractLoading(true));
  try {
    let data = await connect(address);
    await dispatch(vars(data));
    successToast("contract connected");
    dispatch(addContractSuccessfull(data));
  } catch (error) {
    errorToast("Unable to connect contract ");
    dispatch(addContractFailed(error));
  }
};

export const fetchDeploymentValues = festaking => async dispatch => {
  try {
    const data = await getDeploymentValues(festaking);
    dispatch(valuesSuccess(data));
  } catch (error) {
    errorToast("Unable to get deployment values");
    dispatch(valuesError(error));
    dispatch(valuesLoading(false));
  }
};

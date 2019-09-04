import * as types from "../actions/types";
import { successToast, errorToast } from "../../utils/toasts";
import { vars } from "./stake";

export const withdrawSuccessfull = payload => ({
  type: types.WITHDRAW_SUCCESSFULL,
  payload
});

export const withdrawToDefaultState = () => ({
  type: types.SET_WITHDRAW_TO_DEFAULT_STATE
});

export const withdrawRequest = () => ({
  type: types.WITHDRAW_REQUEST
});

export const withdrawFailure = payload => ({
  type: types.WITHDRAW_FAILED,
  payload
});

export const withdraw = (amount, data) => async dispatch => {
  const { festaking, GAS, ac1 } = data;
  dispatch(withdrawRequest());
  try {
    await festaking.methods
      .setEarlyWithdrawalPeriod(0)
      .send({ from: ac1, gas: GAS });

    const res = await festaking.methods
      .withdraw(amount)
      .send({ from: ac1, gas: GAS });

    dispatch(withdrawSuccessfull(res));
    successToast("Successfully withdrew");
    dispatch(vars(data));
    await festaking.methods.setStakingPeriod().send({ from: ac1, gas: GAS });
  } catch (e) {
    dispatch(withdrawFailure(e));
    errorToast("Error withdrawing");
  }
};

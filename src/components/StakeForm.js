import React from "react";
import StakeForm from "./common/MultiStepForm";
import MultiStepCard from "./common/MultiStepCard";

export const StakeStepper = ({
  amount,
  step,
  handleSubmit,
  handleChange,
  cancel,
  validateStake,
  authorizeStake,
  disable
}) => {
  switch (step) {
    case 1:
      return (
        <div className="min-component-height top-padding">
          <StakeForm
            nextStep={validateStake}
            handleChange={handleChange}
            amount={amount}
            disable={disable}
            title="Stake"
          />
        </div>
      );
    case 2:
      return (
        <div className="min-component-height top-padding">
          <MultiStepCard
            cancel={cancel}
            amount={amount}
            nextStep={authorizeStake}
            buttonName="Approve"
            message="Do you want to approve stake of"
            title="Approve Stake"
            disable={disable}
          />
        </div>
      );
    case 3:
      return (
        <div className="min-component-height top-padding">
          <MultiStepCard
            nextStep={handleSubmit}
            amount={amount}
            cancel={cancel}
            buttonName="Submit"
            message="Do you want add a stake of"
            title="Confirm Stake"
            disable={disable}
          />
        </div>
      );
    default:
      return (
        <div className="min-component-height top-padding">
          <StakeForm
            nextStep={validateStake}
            handleChange={handleChange}
            amount={amount}
            title="Stake"
            disable={disable}
          />
        </div>
      );
  }
};

import React from "react";
import WithdrawForm from "./common/MultiStepForm";
import MultiStepCard from "./common/MultiStepCard";

export const WithdrawStepper = ({
  amount,
  step,
  handleSubmit,
  handleChange,
  prevStep,
  validateWithdraw,
  disable
}) => {
  switch (step) {
    case 1:
      return (
        <div className="min-component-height top-padding">
          <WithdrawForm
            nextStep={validateWithdraw}
            handleChange={handleChange}
            amount={amount}
            title="Withdraw"
            disable={disable}
          />
        </div>
      );
    case 2:
      return (
        <div className="min-component-height top-padding">
          <MultiStepCard
            nextStep={handleSubmit}
            amount={amount}
            cancel={prevStep}
            buttonName="Submit"
            message="Do you want to proceed with the withdraw of"
            title="Confirm Transaction"
            disable={disable}
          />
        </div>
      );
    default:
      return (
        <div className="min-component-height top-padding">
          <WithdrawForm
            validateWithdraw={validateWithdraw}
            handleChange={handleChange}
            amount={amount}
            disable={disable}
          />
        </div>
      );
  }
};

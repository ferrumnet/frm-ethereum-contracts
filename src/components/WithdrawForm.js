import React from "react";

export const WithdrawForm = ({
  handleChange,
  handleSubmit,
  amount,
  validateWithdraw
}) => (
  <div className="card">
    <div className="card-body">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Withdraw Amount</label>
          <input
            name="amount"
            type="number"
            className="form-control"
            onChange={handleChange}
            value={amount}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={validateWithdraw}
        >
          With Draw
        </button>
      </form>
    </div>
  </div>
);

export const WithdrawCard = ({ stakedTotal, stakedBalance, balance }) => (
  <div className="col-sm-3  top-padding">
    <div className="card">
      <div className="card-header">Information</div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <strong>Staked Total: </strong> {stakedTotal}
        </li>
        <li className="list-group-item">
          <strong>Staked Balance</strong> {stakedBalance}
        </li>
        <li className="list-group-item">
          <strong>Account Balance: </strong> {balance}
        </li>
      </ul>
    </div>
  </div>
);

export const SubmitWithdrawal = ({ handleSubmit, prevStep, amount }) => (
  <div className="card">
    <div className="card-body two-inline-buttons">
      <div className="text-center">
        <h5>Confirm Transaction</h5>
        <br />
        <p>
          Do you want to proceed with the withdraw of <strong>{amount}</strong>
        </p>
        <br />
        <button
          type="button"
          className="btn btn-primary active"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button type="button" className="btn btn-secondary" onClick={prevStep}>
          Cancel
        </button>
      </div>
      <br />
    </div>
  </div>
);

export const Loader = ({ complete }) => (
  <div className="min-component-height top-padding">
    <div className="card custom-loader">
      <div className={`circle-loader ${complete && "load-complete"}`}>
        <div className={`${complete && "checkmark draw"}`}></div>
      </div>
    </div>
  </div>
);

export const ConfirmForm = ({ prevStep, authorizeWithdraw, amount }) => (
  <div className="card">
    <div className="card-body two-inline-buttons">
      <div className="text-center">
        <h5>Approve Withdraw</h5>
        <br />
        <p>
          Do you want to approve withdraw of <strong>{amount}</strong> ?
        </p>
        <br />
        <button
          type="button"
          className="btn btn-primary active pull-left"
          onClick={authorizeWithdraw}
        >
          Approve
        </button>

        <button
          type="button"
          className="btn btn-secondary pull-right"
          onClick={prevStep}
        >
          Cancel
        </button>
      </div>
      <br />
    </div>
  </div>
);

export const WithdrawStepper = ({
  amount,
  step,
  handleSubmit,
  handleChange,
  prevStep,
  validateWithdraw,
  authorizeWithdraw
}) => {
  switch (step) {
    case 1:
      return (
        <div className="min-component-height top-padding">
          <WithdrawForm
            validateWithdraw={validateWithdraw}
            handleChange={handleChange}
            amount={amount}
          />
        </div>
      );
    case 2:
      return (
        <div className="min-component-height top-padding">
          <ConfirmForm
            prevStep={prevStep}
            amount={amount}
            authorizeWithdraw={authorizeWithdraw}
          />
        </div>
      );
    case 3:
      return (
        <div className="min-component-height top-padding">
          <SubmitWithdrawal
            handleSubmit={handleSubmit}
            amount={amount}
            prevStep={prevStep}
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
          />
        </div>
      );
  }
};

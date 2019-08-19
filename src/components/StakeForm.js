import React from "react";

export const StakeForm = ({ validateStake, handleChange, amount }) => (
  <div className="card">
    <div className="card-body">
      <form>
        <div className="form-group">
          <label>Amount to Stake</label>
          <input
            name="amount"
            type="number"
            className="form-control"
            onChange={handleChange}
            value={amount}
          />
        </div>
        <button
          onClick={validateStake}
          type="submit"
          className="btn btn-primary"
        >
          Continue
        </button>
      </form>
    </div>
  </div>
);

export const StakeCard = ({ stakingCap, reward, stakedTotal }) => (
  <div className="col-sm-3 top-padding">
    <div className="card">
      <div className="card-header">Information</div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <strong>Total Reward: </strong> {reward}
        </li>
        <li className="list-group-item">
          <strong>Staking Cap: </strong> {stakingCap}
        </li>
        <li className="list-group-item">
          <strong>Total Staked Amount:</strong> {stakedTotal}
        </li>
      </ul>
    </div>
  </div>
);

export const SubmitStake = ({ handleSubmit, prevStep, amount }) => (
  <div className="card">
    <div className="card-body two-inline-buttons">
      <div className="text-center">
        <h5>Confirm Transaction</h5>
        <br />
        <p>
          Do you want to proceed with the stake of <strong>{amount}</strong>
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

export const ConfirmForm = ({ prevStep, authorizeStake, amount }) => (
  <div className="card">
    <div className="card-body two-inline-buttons">
      <div className="text-center">
        <h5>Approve Stake</h5>
        <br />
        <p>
          Do you want to approve stake of <strong>{amount}</strong> ?
        </p>
        <br />
        <button
          type="button"
          className="btn btn-primary active pull-left"
          onClick={authorizeStake}
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

export const StakeStepper = ({
  amount,
  step,
  handleSubmit,
  handleChange,
  prevStep,
  validateStake,
  authorizeStake
}) => {
  switch (step) {
    case 1:
      return (
        <div className="min-component-height top-padding">
          <StakeForm
            validateStake={validateStake}
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
            authorizeStake={authorizeStake}
          />
        </div>
      );
    case 3:
      return (
        <div className="min-component-height top-padding">
          <SubmitStake
            handleSubmit={handleSubmit}
            amount={amount}
            prevStep={prevStep}
          />
        </div>
      );
    default:
      return (
        <div className="min-component-height top-padding">
          <StakeForm
            validateStake={validateStake}
            handleChange={handleChange}
            amount={amount}
          />
        </div>
      );
  }
};

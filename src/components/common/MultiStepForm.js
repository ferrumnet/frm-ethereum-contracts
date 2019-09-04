import React from "react";
const MultiStepForm = ({
  handleChange,
  amount,
  nextStep,
  title,
  disable = false
}) => (
  <div className="card">
    <div className="card-body">
      <form>
        <div className="form-group">
          <label>{title}</label>
          <input
            name="amount"
            type="number"
            id="amount-input"
            className="form-control"
            onChange={handleChange}
            value={amount}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={nextStep}
          disabled={disable}
        >
          Continue
        </button>
      </form>
    </div>
  </div>
);
export default MultiStepForm;

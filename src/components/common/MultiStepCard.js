import React from "react";
const MultiStepCard = ({
  nextStep,
  cancel,
  amount,
  buttonName,
  message,
  title,
  disable = false
}) => (
  <div className="card">
    <div className="card-body two-inline-buttons">
      <div className="text-center">
        <h5>{title}</h5>
        <br />
        <p>
          {message} <strong>{amount}</strong>
        </p>
        <br />
        <button
          type="button"
          className="btn btn-primary active"
          onClick={nextStep}
          disabled={disable}
        >
          {buttonName}
        </button>
        <button type="button" className="btn btn-danger" onClick={cancel}>
          Cancel
        </button>
      </div>
      <br />
    </div>
  </div>
);
export default MultiStepCard;

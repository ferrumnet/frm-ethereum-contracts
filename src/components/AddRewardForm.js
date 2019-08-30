import React from "react";

const AddRewardForm = ({ handleChange, handleSubmit, state, loading }) => (
  <div className="container col-sm-4 col-offset-3">
    <div className="card">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Reward Amount</label>
            <input
              type="number"
              className="form-control"
              name="amount"
              aria-describedby="emailHelp"
              placeholder="Enter Reward Amount"
              onChange={handleChange}
              value={state.amount}
            />
          </div>
          <div className="form-group">
            <label>Withdraw Amount</label>
            <input
              type="number"
              className="form-control"
              name="withdrawable"
              placeholder="Enter Withdraw Amount"
              onChange={handleChange}
              value={state.withdrawable}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={state.loading}
          >
            {state.loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>{" "}
                Loading...
              </>
            ) : (
              "Add Reward"
            )}
          </button>
        </form>
      </div>
    </div>
  </div>
);

export default AddRewardForm;
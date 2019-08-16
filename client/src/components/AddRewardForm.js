import React from 'react';

const AddRewardForm = ({ handleChange, handleSubmit, state }) => (
  <div className="container col-sm-4 col-offset-3">
      <div class="card">
    <div class="card-body">
    <form onSubmit={handleSubmit}>
      <div class="form-group">
        <label for="Amount">Reward Amount</label>
        <input
          type="number"
          class="form-control"
          name="amount"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          onChange={handleChange}
          value={state.amount}
        />
      </div>
      <div class="form-group">
        <label for="Withdraw">Withdraw Amount</label>
        <input
          type="number"
          class="form-control"
          name="withdrawable"
          placeholder="Password"
          onChange={handleChange}
          value={state.withdrawable}
        />
      </div>
      <button type="submit" class="btn btn-primary">
        Add Reward
      </button>
    </form>
    </div> 
  </div>
  </div>
);


export default AddRewardForm;

import React from 'react';

const WithdrawForm = ({ handleChange, handleSubmit, amount }) => (
  <div className="container col-sm-4 col-offset-3">
    <div className="card">
    <div className="card-body">
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label for="Withdraw">Withdraw Amount</label>
        <input
          name="amount"
          type="number"
          className="form-control"
          onChange={handleChange}
          value={amount}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        With Draw
      </button>
    </form>
  </div>
  </div>
  </div>
);


export default WithdrawForm;

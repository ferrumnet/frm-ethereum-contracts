import React from "react";
const AddContractForm = ({ handleChange, address, handleSubmit }) => (
  <div className="card">
    <div className="card-body">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Add Contract Address</label>
          <input
            name="address"
            autoComplete="off"
            type="text"
            id="address-input"
            className="form-control"
            onChange={handleChange}
            value={address}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  </div>
);
export default AddContractForm;

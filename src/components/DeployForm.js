import React from "react";

const DeployForm = ({
  stakingCap,
  stakingStart,
  stakingEnd,
  withdrawStart,
  withdrawEnd,
  handleChange,
  handleSubmit,
  loading
}) => (
  <div className="col-sm-8 offset-sm-2 top-padding" >
    <div className="card">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group row col-sm-12">
            <label className="col-sm-4">Staking Cap</label>
            <input
              type="number"
              id="stakingCap"
              name="stakingCap"
              onChange={handleChange}
              value={stakingCap}
              className="col-sm-7 form-control"
            />
          </div>
          <div className="form-group row col-sm-12">
            <label className="col-sm-4">Staking Start Date</label>
            <input
              type="date"
              id="stakingStart"
              name="stakingStart"
              onChange={handleChange}
              value={stakingStart}
              className="col-sm-7 form-control"
              required
            />
          </div>
          <div className="form-group row col-sm-12">
            <label className="col-sm-4">Staking End Date</label>
            <input
              type="date"
              id="stakingEnd"
              name="stakingEnd"
              onChange={handleChange}
              value={stakingEnd}
              className="col-sm-7 form-control"
              required
            />
          </div>
          <div className="form-group row col-sm-12">
            <label className="col-sm-4">withdraw Start Date</label>
            <input
              type="date"
              id="withdrawStart"
              name="withdrawStart"
              onChange={handleChange}
              value={withdrawStart}
              className="col-sm-7 form-control"
              required
            />
          </div>
          <div className="form-group row col-sm-12">
            <label className="col-sm-4">withdraw End Date</label>
            <input
              type="date"
              id="withdrawEnd"
              name="withdrawEnd"
              onChange={handleChange}
              value={withdrawEnd}
              className="col-sm-7 form-control"
              required
            />
          </div>
          <div className="form-group text-center">
            <button
              type="submit"
              className="btn btn-md col-sm-4  form-control btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>{" "}
                  Loading...
                </>
              ) : (
                "Deploy Contract"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default DeployForm;

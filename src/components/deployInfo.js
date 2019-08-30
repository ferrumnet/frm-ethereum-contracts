import React from "react";

const DeployInfo = ({
  stakingCap,
  stakingStart,
  stakingEnd,
  withdrawStart,
  withdrawEnd,
  loading
}) => (
  <div className="col-sm-4 top-padding">
    {loading ? (
      "Loading ...."
    ) : (
      <div className="card">
        <div className="card-header">Deployment Information</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <strong>Staking Cap: </strong> {stakingCap}
          </li>
          <li className="list-group-item">
            <strong>Staking Start Date: </strong> {stakingStart}
          </li>
          <li className="list-group-item">
            <strong>Staking End Date:</strong> {stakingEnd}
          </li>
          <li className="list-group-item">
            <strong>withdraw Start Date:</strong> {withdrawStart}
          </li>
          <li className="list-group-item">
            <strong>withdraw End Date:</strong> {withdrawEnd}
          </li>
        </ul>
      </div>
    )}
  </div>
);

export default DeployInfo;

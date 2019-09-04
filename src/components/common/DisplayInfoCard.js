import React from "react";
import { formatDate } from "../../utils/dateFormater";

const DisplayInfoCard = ({
  stakedTotal,
  stakedBalance,
  balance,
  earlyWithdrawReward,
  rewardBalance,
  withdrawStart,
  withdrawEnd,
  stakingCap,
  stakingStarts,
  stakingEnds
}) => (
  <div className="col-sm-4  top-padding">
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
          <strong>Staking Cap: </strong> {stakingCap}
        </li>
        <li className="list-group-item">
          <strong>Staking Starts: </strong>
          {formatDate(stakingStarts)}
        </li>
        <li className="list-group-item">
          <strong>Staking Ends: </strong>
          {formatDate(stakingEnds)}
        </li>
        <li className="list-group-item">
          <strong>WIthdraw Starts: </strong>
          {formatDate(withdrawStart)}
        </li>
        <li className="list-group-item">
          <strong>WIthdraw Ends: </strong>
          {formatDate(withdrawEnd)}
        </li>
        <li className="list-group-item">
          <strong>Early WIthdraw Reward: </strong> {earlyWithdrawReward}
        </li>
        <li className="list-group-item">
          <strong>Maturity WIthdraw Reward: </strong> {rewardBalance}
        </li>
        <li className="list-group-item">
          <strong>Account Balance: </strong> {balance}
        </li>
      </ul>
    </div>
    <br />
    <br />
  </div>
);
export default DisplayInfoCard;

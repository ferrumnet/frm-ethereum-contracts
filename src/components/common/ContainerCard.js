import React from 'react';
import {NavLink} from 'react-router-dom';

const ContainerCard = ({data: {contractAddress}}) => (
  <div className="container component-height">
  <br/>
  <h4>Contract information</h4>
  <br/>
  <div className="card">
    <div className="card-body">
      <h6 className="card-title">Address: {contractAddress}</h6>
      <h5 className="card-text">Actions</h5>
      <NavLink className="card-link" to={`/${contractAddress}/stake`} >Stake</NavLink>
      <NavLink className="card-link" to={`/${contractAddress}/withdraw`} >Withdraw</NavLink>
      <NavLink className="card-link" to={`/admin/${contractAddress}/addreward`}>Add Reward</NavLink>
    </div>
  </div>
</div>
);

export default ContainerCard;

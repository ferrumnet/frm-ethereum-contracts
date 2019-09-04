import React, { Component } from "react";
import DeployForm from "../components/DeployForm";
import { errorToast } from "../utils/toasts";
import {
  deployContractAction
} from "../redux/actions/deploy";
import { connect } from "react-redux";

export class Deploy extends Component {
  state = {
    stakingCap: 0,
    stakingStart: "",
    stakingEnd: "",
    withdrawStart: "",
    withdrawEnd: "",
  };

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { deployContractActionFunc } = this.props;
    const {
      stakingCap,
      stakingStart,
      stakingEnd,
      withdrawStart,
      withdrawEnd
    } = this.state;
    const stakingStartSec = Date.parse(stakingStart) / 1000;
    const stakingEndSec = Date.parse(stakingEnd) / 1000;
    const withdrawStartSec = Date.parse(withdrawStart) / 1000;
    const withdrawEndSec = Date.parse(withdrawEnd) / 1000;

    let stakingData = {
      stakingCap,
      stakingStart: stakingStartSec,
      stakingEnd: stakingEndSec,
      withdrawStart: withdrawStartSec,
      withdrawEnd: withdrawEndSec
    };

    if (stakingCap <= 0) {
      errorToast("Staking cap should be above zero");
      return;
    }

    if (stakingEndSec < stakingStartSec) {
      errorToast("Staking end must be after staking starts");
      return;
    }
    if (stakingEndSec > withdrawStartSec) {
      errorToast("Withdraw starts must be after staking ends");
      return;
    }
    if (withdrawEndSec < withdrawStartSec) {
      errorToast("withdrawEnds must be after withdraw starts");
      return;
    }
    await deployContractActionFunc(stakingData);
  };

  render() {
    const {
      stakingCap,
      stakingStart,
      stakingEnd,
      withdrawStart,
      withdrawEnd,
      loading
    } = this.state;

    return (
      <div className="container min-component-height">

          <DeployForm
            stakingCap={stakingCap}
            stakingStart={stakingStart}
            stakingEnd={stakingEnd}
            withdrawStart={withdrawStart}
            withdrawEnd={withdrawEnd}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            loading={loading}
          />

      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  deployContractActionFunc: deployContractAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Deploy);

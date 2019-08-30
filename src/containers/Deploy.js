import React, { Component } from "react";
import DeployForm from "../components/DeployForm";
import DeployInfo from "../components/deployInfo";
import { formatDate } from "../utils/dateFormater";
import { errorToast, successToast } from "../utils/toasts";
import {
  deployContractAction,
  fetchDeploymentValues
} from "../redux/actions/deploy";
import { connect } from "react-redux";

class Deploy extends Component {
  state = {
    stakingCap: 0,
    stakingStart: "",
    stakingEnd: "",
    withdrawStart: "",
    withdrawEnd: "",
    loading: false
  };

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  async componentDidMount() {
    const {
      fetchDeploymentValues,
      contract: { data }
    } = this.props;

    if (data) {
      await fetchDeploymentValues(data.festaking);
    }
  }

  handleSubmit = async e => {
    e.preventDefault();
    const { deployContractAction } = this.props;
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
    try {
      this.setState({ loading: true });
      await deployContractAction("normal", stakingData);
      const {
        fetchDeploymentValues,
        contract: { data }
      } = this.props;
      await fetchDeploymentValues(data.festaking);
      this.setState({ loading: false });
    } catch (error) {
      errorToast("Error in deploying");
      this.setState({ loading: false });
    }
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

    const {
      deployedCap,
      deployedStakingStart,
      deployedStakingEnd,
      deployedWithdrawStart,
      deployedWithdrawEnd
    } = this.props.deploymentValues || {};

    const { valuesLoading } = this.props;

    return (
      <div className="container col-sm-10 col-offset-3 min-component-height">
        <div className="row">
          <DeployInfo
            stakingCap={deployedCap}
            stakingStart={formatDate(deployedStakingStart)}
            stakingEnd={formatDate(deployedStakingEnd)}
            withdrawStart={formatDate(deployedWithdrawStart)}
            withdrawEnd={formatDate(deployedWithdrawEnd)}
            loading={valuesLoading}
          />
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  contract: state.contract,
  deploymentValues: state.contract.deploymentValues,
  valuesLoading: state.contract.valuesLoading
});

const mapDispatchToProps = {
  deployContractAction,
  fetchDeploymentValues
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Deploy);

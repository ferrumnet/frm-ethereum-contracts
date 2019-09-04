import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "../components/common/MultiStepFormLoader";
import StakeCard from "../components/common/DisplayInfoCard";
import { StakeStepper } from "../components/StakeForm";
import { connectContractAction } from "../redux/actions/deploy";
import NotFound from "../components/common/NotFound";
import {
  authorizeAddStake,
  stake,
  vars,
  approveStakeSuccesfull
} from "../redux/actions/stake";
import { errorToast } from "../utils/toasts";

export class Stake extends Component {
  state = {
    amount: 0,
    step: 1,
    disable: false
  };

  async componentDidMount() {
    const {
      connectContractActionFunc,
      contract,
      match: {
        params: { address }
      }
    } = this.props;
    if (!contract.data) {
      await connectContractActionFunc(address);
    }
    const {
      contract: { error },
    } = this.props;
    !error &&
      (async () => {
        await this.continueWithApprove();
      })();
  }

  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  };

  resetStep = () => {
    this.setState({ amount: 0, step: 1 });
  };

  continueWithApprove = async () => {
    const {
      contract: { data },
      stake: {
        variables: { deployedStakingStart, deployedStakingEnd }
      }
    } = this.props;
    const {disable} = this.state;
    const { frm, contractAddress, ac1 } = data;
    const allowance = await frm.methods.allowance(ac1, contractAddress).call();

    const currentDate = new Date();
    const now = currentDate.getTime();

   (
      now < deployedStakingStart * 1000 ||
      now > deployedStakingEnd * 1000
    ) && this.setState({ disable: true });

    !disable && (allowance > 0) && this.setState({ step: 3, amount: allowance });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  validateStake = async () => {
    const {
      contract: {
        data: { STAKING_CAP }
      },
      stake: {
        variables: { rewardBalance, stakedBalance }
      }
    } = this.props;
    const { amount } = this.state;

    if (amount <= 0) {
      errorToast("Please enter a value above zero");
      return;
    }
    if (parseInt(amount) + parseInt(stakedBalance) > STAKING_CAP) {
      errorToast("Can't stake above the staking cap");
      return;
    }

    if (rewardBalance <= 0) {
      errorToast("Can't stake, reward hasn't been set yet");
      return;
    }
    this.nextStep();
  };

  authorizeStake = async event => {
    event.preventDefault();
    const {
      contract: { data },
      authorizeAddStakeFunc
    } = this.props;
    const { amount } = this.state;
    try {
      await authorizeAddStakeFunc(amount, data);
      this.nextStep();
    } catch (error) {
      this.resetStep();
    }
  };

  handleSubmit = async () => {
    const {
      contract: { data },
      stakeFunc,
      approveStakeSuccesfullFunc
    } = this.props;
    const { amount } = this.state;
    await stakeFunc(amount, data);
    setTimeout(() => {
      approveStakeSuccesfullFunc();
      this.resetStep();
    }, 3000);
  };

  render() {
    const { amount, step, disable } = this.state;
    const {
      contract: { error },
      stake: {
        loading,
        complete,
        variables: {
          balanceOf,
          stakedBalance,
          stakedTotal,
          earlyWithdrawReward,
          rewardBalance,
          deployedWithdrawStart,
          deployedWithdrawEnd,
          deployedStakingStart,
          deployedStakingEnd,
          stakingCap
        }
      }
    } = this.props;
    return error ? (
      <NotFound />
    ) : (
      <div className="container col-sm-10 col-offset-3">
        <div className="row">
          <StakeCard
            stakedTotal={stakedTotal}
            stakedBalance={stakedBalance}
            balance={balanceOf}
            earlyWithdrawReward={earlyWithdrawReward}
            rewardBalance={rewardBalance}
            withdrawStart={deployedWithdrawStart}
            withdrawEnd={deployedWithdrawEnd}
            stakingStarts={deployedStakingStart}
            stakingEnds={deployedStakingEnd}
            stakingCap={stakingCap}
          />
          <div className="col-sm-1"> </div>
          <div className="col-sm-5">
            {loading ? (
              <Loader complete={complete} />
            ) : (
              <StakeStepper
                amount={amount}
                step={step}
                validateStake={this.validateStake}
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                authorizeStake={this.authorizeStake}
                nextStep={this.nextStep}
                cancel={this.resetStep}
                disable={disable}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ contract, stake }) => ({
  contract,
  stake
});

const mapDispatchToProps = {
  connectContractActionFunc: connectContractAction,
  authorizeAddStakeFunc: authorizeAddStake,
  stakeFunc: stake,
  varsFunc: vars,
  approveStakeSuccesfullFunc: approveStakeSuccesfull
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stake);

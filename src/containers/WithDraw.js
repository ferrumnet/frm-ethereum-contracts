import React, { Component } from "react";
import { WithdrawStepper } from "../components/WithdrawForm";
import WithdrawCard from "../components/common/DisplayInfoCard";
import Loader from "../components/common/MultiStepFormLoader";
import { connect } from "react-redux";
import { connectContractAction } from "../redux/actions/deploy";
import { vars } from "../redux/actions/stake";
import { withdraw, withdrawToDefaultState } from "../redux/actions/withdraw";
import { errorToast } from "../utils/toasts";
import NotFound from "../components/common/NotFound";

export class WithDraw extends Component {
  state = {
    amount: 0,
    step: 1,
    disable: false
  };

  async componentDidMount() {
    const {
      connectContractAction,
      contract,
      match: {
        params: { address }
      }
    } = this.props;
    if (!contract.data) {
      await connectContractAction(address);
    }
    const {
      contract: { error }
    } = this.props;
    !error && this.disableButton();
  }

  disableButton = async () => {
    const {
      stake: {
        variables: { deployedWithdrawStart, deployedWithdrawEnd }
      }
    } = this.props;

    const currentDate = new Date();
    const now = currentDate.getTime();

    (now < deployedWithdrawStart*1000 || now > deployedWithdrawEnd*1000 ) &&
      this.setState({  disable: true });
  };

  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  };

  resetStep = () => {
    this.setState({ amount: 0, step: 1 });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  validateWithdraw = async event => {
    event.preventDefault();
    const {
      stake: {
        variables: { stakeOf }
      }
    } = this.props;
    const { amount } = this.state;

    if (amount <= 0) {
      errorToast("Please enter a value above zero");
      return;
    }

    if (parseInt(stakeOf) < parseInt(amount)) {
      errorToast("You don't have enough funds");
      return;
    }
    this.nextStep();
  };

  handleSubmit = async event => {
    event.preventDefault();
    const {
      contract: { data },
      withdrawFunc,
      withdrawToDefaultStateFunc
    } = this.props;
    const { amount } = this.state;
    await withdrawFunc(amount, data);

    setTimeout(() => {
      console.log("calling time out");
      this.resetStep();
      withdrawToDefaultStateFunc();
    }, 3000);
  };

  render() {
    const { amount, step, disable } = this.state;
    const {
      contract: { error },
      stake: {
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
      },
      withdraw: { loading, complete }
    } = this.props;

    return error ? (
      <NotFound />
    ) : (
      <div className="container col-sm-10 col-offset-3">
        <div className="row">
          <WithdrawCard
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
          <div className="col-sm-1"></div>
          <div className="col-sm-5">
            {loading ? (
              <Loader complete={complete} />
            ) : (
              <WithdrawStepper
                amount={amount}
                step={step}
                validateWithdraw={this.validateWithdraw}
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                nextStep={this.nextStep}
                prevStep={this.resetStep}
                disable={disable}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ stake, withdraw, contract }) => ({
  contract,
  stake,
  withdraw
});

const mapDispatchToProps = {
  connectContractAction: connectContractAction,
  withdrawFunc: withdraw,
  varsFunc: vars,
  withdrawToDefaultStateFunc: withdrawToDefaultState
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithDraw);

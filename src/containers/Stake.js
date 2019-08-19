import React, { Component } from "react";
import { connect } from "react-redux";
import { StakeCard, StakeStepper, Loader } from "../components/StakeForm";
import { addContractData } from "../redux/actions/addReward";
import { errorToast, successToast } from "../utils/toasts";

class Stake extends Component {
  state = {
    amount: 0,
    step: 1,
    loading: false,
    complete: false
  };

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
      loading: false,
      complete: false
    });
  };

  resetStep = () => {
    this.setState({
      amount: 0,
      step: 1,
      loading: false,
      complete: false
    });
  };

  setLoading = () => {
    this.setState({ loading: true, complete: false });
  };

  async componentDidMount() {
    const {
      addContractDataFunc,
      contract: { data }
    } = this.props;
    if (!data) {
      await addContractDataFunc();
    }
    await this.vars();
  }

  call = async (method, ...args) => {
    const {
      contract: {
        data: { festaking }
      }
    } = this.props;
    return await festaking.methods[method](...args).call();
  };

  vars = async () => {
    const stakedTotal = await this.call("stakedTotal");
    const totalReward = await this.call("totalReward");
    const earlyWithdrawReward = await this.call("earlyWithdrawReward");
    const rewardBalance = await this.call("rewardBalance");
    const stakedBalance = await this.call("stakedBalance");
    this.setState({
      stakedTotal,
      totalReward,
      earlyWithdrawReward,
      rewardBalance,
      stakedBalance
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  validateStake = async event => {
    this.setLoading();
    event.preventDefault();
    const {
      contract: {
        data: { STAKING_CAP }
      }
    } = this.props;
    const { amount, stakedBalance } = this.state;

    if (amount <= 0) {
      this.stopLoading();
      errorToast("Please enter a value above zero");
      return;
    }
    if (parseInt(amount) + parseInt(stakedBalance) > STAKING_CAP) {
      this.stopLoading();
      errorToast("Can't stake above the staking cap");
      return;
    }
    const rewardBalance = await this.call("rewardBalance");
    if (rewardBalance <= 0) {
      errorToast("Can't stake, reward hasn't been set yet");
      this.stopLoading();
      return;
    }
    this.nextStep();
  };

  authorizeStake = async event => {
    this.setLoading();
    event.preventDefault();
    const {
      contract: {
        data: { contractAddress, ac1, frm, owner, GAS }
      }
    } = this.props;
    const { amount } = this.state;
    try {
      await frm.methods.transfer(ac1, amount).send({ from: owner, gas: GAS });
      await frm.methods.approve(contractAddress, amount).send({ from: ac1 });
      await frm.methods.allowance(ac1, contractAddress).call();
      this.nextStep();
    } catch (error) {
      errorToast("Unable to approve the stake, try again");
      this.stopLoading();
      this.resetStep();
    }
  };
  stopLoading = () => {
    this.setState({ loading: false });
  };

  handleSubmit = async event => {
    this.setLoading();
    event.preventDefault();
    const {
      contract: {
        data: { festaking, ac1, GAS }
      }
    } = this.props;
    const { amount } = this.state;
    try {
      await festaking.methods.stake(amount).send({ from: ac1, gas: GAS });
      const stakedTotal = await this.call("stakedTotal");
      this.setState({ stakedTotal });
      await this.vars();
      successToast("Stake was successfully added");
      this.setState({ complete: true });
      setTimeout(() => this.resetStep(), 4000);
    } catch (e) {
      errorToast("Error adding a stake");
      this.stopLoading();
      this.resetStep();
    }
  };

  render() {
    const {
      amount,
      rewardBalance,
      stakedBalance,
      step,
      loading,
      complete
    } = this.state;
    const {
      contract: { data }
    } = this.props;

    return (
      <div className="container col-sm-10 col-offset-3">
        <div className="row">
          <StakeCard
            stakingCap={(data && data.STAKING_CAP) || 0}
            reward={rewardBalance}
            stakedTotal={stakedBalance}
          />
          <div className="col-sm-2"> </div>
          <div className="col-sm-6">
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
                prevStep={this.resetStep}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  contract: state.contract
});

const mapDispatchToProps = {
  addContractDataFunc: addContractData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stake);

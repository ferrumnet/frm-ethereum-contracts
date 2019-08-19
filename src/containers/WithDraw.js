import React, { Component } from "react";
import { WithdrawStepper, WithdrawCard } from "../components/WithdrawForm";
import { connect } from "react-redux";
import { addContractData } from "../redux/actions/addReward";
import { errorToast, successToast } from "../utils/toasts";

class WithDraw extends Component {
  state = {
    amount: 0,
    step: 1
  };

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  resetStep = () => {
    this.setState({
      amount: 0,
      step: 1
    });
  };

  async componentDidMount() {
    const {
      addContractDataFunc,
      contract: { data }
    } = this.props;
    if (!data) {
      await addContractDataFunc();
    }
    await this.balance();
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
    const {
      contract: {
        data: { ac1 }
      }
    } = this.props;
    const stakedTotal = await this.call("stakedTotal");
    const totalReward = await this.call("totalReward");
    const earlyWithdrawReward = await this.call("earlyWithdrawReward");
    const rewardBalance = await this.call("rewardBalance");
    const stakedBalance = await this.call("stakeOf", ac1);

    this.setState({
      stakedTotal,
      totalReward,
      earlyWithdrawReward,
      rewardBalance,
      stakedBalance
    });
  };

  balance = async () => {
    const {
      contract: {
        data: { ac1, frm }
      }
    } = this.props;
    const res = await frm.methods.balanceOf(ac1).call();
    this.setState({ balance: res.toString() });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  validateWithdraw = async event => {
    event.preventDefault();
    const {
      contract: {
        data: { festaking, ac1 }
      }
    } = this.props;
    const { amount } = this.state;

    if (amount <= 0) {
      errorToast("Please enter a value above zero");
      return;
    }

    const balanceAmount = await festaking.methods.stakeOf(ac1).call();
    return parseInt(balanceAmount) < parseInt(amount)
      ? errorToast("You don't have enough money")
      : this.nextStep();
  };

  authorizeWithdraw = async event => {
    event.preventDefault();
    const {
      contract: {
        data: { contractAddress, ac1, frm, festaking, owner, GAS }
      }
    } = this.props;
    const { amount } = this.state;
    try {
      await festaking.methods
        .setEarlyWithdrawalPeriod(1000)
        .send({ from: owner, gas: GAS });

      await frm.methods.approve(contractAddress, amount).send({ from: ac1 });
      this.nextStep();
    } catch (error) {
      errorToast("Unable to withdrawal, try again");
      this.resetStep();
    }
  };

  handleSubmit = async event => {
    event.preventDefault();
    const {
      contract: {
        data: { festaking, ac1, GAS }
      }
    } = this.props;
    const { amount } = this.state;
    try {
      await festaking.methods.withdraw(amount).send({ from: ac1, gas: GAS });
      await this.vars();
      await this.balance();
      const balanceAmount = await festaking.methods.stakeOf(ac1).call();
      this.setState({ totalReward: balanceAmount });
      successToast("Successfully withdrew");
      this.resetStep();
    } catch (e) {
      errorToast("Error withdrawing");
      this.resetStep();
    }

    await festaking.methods.setStakingPeriod().send({ from: ac1, gas: GAS });
  };

  render() {
    const { amount, balance, stakedBalance, stakedTotal, step } = this.state;
    return (
      <div className="container col-sm-10 col-offset-3">
        <div className="row">
          <WithdrawCard
            stakedTotal={stakedTotal}
            stakedBalance={stakedBalance}
            balance={balance}
          />
          <div className="col-sm-2"></div>
          <div className="col-sm-5">
            <WithdrawStepper
              amount={amount}
              step={step}
              validateWithdraw={this.validateWithdraw}
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              authorizeWithdraw={this.authorizeWithdraw}
              nextStep={this.nextStep}
              prevStep={this.resetStep}
            />
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
)(WithDraw);

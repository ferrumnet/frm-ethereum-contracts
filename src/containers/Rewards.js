import React, { Component } from "react";
import { connect } from "react-redux";
import AddRewardForm from "../components/AddRewardForm";
import { addContractData } from "../redux/actions/addReward";
import { errorToast, successToast } from "../utils/toasts";

class AddReward extends Component {
  state = {
    amount: 0,
    withdrawable: 0
  };

  async componentDidMount() {
    const {
      addContractDataFunc,
      contract: { data }
    } = this.props;
    if (!data) {
      await addContractDataFunc();
    }
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { amount, withdrawable } = this.state;
    const {
      contract: {
        data: { owner, festaking, GAS }
      }
    } = this.props;

    // const allowance = await frm.methods.allowance(owner, contractAddress).call();
    // console.log("Owner allowance is", allowance.toString());

    if (parseInt(amount) <= 0 || parseInt(withdrawable) <= 0) {
      errorToast("Please enter values above zero");
      return;
    }
    if (parseInt(withdrawable) > parseInt(amount)) {
      errorToast(
        "Withdrawable amount should be equal or less than reward amount"
      );
      return;
    }
    const totalReward = await festaking.methods.totalReward().call();
    console.log("total reward", totalReward);

    const addReward = await festaking.methods
      .addReward(amount, withdrawable)
      .send({ from: owner, gas: GAS });

    if (addReward) {
      const totalReward2 = await festaking.methods.totalReward().call();
      console.log("total reward", totalReward2);
      successToast("Reward Added Successfully");
    } else {
      errorToast("Error adding a Reward");
    }
  };

  render() {
    return (
      <div className="min-component-height top-padding">
        <AddRewardForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          state={this.state}
        />
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
)(AddReward);

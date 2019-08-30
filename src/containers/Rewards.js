import React, { Component } from "react";
import { connect } from "react-redux";
import AddRewardForm from "../components/AddRewardForm";
import { deployContractAction } from "../redux/actions/deploy";
import { errorToast, successToast } from "../utils/toasts";

class AddReward extends Component {
  state = {
    amount: 0,
    withdrawable: 0,
    loading: false
  };

  async componentDidMount() {
    const {
      deployContractAction,
      contract: { data }
    } = this.props;
    if (!data) {
      await deployContractAction();
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

    try {
      this.setState({ loading: true });
      await festaking.methods
        .addReward(amount, withdrawable)
        .send({ from: owner, gas: GAS });
      successToast("Reward Added Successfully");
      this.setState({ loading: false });
    } catch (error) {
      errorToast("Error adding a Reward");
      this.setState({ loading: false });
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
  deployContractAction: deployContractAction
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddReward);

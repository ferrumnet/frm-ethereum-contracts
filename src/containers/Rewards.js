import React, { Component } from "react";
import { connect } from "react-redux";
import AddRewardForm from "../components/AddRewardForm";
import { addReward } from "../redux/actions/addReward";
import { errorToast } from "../utils/toasts";
import { connectContractAction } from "../redux/actions/deploy";
import { vars } from "../redux/actions/stake";

export class AddReward extends Component {
  state = { amount: 0, withdrawable: 0, disable: false };

  async componentDidMount() {
    const {
      connectContractAction,
      contract: { data },
      match: {
        params: { address }
      }
    } = this.props;
    if (!data) {
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
        variables: { deployedStakingStart }
      }
    } = this.props;
    const currentDate = new Date();
    const now = currentDate.getTime();

   (now > deployedStakingStart*1000) &&
      this.setState({ disable: true });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { amount, withdrawable } = this.state;
    const {
      contract: { data },
      addReward
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

    await addReward(amount, withdrawable, data);
    this.setState({ amount: 0, withdrawable: 0 });
  };

  render() {
    const {
      reward: { loading }
    } = this.props;
    const { disable } = this.state;

    return (
      <div className="min-component-height top-padding">
        <AddRewardForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          state={this.state}
          loading={loading}
          disable={disable}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ contract, reward, stake }) => ({
  contract,
  reward,
  stake
});

const mapDispatchToProps = {
  connectContractAction: connectContractAction,
  addReward,
  varsFunc: vars
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddReward);

import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import ContractAddressForm from "../components/AddContractForm";
import ContainerCard from '../components/common/ContainerCard';
import { connectContractAction } from "../redux/actions/deploy";
import NotFound from "../components/common/NotFound";

class Home extends Component {
  static getDerivedStateFromProps(props) {
    const {
      contract: { data },
    } = props;
    if (data) {
    }
    return null;
  }

  state = { address: "" };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleSubmit = async event => {
    event.preventDefault();
    const { address } = this.state;
    const { connectContractActionFunc } = this.props;
    await connectContractActionFunc(address);
    this.setState({address:""});
  };

  render() {
    const { address } = this.state;
    const {
      contract: { data, error },
    } = this.props;

    return (
      <div>
        <ContractAddressForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          address={address}
        />
        {error && (  <NotFound minPage={true} message="Invalid Contract Address"/> )}
        {data &&(<ContainerCard data={data}/>)}
        {!error && !data && (
        <div className="">
          <div className="center-content text-center component-height">
            <div>
              <h4>No Contract Address</h4>
            <p>Enter the contract Address</p>
            </div>
          </div>
        </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ contract }) => ({
  contract
});

const mapDispatchToProps = {
  connectContractActionFunc: connectContractAction
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Home));

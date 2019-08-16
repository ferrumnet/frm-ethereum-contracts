import React, { Component } from "react";
import getWeb3 from "../utils/getWeb3";
import FestakingContract from "../utils/festaking.json";
import AddRewardForm from '../components/AddRewardForm';

class AddReward extends Component{

    state = {
        contract: null,
        amount: 0,
        withdrawable: 0
    };

    web3 = undefined

    async UNSAFE_componentWillMount(){
        try {
            this.web3 = await getWeb3();
            const accounts = await this.web3.eth.getAccounts();
            const owner = accounts[0];

            const networkId = await this.web3.eth.net.getId();
            const deployedNetwork = FestakingContract.networks[networkId];
            
            const instance = new this.web3.eth.Contract(
                FestakingContract.abi,
                deployedNetwork && deployedNetwork.address,
            );

            this.setState({ owner, contract: instance });
        } catch (error) {
            alert(
              `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
          }
    };

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    } 

    handleSubmit = async (event) => {
        event.preventDefault();
        const { amount, withdrawable, contract, owner} = this.state;
        var Web3 = require('web3');
        const rewardAmount = Web3.utils.toWei(amount, 'ether')
        const withdrawAmount = Web3.utils.toWei(withdrawable,'ether')
        
        const addReward = await contract.methods.addReward(rewardAmount,withdrawAmount)
        .send({from:owner, gas:500000});


        if(addReward){
            console.log('reward added');
        }else{
            console.log('not added');
        }
    }

    render() {
        return(
        <div className="min-component-height top-padding">
         <AddRewardForm
          handleChange={this.handleChange} 
          handleSubmit= {this.handleSubmit}
          state={this.state}
          />
          </div>
        );
    }
}

export default AddReward;

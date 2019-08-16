import React, { Component } from "react";
import getWeb3 from "../utils/getWeb3";
import FestakingContract from "../utils/festaking.json";
import WithdrawForm from '../components/WithdrawForm';

class WithDraw extends Component {
    state = {
        web3: null,
        contract: null,
        amount: 0,
    };

    async componentDidMount(){
        try {
            const web3 = await getWeb3();
            const accounts = await web3.eth.getAccounts();
            const owner = accounts[0];

            const networkId = await web3.eth.net.getId();
            const deployedNetwork = FestakingContract.networks[networkId];
            
            const instance = new web3.eth.Contract(
                FestakingContract.abi,
                deployedNetwork && deployedNetwork.address,
            );

            this.setState({ web3, owner, contract: instance });
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
        const { amount, contract, owner} = this.state;

        if(!amount){
            alert("Enter Value")
        }else{

        var Web3 = require('web3');
        const withdrawAmount = Web3.utils.toWei(amount, 'ether')
        
        const withdraw = await contract.methods.withdraw(withdrawAmount)
        .send({from:owner, gas:500000});


        if(withdraw){
            console.log('reward added');
        }else{
            console.log('not added');
        }
    }
    }

    render (){
        const {amount} = this.state;
        return (
            <div className="min-component-height top-padding">
            <WithdrawForm
            handleChange={this.handleChange} 
            handleSubmit= {this.handleSubmit}
            amount={amount}/>
            </div>
        )
    }
}

export default WithDraw;

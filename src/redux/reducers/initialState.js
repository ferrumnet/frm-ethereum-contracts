export default {
  reward: { loading: false },
  withdraw: { loading: false, complete: false },
  stake: {
    loading: false,
    complete: false,
    variables: {
      rewardBalance: 0,
      stakedBalance: 0,
      complete: 0,
      stakingCap: 0
    }
  },
  contract: { 
    loading: false ,
    deploymentValues: {
      deployedCap:"0",
      deployedStakingStart:"",
      deployedStakingEnd:"",
      deployedWithdrawStart:"",
      deployedWithdrawEnd:"",
      stakingCap:"0",
    }
  }
};

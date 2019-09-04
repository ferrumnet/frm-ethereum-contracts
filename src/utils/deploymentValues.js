const getDeploymentValues = async festaking => {
  const deployedCap = await festaking.methods.stakingCap.call().call();
  const deployedStakingStart = await festaking.methods.stakingStarts
    .call()
    .call();
  const deployedStakingEnd = await festaking.methods.stakingEnds.call().call();
  const deployedWithdrawStart = await festaking.methods.withdrawStarts
    .call()
    .call();
  const deployedWithdrawEnd = await festaking.methods.withdrawEnds
    .call()
    .call();

  const stakingCap = await festaking.methods.stakingCap.call().call();

  return {
    deployedCap,
    deployedStakingStart,
    deployedStakingEnd,
    deployedWithdrawStart,
    deployedWithdrawEnd,
    stakingCap
  };
};

export default getDeploymentValues;

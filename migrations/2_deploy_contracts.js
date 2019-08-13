const FerrumToken = artifacts.require("FerrumToken");
const FestakingTest = artifacts.require("FestakingTest");

module.exports = async function(deployer) {
    await deployer.deploy(FerrumToken);
    const fmr = await FerrumToken.deployed();
    await deployer.deploy(FestakingTest, "Test staking contract",
        fmr.address,
        1000
    );
    await FestakingTest.deployed();
};

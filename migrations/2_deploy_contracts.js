const FerrumToken = artifacts.require("FerrumToken");
const FestakingTest = artifacts.require("FestakingTest");
const Festaking = artifacts.require("Festaking");

module.exports = async function(deployer) {
    await deployer.deploy(FerrumToken);
    const fmr = await FerrumToken.deployed();
    await deployer.deploy(FestakingTest, "Test staking contract",
        fmr.address,
        1000
    );
    await FestakingTest.deployed();
    let now=Date.now();
    let GAP = 60000;
    await deployer.deploy(Festaking, "Staking contract",
    fmr.address, now, now+GAP, now+GAP,now+GAP*2,1000);
    await Festaking.deployed(); 
};

const FerrumToken = artifacts.require("FerrumToken");

module.exports = function(deployer) {
    deployer.deploy(FerrumToken);
};

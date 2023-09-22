// migrations/1_deploy_contract.js
const simpleBlog =artifacts.require("./SimpleBlog.sol");

module.exports = function (deployer) {
    deployer.deploy(simpleBlog);
};

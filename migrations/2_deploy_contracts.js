/* eslint-disable no-console */

// ref http://truffleframework.com/docs/getting_started/migrations

const KeyUtils = artifacts.require('./utils/KeyUtils.sol')
const StringUtils = artifacts.require('./utils/StringUtils.sol')

const ServiceProvider = artifacts.require('./ServiceProvider.sol')
const IdentityOwner = artifacts.require('./IdentityOwner.sol')
const TimelockedEscrow = artifacts.require('./TimelockedEscrow.sol')

const isDeveloperNetwork = network => network.startsWith('develop')
const isTestNetwork = network => network.startsWith('test')

const migrate = (deployer, network, accounts) => {
  const [superuser, serviceProviderOwner, punter] = accounts

  const deployContract = (label, contract, fromAddress) => {
    console.log(`deploy ${label}`)
    deployer.deploy(contract, { from: fromAddress }).then(() => {
      console.log(`Deployed ${label} contract to`, contract.address, 'from', fromAddress)
    })
  }

  console.log('Deploying to network', network)

  deployer.deploy([KeyUtils, StringUtils])

  if (isDeveloperNetwork(network) || isTestNetwork(network)) {
    deployContract('dummy service provider', ServiceProvider, serviceProviderOwner)
    deployContract('dummy identity owner', IdentityOwner, punter)
    deployContract('dummy timelocked escrow', TimelockedEscrow, punter)
  }
}

module.exports = migrate

/* eslint-disable no-console */

// ref http://truffleframework.com/docs/getting_started/migrations

const MockKEY = artifacts.require('./MockKEY.sol')
const MarketplaceManager = artifacts.require('./MarketplaceManager.sol')

const isDeveloperNetwork = network => network.startsWith('develop')
const isTestNetwork = network => network.startsWith('test')

const migrate = (deployer, network, accounts) => {
  const [superuser] = accounts

  console.log('Deploying to network', network)
  console.log('Superuser', superuser)

  if (isDeveloperNetwork(network) || isTestNetwork(network)) {
    deployer.deploy(MockKEY, { from: superuser }).then(() => {
      console.log('deployed MockKEY', MockKEY.address)
      return deployer
        .deploy(MarketplaceManager, MockKEY.address, { from: superuser })
        .then(() => {
          console.log('deployed MarketplaceManager', MarketplaceManager.address)
        })
    })
  } else {
    // deploy the MarketplaceManager using the known KEY address.
  }
}

module.exports = migrate

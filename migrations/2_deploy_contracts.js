/* eslint-disable no-console */

// ref http://truffleframework.com/docs/getting_started/migrations

const KeyUtils = artifacts.require('./utils/KeyUtils.sol')

const TimelockedEscrow = artifacts.require('./TimelockedEscrow.sol')

const isDeveloperNetwork = network => network.startsWith('develop')
const isTestNetwork = network => network.startsWith('test')

const migrate = (deployer, network, accounts) => {
  const [superuser] = accounts

  console.log('Deploying to network', network)

  deployer.deploy(KeyUtils)

  if (isDeveloperNetwork(network) || isTestNetwork(network)) {
    deployer.deploy(TimelockedEscrow, 28, { from: superuser }).then(() => {
      console.log('Deployed TimelockedEscrow contract to', TimelockedEscrow.address, 'from', superuser)
    })
  }
}

module.exports = migrate

// ref https://medium.com/level-k/testing-smart-contracts-with-truffle-7849b3d9961

const assertThrows = require('../utils/assertThrows')
const { getContract, getLog } = require('../utils/txHelpers')

const MarketplaceManager = artifacts.require('./MarketplaceManager.sol')
const TimelockedEscrow = artifacts.require('./TimelockedEscrow.sol')

contract('TimelockedEscrow (whitelisting)', accounts => {
  const [punter, serviceProvider] = accounts.slice(1)
  const TWENTY_EIGHT_DAYS = 28

  let escrow

  before(async () => {
    const manager = await MarketplaceManager.deployed()
    // create an escrow
    const tx = await manager.createEscrow(TWENTY_EIGHT_DAYS)
    escrow = getContract(tx, 'EscrowCreated', 'escrow', TimelockedEscrow)
  })

  context('whitelist', () => {
    it("won't whitelist a zero address", () =>
      assertThrows(escrow.whitelist(0x0)))

    it('isWhitelisted returns false if the address supplied was not whitelisted', async () => {
      const isWhitelisted = await escrow.isWhitelisted.call(serviceProvider)
      assert.isFalse(isWhitelisted)
    })

    it("non owner can't whitelist a serviceProvider", () =>
      assertThrows(escrow.whitelist(serviceProvider, { from: punter })))

    it('owner can whitelist a serviceProvider', async () => {
      const tx = await escrow.whitelist(serviceProvider)
      assert.notEqual(getLog(tx, 'ServiceProviderWhitelisted'), null)
    })

    it('isWhitelisted returns true if the address supplied was whitelisted', async () => {
      const isWhitelisted = await escrow.isWhitelisted.call(serviceProvider)
      assert.isTrue(isWhitelisted)
    })
  })

  context('unwhitelist', () => {
    it("won't unwhitelist a zero address", () =>
      assertThrows(escrow.unwhitelist(0x0)))

    it("won't unwhitelist an address that wasn't whitelisted", () =>
      assertThrows(escrow.unwhitelist(punter)))

    it("non owner can't whitelist a previously whitelisted serviceProvider", () =>
      assertThrows(escrow.unwhitelist(serviceProvider, { from: punter })))

    it('owner can unwhitelist a previously whitelisted serviceProvider', async () => {
      const tx = await escrow.unwhitelist(serviceProvider)
      assert.notEqual(getLog(tx, 'ServiceProviderUnwhitelisted'), null)
    })
  })
})

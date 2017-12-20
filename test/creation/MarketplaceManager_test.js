const { getContract } = require('../utils/txHelpers')
const assertThrows = require('../utils/assertThrows')

const MarketplaceManager = artifacts.require('./MarketplaceManager.sol')
const TimelockedEscrow = artifacts.require('./TimelockedEscrow.sol')

contract('MarketplaceManager', (accounts) => {
  const [superuser] = accounts

  let manager

  before(async () => {
    manager = await MarketplaceManager.deployed()
  })

  it('is owned by superuser', async () => {
    const owner = await manager.owner.call()
    assert.equal(owner, superuser, `Expected the owner to be '${superuser}'`)
  })

  context('creating with an invalid address', () => assertThrows(MarketplaceManager.new(0x0, { from: superuser })))

  context('createEscrow', () => {
    const period = 28 // 28 days.
    let escrow

    before(async () => {
      const tx = await manager.createEscrow(period)
      escrow = getContract(tx, 'EscrowCreated', 'escrow', TimelockedEscrow)
    })

    it('creates an escrow', () => {
      assert.notEqual(escrow, null)
      assert.notEqual(escrow, undefined)
    })

    it('the escrow has the correct timelockPeriod', async () => {
      const timelockPeriod = await escrow.timelockPeriod.call()
      assert.equal(timelockPeriod.toNumber(), period)
    })

    it('the escrow is also owned by superuser', async () => {
      const owner = await escrow.owner.call()
      assert.equal(owner, superuser, `Expected the owner to be '${superuser}'`)
    })

    context('invalid timelockPeriod', () => {
      const TOO_LONG = 100 * 365 // 100 years

      it('0 period throws an error', () => assertThrows(manager.createEscrow(0)))
      it('too long period throws an error', () => assertThrows(manager.createEscrow(TOO_LONG)))
    })
  })
})

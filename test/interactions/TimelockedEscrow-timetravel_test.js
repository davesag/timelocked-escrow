// ref https://medium.com/level-k/testing-smart-contracts-with-truffle-7849b3d9961

const timeTravel = require('../utils/timeTravel')
const { getLog } = require('../utils/txHelpers')

const MockKey = artifacts.require('./MockKey.sol')
const TimelockedEscrow = artifacts.require('./TimelockedEscrow.sol')

contract('TimelockedEscrow (after time travel)', (accounts) => {
  const [punter, serviceProvider] = accounts.slice(1)

  const amount = 10
  const FOURTY_DAYS = 40 * 24 * 60 * 60

  let escrow
  let token

  before(async () => {
    token = await MockKey.deployed()
    escrow = await TimelockedEscrow.deployed()
    // make sure punter has some KEY
    await token.freeMoney(punter, amount)
    await token.approve(escrow.address, amount, { from: punter })
    await escrow.deposit(amount, { from: punter })
    await timeTravel(FOURTY_DAYS)
  })

  context('areFundsTimelocked', () => {
    it('punter\'s funds are no longer timelocked', async () => {
      const areFundsTimelocked = await escrow.areFundsTimelocked(punter)
      assert.isFalse(areFundsTimelocked)
    })
  })

  context('transferring funds', () => {
    it('punter can transfer some KEY to a non-whitelisted address', async () => {
      const tx = await escrow.transfer(serviceProvider, amount / 2, { from: punter })
      assert.notEqual(getLog(tx, 'KEYTransferred'), null)
    })

    it('punter can retrieve the rest of their funds', async () => {
      const tx = await escrow.retrieve({ from: punter })
      assert.notEqual(getLog(tx, 'KEYRetreived'), null)
    })

    it('now punter has no funds on deposit', async () => {
      const hasFunds = await escrow.hasFunds(punter, amount)
      assert.isFalse(hasFunds)
    })
  })
})

const TimelockedEscrow = artifacts.require('./TimelockedEscrow.sol')
const MockKEY = artifacts.require('./MockKEY.sol')

const assertThrows = require('../utils/assertThrows')

contract('TimelockedEscrow (creation with params)', (accounts) => {
  const [superuser] = accounts

  const SENSIBLE_TIME = 28 // 28 days
  const SILLY_TIME = 100 * 356 // 100 years
  const FROM_SUPERUSER = { from: superuser }

  let tokenAddress

  before(async () => {
    const token = await MockKEY.deployed()
    tokenAddress = token.address
  })

  it('can create an escrow with a sensible timelockPeriod', async () => {
    const { address } = await TimelockedEscrow.new(SENSIBLE_TIME, tokenAddress, FROM_SUPERUSER)
    assert.notEqual(address, null)
  })

  it('can\'t create an escrow with a silly timelockPeriod', async () => {
    await assertThrows(TimelockedEscrow.new(SILLY_TIME, tokenAddress, FROM_SUPERUSER))
  })
})

const TimelockedEscrow = artifacts.require('./TimelockedEscrow.sol')

contract('TimelockedEscrow', (accounts) => {
  const [superuser] = accounts

  let escrow

  before(async () => {
    escrow = await TimelockedEscrow.deployed()
  })

  it('is owned by superuser', async () => {
    const owner = await escrow.owner.call()
    assert.equal(owner, superuser, `Expected the owner to be '${superuser}'`)
  })

  it('has timelockPeriod of 28 days', async () => {
    const timelockPeriod = await escrow.timelockPeriod.call()
    assert.equal(timelockPeriod.toNumber(), 28, 'Expected the timelockPeriod to be 28')
  })
})

// ref https://medium.com/level-k/testing-smart-contracts-with-truffle-7849b3d9961

const assertThrows = require('../utils/assertThrows')
const { getLog } = require('../utils/txHelpers')

const MockKey = artifacts.require('./MockKey.sol')
const TimelockedEscrow = artifacts.require('./TimelockedEscrow.sol')

contract('TimelockedEscrow', (accounts) => {
  const [owner, punter, serviceProvider, deadbeatPunter] = accounts

  const amount = 10

  let escrow
  let token

  before(async () => {
    token = await MockKey.deployed()
    escrow = await TimelockedEscrow.deployed()
    // make sure punter has some KEY
    await token.freeMoney(punter, amount)
    await token.approve(escrow.address, amount, { from: punter })
  })

  context('deposit', () => {
    // deadbeat punter has not approved a transfer, and has no money
    context('deadbeat punter', () => {
      it('can\'t deposit KEY', async () => {
        await assertThrows(escrow.deposit(amount, { from: deadbeatPunter }))
      })
    })

    context('invalid amounts', () => {
      it('punter can\'t deposit zero KEY', async () => {
        await assertThrows(escrow.deposit(0, { from: punter }))
      })

      // negative numbers become massive +ve numbers.
      // -1 javascript becomes 1.157920892373162e+77 due to conversion to unsigned int.
      it('punter can\'t deposit negative KEY', async () => {
        await assertThrows(escrow.deposit(-1, { from: punter }))
      })

      it('punter can\'t deposit more KEY than they approved', async () => {
        await assertThrows(escrow.deposit(amount + 1, { from: punter }))
      })
    })

    it('punter can deposit the approved amount of KEY', async () => {
      const tx = await escrow.deposit(amount, { from: punter })
      assert.notEqual(getLog(tx, 'KEYDeposited'), null)
    })
  })

  context('after successful deposit', () => {
    it('punter\'s balance is 0', async () => {
      const balance = await token.balanceOf(punter)
      assert.equal(balance.toNumber(), 0)
    })

    context('hasFunds', () => {
      it('escrow has funds for the punter', async () => {
        const hasFunds = await escrow.hasFunds(punter, amount)
        assert.isTrue(hasFunds)
      })

      it('escrow has at least that much funds for the punter', async () => {
        const hasFunds = await escrow.hasFunds(punter, amount - 1)
        assert.isTrue(hasFunds)
      })

      it('escrow does not have too many funds for the punter', async () => {
        const hasFunds = await escrow.hasFunds(punter, amount + 1)
        assert.isFalse(hasFunds)
      })

      it('zero address fails', async () => {
        await assertThrows(escrow.hasFunds(0x0, amount))
      })

      // negative numbers become massive +ve numbers.
      // -1 javascript becomes 1.157920892373162e+77 due to conversion to unsigned int.
      it('negative amount returns false', async () => {
        const hasFunds = await escrow.hasFunds(punter, -1)
        assert.isFalse(hasFunds)
      })

      it('zero amount fails', async () => {
        await assertThrows(escrow.hasFunds(punter, 0))
      })

      it('punter with no funds on deposit returns false', async () => {
        const hasFunds = await escrow.hasFunds(deadbeatPunter, amount)
        assert.isFalse(hasFunds)
      })
    })
  })
})

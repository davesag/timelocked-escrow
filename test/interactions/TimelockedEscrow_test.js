// ref https://medium.com/level-k/testing-smart-contracts-with-truffle-7849b3d9961

const faker = require('faker')

const assertThrows = require('../utils/assertThrows')

const TimelockedEscrow = artifacts.require('./TimelockedEscrow.sol')

contract('TimelockedEscrow', () => {
  let io
  let owner

  before(async () => {
    io = await TimelockedEscrow.deployed()
    owner = await io.owner()
  })

  context('whitelist', () => {
    // some excellent tests
  })

  context('unwhitelist', () => {
    // some excellent tests
  })
})

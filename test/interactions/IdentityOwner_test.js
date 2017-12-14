// ref https://medium.com/level-k/testing-smart-contracts-with-truffle-7849b3d9961

const faker = require('faker')

const assertThrows = require('../utils/assertThrows')

const IdentityOwner = artifacts.require('./IdentityOwner.sol')

contract('IdentityOwner', () => {
  let io
  let owner

  before(async () => {
    io = await IdentityOwner.deployed()
    owner = await io.owner()
  })

  context('what are we testing?', () => {
    // some excellent tests
  })
})

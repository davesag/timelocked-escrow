const IdentityOwner = artifacts.require('./TimelockedEscrow.sol')

contract('TimelockedEscrow', (accounts) => {
  const punter = accounts[2]

  it('is owned by punter', () => IdentityOwner.deployed()
    .then(instance => instance.owner())
    .then((owner) => {
      assert.equal(owner, punter, `Expected the owner to be '${punter}'`)
    }))
})

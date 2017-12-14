const IdentityOwner = artifacts.require('./TimelockedEscrow.sol')

contract('TimelockedEscrow', (accounts) => {
  const [superuser] = accounts

  it('is owned by superuser', () => IdentityOwner.deployed()
    .then(instance => instance.owner())
    .then((owner) => {
      assert.equal(owner, superuser, `Expected the owner to be '${superuser}'`)
    }))
})

const ServiceProvider = artifacts.require('./ServiceProvider.sol')

contract('ServiceProvider', (accounts) => {
  const serviceProviderOwner = accounts[1]

  it('is owned by serviceProviderOwner', () => ServiceProvider.deployed()
    .then(instance => instance.owner())
    .then((owner) => {
      assert.equal(owner, serviceProviderOwner, `Expected the owner to be '${serviceProviderOwner}'`)
    }))
})

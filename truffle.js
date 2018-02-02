const {
  name: packageName,
  version,
  description,
  keywords,
  license,
  author,
  contributors
} = require('./package.json')

module.exports = {
  packageName,
  version,
  description,
  keywords,
  license,
  authors: [author, ...contributors],
  networks: {
    ropsten: {
      network_id: 3,
      provider: null, // TODO: add this
      from: null, // TODO: add this
      gas: 5000000
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
}

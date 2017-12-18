const jsonrpc = '2.0'
const id = 0
const base = { jsonrpc, id }

const send = (method, params =  []) => web3.currentProvider.send({ ...base, method, params })

const timeTravel = async (seconds) => {
  await send('evm_increaseTime', [seconds])
  await send('evm_mine')
}

module.exports = timeTravel

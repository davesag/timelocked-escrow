const getLog = (tx, event) => {
  const theLog = tx.logs.find(log => log.event === event)
  if (!theLog) throw new Error(`No logs with event ${event}. Logs ${JSON.stringify(tx.logs)}`)
  return theLog
}

const getAddress = (tx, event, variable) => {
  const log = getLog(tx, event)
  const address = log.args[variable]
  if (!address) throw new Error(`No variable ${variable} in log's args given event ${event}. Log.args ${log.args}`)
  return address
}

const getContract = (tx, event, variable, Contract) => Contract.at(getAddress(tx, event, variable))

module.exports = {
  getLog,
  getAddress,
  getContract
}

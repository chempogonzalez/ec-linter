const readline = require('readline')

const logUpdate = msg => {
  const blank = '\n'.repeat(process.stdout.rows)
  console.log(blank)
  readline.cursorTo(process.stdout, 0, 0)
  readline.clearScreenDown(process.stdout)
  console.log(msg)
}

logUpdate.done = msg => {
  logUpdate(msg)
  console.log()
}

/**
 * Logs a message in the command line
 *
 * @param args all passed arguments
 */
function log (...args) {
  console.log('[@chempo/ec-linter] ', ...args)
}
/**
 * Shows an error in the command line and exits process
 *
 * @param {String} msg message to be displayed
 */
const displayError = msg => {
  console.error(`✖ Error: ${msg}\n`)
  process.exit(1)
}

module.exports = { log, displayError, logUpdate }

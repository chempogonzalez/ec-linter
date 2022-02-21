/**
 * Logs a message in the command line
 *
 * @param {String} msg message to be displayed
 */
const log = msg => console.log(msg)


/**
 * Shows an error in the command line and exits process
 *
 * @param {String} msg message to be displayed
 */
const displayError = msg => {
  console.error(`✖ Error: ${msg}\n`)
  process.exit(1)
}

module.exports = { log, displayError }

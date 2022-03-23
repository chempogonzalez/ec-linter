const execa = require('execa')



const SUCCESS_CODE = 0

/**
 * Finishes the execution with a succesful code
 */
const exitExecutionWithSuccess = () => process.exit(SUCCESS_CODE)


/**
 * Executes the provided command and returns a promise with the process.exit code
 *
 * @param bin       Binary path or alias (i.e: 'npm')
 * @param args      array of command args (i.e: ['run', 'lint'])
 * @param options   *child_process.spawn* options
 *
 * @return Process exit code
 */
function executeCommand (bin, args, options = {}) {
  if (options.stdio !== 'ignore') {
    // eslint-disable-next-line no-console
    console.log('')
  }

  const execaOptions = {
    shell: true,
    stdio: 'inherit',
    cwd: process.cwd(),
    ...options,
  }

  return execa(bin, args, execaOptions).then(() => SUCCESS_CODE)
}

module.exports = { exitExecutionWithSuccess, executeCommand }

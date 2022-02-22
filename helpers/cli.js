const execa = require('execa')

/**
 * Finishes the execution with a succesful code
 */
const exitExecutionWithSuccess = () => process.exit(0)


/**
 * Spawn given command and return a promise of the exit code value
 * @param  {String} bin     Binary path or alias
 * @param  {Array} args    Array of args, like ['npm', ['run', 'test']]
 * @param  {Object} options Options to pass to child_process.spawn call
 * @return {Promise<any>} Process exit code
 */
function getSpawnPromise (bin, args, options = {}) {
  if (options.stdio !== 'ignore') {
    console.log('')
  }

  const execaOptions = {
    shell: true,
    stdio: 'inherit',
    cwd: process.cwd(),
    ...options,
  }

  return execa(bin, args, execaOptions).then(() => 0)
}

module.exports = { exitExecutionWithSuccess, getSpawnPromise }

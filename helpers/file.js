// @ts-check
const fse = require('fs-extra')
const { log, displayError } = require('./logs.js')


/**
 * Write a file with given content
 * @param  {String} path Path of file to write
 * @param  {String} content Content to write
 * @return {Promise}
 */
const writeFile = (path, content) =>
  fse
    .outputFile(path, content)
    .then(() => log(`Created ${path}`))
    .catch(() => displayError(`Failed creating ${path}`))


/**
 * Remove a file
 * @param  {String} path Path of file to remove
 * @return {Promise}
 */
const removeFile = path =>
  fse
    .remove(path)
    .then(() => log(`Removed ${path}`))
    .catch(() => displayError(`Failed removing ${path}`))

module.exports = { writeFile, removeFile }

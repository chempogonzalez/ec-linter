// @ts-check
const fs = require('fs-extra')
const { log, displayError, logUpdate } = require('./logs.js')


/**
 * Write a file with given content
 *
 * @param {String} path Path of file to write
 * @param {String} content Content to write
 */
const writeFile = (path, content) =>
  fs.outputFile(path, content)
    .then(() => logUpdate(`Created ${path} file`))
    .catch(() => displayError(`Failed creating ${path} file`))


/**
 * Removes a file based on path provided
 *
 * @param {String} path path of the file to be removed
 */
const removeFile = path =>
  fs.remove(path)
    .then(() => log(`Removed ${path} file`))
    .catch(() => displayError(`Failed removing ${path} file`))

module.exports = { writeFile, removeFile }

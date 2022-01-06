const match = require('micromatch')
const debug = require('debug')('@metalsmith/remove')
const { normalize } = require('path')

/**
 *
 * @typedef {Object} Options
 * @property {String[]} patterns
 */

/**
 * A Metalsmith plugin to remove files from the build
 *
 * @param  {String|String[]|Options} [options] One or more [glob patterns](https://en.wikipedia.org/wiki/Glob_(programming))
 * @return {import('metalsmith').Plugin}
 */
function plugin(options) {
  return function remove(files, metalsmith, done) {
    setImmediate(done)

    if ('string' == typeof options) {
      options = [options]
    }
    if (Array.isArray(options)) {
      options = { patterns: options }
    }
    options = options || {}
    const patterns = options.patterns || []

    const matches = match(Object.keys(files), patterns, { dot: true, format: normalize })
    debug('Marked %s files to remove', matches.length)

    matches.forEach((filename) => {
      delete files[filename]
      debug('Removed file %s', filename)
    })
  }
}

module.exports = plugin

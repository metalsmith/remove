'use strict'

function normalizeOptions(options) {
  if ('string' == typeof options) {
    options = [options]
  }
  if (Array.isArray(options)) {
    options = { patterns: options }
  }
  options = options || {}
  return options
}

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
function remove(options) {
  return function remove(files, metalsmith, done) {
    const patterns = normalizeOptions(options).patterns || []
    const matches = metalsmith.match(patterns, Object.keys(files))
    const debug = metalsmith.debug('@metalsmith/remove')

    if (!matches.length) {
      debug.warn('No files marked for removal')
    } else {
      debug('Marked %s files for removal', matches.length)
    }

    matches.forEach((filename) => {
      delete files[filename]
      debug('Removed file %s', filename)
    })

    done()
  }
}

export default remove

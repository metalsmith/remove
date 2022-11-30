import debugLib from 'debug'
const debug = debugLib('@metalsmith/remove')

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
    if ('string' == typeof options) {
      options = [options]
    }
    if (Array.isArray(options)) {
      options = { patterns: options }
    }
    options = options || {}
    const patterns = options.patterns || []

    const matches = metalsmith.match(patterns)
    debug('Marked %s files to remove', matches.length)

    matches.forEach((filename) => {
      delete files[filename]
      debug('Removed file %s', filename)
    })

    done()
  }
}

export default remove

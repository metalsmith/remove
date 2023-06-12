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
 * @example
 * // remove all dotfiles that are direct children of metalsmith.source()
 * metalsmith.use(remove('.*'))
 * // remove all JSON files
 * metalsmith.use(remove(['**\/*.json']))
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

    for (let i = 0; i < matches.length; i++) {
      const filename = matches[i]
      try {
        const success = delete files[filename]
        // delete returns false in CJS non-strict mode
        /* c8 ignore next */
        if (success === false) throw new Error()
        debug.info('Removed file "%s"', filename)
        // but throws in CJS strict-mode or ESM mode
      } catch (err) {
        debug.error('Failed to remove file "%s"', filename)
        break
      }
    }

    done()
  }
}

export default remove

const match = require('multimatch');

/**
 * 
 * @typedef {Object} Options 
 * @property {String[]} patterns
 */

/**
 * A Metalsmith plugin to remove files from the build by pattern.
 *
 * @param  {String|String[]|Options} [options]
 * @return {import('metalsmith').Plugin}
 */
function plugin(options) {
  return function remove(files, metalsmith, done) {
    setImmediate(done);

    if ('string' == typeof options) {
      options = [options];
    }
    if (Array.isArray(options)) {
      options = { patterns: options };
    }
    options = options || {};
    const patterns = options.patterns || [];

    match(Object.keys(files), patterns).forEach(filename => {
      delete files[filename];
    });
  }
};

module.exports = plugin;

const match = require('multimatch');

/**
 * Metalsmith plugin to ignore files that match a pattern.
 *
 * @param  {mixed} opts string, array, or object
 *
 * @return {function}
 */
const plugin = opts => (files, metalsmith, done) => {
  if ('string' == typeof opts) {
    opts = [opts];
  }
  if (opts instanceof Array) {
    opts = { patterns: opts };
  }
  opts = opts || {};
  const patterns = opts.patterns || [];

  match(Object.keys(files), patterns).forEach(filename => {
    delete files[filename];
  });

  setImmediate(done);
};

// Expose `plugin`.
module.exports = plugin;

var match = require('multimatch');

/**
 * Metalsmith plugin to ignore files that match a pattern.
 *
 * @param {String or Array or Object} opts
 * @return {Function}
 */
var plugin = function (opts) {
  if ('string' == typeof opts) opts = [opts];
  if (opts instanceof Array) opts = { patterns: opts };
  opts = opts || {};
  var patterns = opts.patterns || [];

  return function(files, metalsmith, done){
    setImmediate(done);
    var result = match(Object.keys(files), patterns).forEach(function (filename) {
      delete files[filename];
    });
  };
}

// Expose `plugin`.
module.exports = plugin;

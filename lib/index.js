
var Match = require('minimatch').Minimatch;

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin to ignore files that match a pattern.
 *
 * @param {String or Array or Object} opts
 * @return {Function}
 */

function plugin(opts){
  debugger;
  if ('string' == typeof opts) opts = [opts];
  if (opts instanceof Array) opts = { patterns: opts };
  opts = opts || {};

  var patterns = opts.patterns || [];
  var matchers = patterns.map(function(str){
    return new Match(str);
  });

  return function(files, metalsmith, done){
    setImmediate(done);
    for (var file in files) {
      for (var i = 0, matcher; matcher = matchers[i]; i++) {
        if (matcher.match(file)) delete files[file];
      }
    }
  };
}
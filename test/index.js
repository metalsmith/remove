
var equal = require('assert-dir-equal');
var Metalsmith = require('metalsmith');
var ignore = require('..');
var rimraf = require('rimraf');
var each = require('async').each;
var join = require('path').join;

describe('metalsmith-ignore', function(){
  beforeEach(function(done) {
    var pathsToClean = [
      join(__dirname, '/fixtures/array/build/'),
      join(__dirname, '/fixtures/object/build/'),
      join(__dirname, '/fixtures/string/build/')
    ];
    each(pathsToClean, rimraf, done);
  });

  it('should ignore a patterns', function(done){
    var m = Metalsmith('test/fixtures/object').use(ignore({
      patterns: ['ignored.*', 'removed.*']
    }));

    m.build(function(err){
      if (err) return done(err);
      equal('test/fixtures/object/build', 'test/fixtures/object/expected');
      done();
    });
  });

  it('should take an array shorthand', function(done){
    var m = Metalsmith('test/fixtures/array').use(ignore(['ignored.*', 'removed.*']));
    m.build(function(err){
      if (err) return done(err);
      equal('test/fixtures/array/build', 'test/fixtures/array/expected');
      done();
    });
  });

  it('should take a string shorthand', function(done){
    var m = Metalsmith('test/fixtures/string').use(ignore('ignored.*'));
    m.build(function(err){
      if (err) return done(err);
      equal('test/fixtures/string/build', 'test/fixtures/string/expected');
      done();
    });
  });
});

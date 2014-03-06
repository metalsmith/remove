
var equal = require('assert-dir-equal');
var Metalsmith = require('metalsmith');
var ignore = require('..');

describe('metalsmith-ignore', function(){
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
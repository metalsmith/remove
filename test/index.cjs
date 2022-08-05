/* eslint-env node, mocha */

const equal = require('assert-dir-equal')
/* eslint-disable-next-line */
const remove = require('../lib/index.cjs')
const Metalsmith = require('metalsmith')

describe('@metalsmith/remove', function () {
  it('should remove files by patterns', function (done) {
    const m = Metalsmith('test/fixtures/object')
      .clean(true)
      .use(
        remove({
          patterns: ['ignored.*', 'removed.*']
        })
      )

    m.build(function (err) {
      if (err) return done(err)
      equal('test/fixtures/object/build', 'test/fixtures/object/expected')
      done()
    })
  })

  it('should take an array shorthand', function (done) {
    const m = Metalsmith('test/fixtures/array')
      .clean(true)
      .use(remove(['ignored.*', 'removed.*']))
    m.build(function (err) {
      if (err) return done(err)
      equal('test/fixtures/array/build', 'test/fixtures/array/expected')
      done()
    })
  })

  it('should take a string shorthand', function (done) {
    const m = Metalsmith('test/fixtures/string').clean(true).use(remove('ignored.*'))
    m.build(function (err) {
      if (err) return done(err)
      equal('test/fixtures/string/build', 'test/fixtures/string/expected')
      done()
    })
  })

  it('should take a string and ignore tilda', function (done) {
    const m = Metalsmith('test/fixtures/string-tilda').clean(true).use(remove('*~'))
    m.build(function (err) {
      if (err) return done(err)
      equal('test/fixtures/string-tilda/build', 'test/fixtures/string-tilda/expected')
      done()
    })
  })

  it('should ignore non-string or array inputs', function (done) {
    Metalsmith('test/fixtures/other')
      .use(remove(null))
      .build(function (err) {
        if (err) return done(err)
        equal('test/fixtures/other/build', 'test/fixtures/other/expected')
        done()
      })
  })
})

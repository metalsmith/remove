/* eslint-env node, mocha */

const equal = require('assert-dir-equal')
const assert = require('assert')
/* eslint-disable-next-line */
const remove = require('../lib/index.cjs')
const Metalsmith = require('metalsmith')

describe('@metalsmith/remove', function () {
  it('should remove files by patterns', function (done) {
    const m = Metalsmith('test/fixtures/object')
      .env('DEBUG', '@metalsmith/remove*')
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
      .env('DEBUG', '@metalsmith/remove*')
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
      .env('DEBUG', '@metalsmith/remove*')
    m.build(function (err) {
      if (err) return done(err)
      equal('test/fixtures/string/build', 'test/fixtures/string/expected')
      done()
    })
  })

  it('should take a string and ignore tilda', function (done) {
    const m = Metalsmith('test/fixtures/string-tilda').clean(true).use(remove('*~'))
      .env('DEBUG', '@metalsmith/remove*')
    m.build(function (err) {
      if (err) return done(err)
      equal('test/fixtures/string-tilda/build', 'test/fixtures/string-tilda/expected')
      done()
    })
  })

  it('should ignore non-string or array inputs', function (done) {
    Metalsmith('test/fixtures/other')
      .env('DEBUG', '@metalsmith/remove*')
      .use(remove(null))
      .build(function (err) {
        if (err) return done(err)
        equal('test/fixtures/other/build', 'test/fixtures/other/expected')
        done()
      })
  })

  it('should log an error when failing to remove a file from the build', function (done) {
    const files = {}
    const ms = Metalsmith('test/fixtures/other')
    const debuggr = () => { }
    ms.debug = () => debuggr
    let msg
    debuggr.error = (log, arg) => {
      msg = log.replace('%s', arg)
    }
    debuggr.warn = () => {}
    debuggr.info = () => {}
    Object.defineProperty(files, 'notwritable', {
      value: 'fixed',
      writable: false,
      configurable: false,
      enumerable: true
    })
    remove('**')(files, ms, (err) => {
      if (err) done(err)
      assert.strictEqual(msg, 'Failed to remove file "notwritable"')
      done()
    })
  })
})

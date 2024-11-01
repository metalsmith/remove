import assert from 'node:assert'
import { resolve, dirname } from 'node:path'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import equal from 'assert-dir-equal'
import Metalsmith from 'metalsmith'
import remove from '../src/index.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const { name } = JSON.parse(readFileSync(resolve(__dirname, '../package.json'), 'utf-8'))

function fixture(p) {
  return resolve(__dirname, 'fixtures', p)
}

describe('@metalsmith/remove', function () {
  it('should export a named plugin function matching package.json name', function () {
    const namechars = name.split('/')[1]
    const camelCased = namechars.split('').reduce((str, char, i) => {
      str += namechars[i - 1] === '-' ? char.toUpperCase() : char === '-' ? '' : char
      return str
    }, '')
    assert.strictEqual(remove().name, camelCased)
  })

  it('should remove files by patterns', function (done) {
    const m = Metalsmith(fixture('object'))
      .env('DEBUG', '@metalsmith/remove*')
      .clean(true)
      .use(
        remove({
          patterns: ['ignored.*', 'removed.*']
        })
      )

    m.build(function (err) {
      if (err) return done(err)
      equal(fixture('object/build'), fixture('object/expected'))
      done()
    })
  })

  it('should take an array shorthand', function (done) {
    const m = Metalsmith(fixture('array'))
      .env('DEBUG', '@metalsmith/remove*')
      .clean(true)
      .use(remove(['ignored.*', 'removed.*']))
    m.build(function (err) {
      if (err) return done(err)
      equal(fixture('array/build'), fixture('array/expected'))
      done()
    })
  })

  it('should take a string shorthand', function (done) {
    const m = Metalsmith(fixture('string')).clean(true).use(remove('ignored.*')).env('DEBUG', '@metalsmith/remove*')
    m.build(function (err) {
      if (err) return done(err)
      equal(fixture('string/build'), fixture('string/expected'))
      done()
    })
  })

  it('should take a string and ignore tilda', function (done) {
    const m = Metalsmith(fixture('string-tilda')).clean(true).use(remove('*~')).env('DEBUG', '@metalsmith/remove*')
    m.build(function (err) {
      if (err) return done(err)
      equal(fixture('string-tilda/build'), fixture('string-tilda/expected'))
      done()
    })
  })

  it('should ignore non-string or array inputs', function (done) {
    Metalsmith(fixture('other'))
      .env('DEBUG', '@metalsmith/remove*')
      .use(remove(null))
      .build(function (err) {
        if (err) return done(err)
        equal(fixture('other/build'), fixture('other/expected'))
        done()
      })
  })

  it('should log an error when failing to remove a file from the build', function (done) {
    const files = {}
    const ms = Metalsmith(fixture('/other'))
    const debuggr = () => {}
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

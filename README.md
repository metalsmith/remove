# Metalsmith Ignore

A Metalsmith plugin to ignore files that match a pattern. Uses [multimatch](https://github.com/sindresorhus/multimatch) for matching.

[![metalsmith: core plugin][metalsmith-badge]][metalsmith-url]
[![npm: version][npm-badge]][npm-url]
[![ci: build][ci-badge]][ci-url]
[![code coverage][codecov-badge]][codecov-url]
[![license: MIT][license-badge]][license-url]

## Installation

NPM:
```bash
npm install @metalsmith/ignore
```
Yarn:

```bash
yarn add @metalsmith/ignore
```

## Usage

Pass the options to `Metalsmith#use`:

```js
var ignore = require('@metalsmith/ignore');

metalsmith.use(ignore('drafts/*'));
```

You can also pass an array of patterns to ignore:

```js
var ignore = require('@metalsmith/ignore');

metalsmith.use(ignore(['drafts/*', 'unfinished/*']));
```

### CLI Usage

Install via npm and then add the `@metalsmith/ignore` key to your `metalsmith.json` plugins. The simplest case just ignores a single pattern:

```json
{
  "plugins": [
    { "@metalsmith/ignore": "drafts/*" }
  ]
}
```

But you can also pass an array of patterns to ignore:

```json
{
  "plugins": [
    { "@metalsmith/ignore": ["drafts/*", "unfinished/*"] }
  ]
}
```

## License

MIT

[npm-badge]: https://img.shields.io/npm/v/@metalsmith/ignore.svg
[npm-url]: https://www.npmjs.com/package/@metalsmith/ignore
[ci-badge]: https://app.travis-ci.com/metalsmith/ignore.svg?branch=master
[ci-url]: https://app.travis-ci.com/github/metalsmith/ignore
[metalsmith-badge]: https://img.shields.io/badge/metalsmith-plugin-green.svg?longCache=true
[metalsmith-url]: https://metalsmith.io
[codecov-badge]: https://img.shields.io/coveralls/github/metalsmith/ignore
[codecov-url]: https://coveralls.io/github/metalsmith/ignore
[license-badge]:https://img.shields.io/github/license/metalsmith/ignore
[license-url]: LICENSE

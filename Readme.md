# Metalsmith Ignore

[![npm version][npm-badge]][npm-url]
[![code style: prettier][prettier-badge]][prettier-url]
[![metalsmith: plugin][metalsmith-badge]][metalsmith-url]

[![Build Status][travis-badge]][travis-url]

A Metalsmith plugin to ignore files that match a pattern. Uses [multimatch](https://github.com/sindresorhus/multimatch) for matching.

## Installation

    $ npm install metalsmith-ignore

## CLI Usage

Install via npm and then add the `metalsmith-ignore` key to your `metalsmith.json` plugins. The simplest case just ignores a single pattern:

```json
{
  "plugins": {
    "metalsmith-ignore": "drafts/*"
  }
}
```

But you can also pass an array of patterns to ignore:

```json
{
  "plugins": {
    "metalsmith-ignore": ["drafts/*", "unfinished/*"]
  }
}
```

## Javascript Usage

Pass the options to `Metalsmith#use`:

```js
var ignore = require('metalsmith-ignore');

metalsmith.use(ignore('drafts/*'));
```

You can also pass an array of patterns to ignore:

```js
var ignore = require('metalsmith-ignore');

metalsmith.use(ignore(['drafts/*', 'unfinished/*']));
```

## License

MIT

[npm-badge]: https://img.shields.io/npm/v/metalsmith-ignore.svg
[npm-url]: https://www.npmjs.com/package/metalsmith-ignore
[prettier-badge]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg
[prettier-url]: https://github.com/prettier/prettier
[metalsmith-badge]: https://img.shields.io/badge/metalsmith-plugin-green.svg?longCache=true
[metalsmith-url]: http://metalsmith.io
[travis-badge]: https://travis-ci.org/segmentio/metalsmith-ignore.svg?branch=master
[travis-url]: https://travis-ci.org/segmentio/metalsmith-ignore

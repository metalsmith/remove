# @metalsmith/remove

A [Metalsmith](https://metalsmith.io) plugin to remove files from the build by pattern. Uses [micromatch](https://github.com/micromatch/micromatch) for matching.

[![metalsmith: core plugin][metalsmith-badge]][metalsmith-url]
[![npm: version][npm-badge]][npm-url]
[![ci: build][ci-badge]][ci-url]
[![code coverage][codecov-badge]][codecov-url]
[![license: MIT][license-badge]][license-url]

Use `@metalsmith/remove` to discard files from the build output after their metadata and contents have been read into memory. While `Metalsmith#ignore` ignores the matched files completely, `@metalsmith/remove` _only_ removes them at the point the plugin is `use`'d.

## Installation

NPM:

```bash
npm install @metalsmith/remove
```

Yarn:

```bash
yarn add @metalsmith/remove
```

## Usage

Pass the plugin with options to `Metalsmith#use`:

```js
var remove = require('@metalsmith/remove');

metalsmith.use(remove('drafts/*')); // single pattern
metalsmith.use(remove(['drafts/*', 'unfinished/*'])); // multiple patterns
```

### Debug

To enable debug logs, set the `DEBUG` environment variable to `@metalsmith/remove`:

Linux/Mac:

```bash
DEBUG=@metalsmith/remove
```

Windows:

```batch
set "DEBUG=@metalsmith/remove"
```

### CLI Usage

To use this plugin with the Metalsmith CLI, add `@metalsmith/remove` to the `plugins` key in your `metalsmith.json` file:

```json
{
  "plugins": [{ "@metalsmith/remove": "drafts/*" }]
}
```

But you can also pass an array of patterns to ignore:

```json
{
  "plugins": [{ "@metalsmith/remove": ["drafts/*", "unfinished/*"] }]
}
```

## License

[MIT](LICENSE)

[npm-badge]: https://img.shields.io/npm/v/@metalsmith/remove.svg
[npm-url]: https://www.npmjs.com/package/@metalsmith/remove
[ci-badge]: https://app.travis-ci.com/metalsmith/remove.svg?branch=master
[ci-url]: https://app.travis-ci.com/github/metalsmith/remove
[metalsmith-badge]: https://img.shields.io/badge/metalsmith-plugin-green.svg?longCache=true
[metalsmith-url]: https://metalsmith.io
[codecov-badge]: https://img.shields.io/coveralls/github/metalsmith/remove
[codecov-url]: https://coveralls.io/github/metalsmith/remove
[license-badge]: https://img.shields.io/github/license/metalsmith/remove
[license-url]: LICENSE

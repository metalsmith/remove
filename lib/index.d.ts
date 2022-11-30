import { Plugin } from 'metalsmith';

export default remove;
export type Options = {
    patterns: string[];
};
/**
 *
 * @typedef {Object} Options
 * @property {String[]} patterns
 */
/**
 * A Metalsmith plugin to remove files from the build
 *
 * @param  {String|String[]|Options} [options] One or more [glob patterns](https://en.wikipedia.org/wiki/Glob_(programming))
 * @return {import('metalsmith').Plugin}
 */
declare function remove(options?: string | string[] | Options): Plugin;

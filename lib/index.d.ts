import { Plugin } from 'metalsmith';

export default remove;
export type Options = {
    patterns: string[];
};

/**
 * A Metalsmith plugin to remove files from the build
 *
 * @example
 * // remove all dotfiles that are direct children of metalsmith.source()
 * metalsmith.use(remove('.*'))
 * // remove all JSON files
 * metalsmith.use(remove(['**\/*.json']))
 */
declare function remove(
  /** One or more [glob patterns](https://en.wikipedia.org/wiki/Glob_(programming)) */
  options?: string | string[] | Options
): Plugin;

import { DocumentFileType } from '../models';

/**
 * EXTENSION_ID: The unique identifier of the extension.
 * @type {string}
 * @public
 * @memberof Constants
 * @example
 * console.log(EXTENSION_ID);
 *
 * @returns {string} - The unique identifier of the extension
 */
export const EXTENSION_ID: string = 'treeMaker';

/**
 * EXTENSION_NAME: The repository ID of the extension.
 * @type {string}
 * @public
 * @memberof Constants
 * @example
 * console.log(EXTENSION_NAME);
 *
 * @returns {string} - The repository ID of the extension
 */
export const EXTENSION_NAME: string = 'ovsx-tree-maker';

/**
 * EXTENSION_DISPLAY_NAME: The name of the extension.
 * @type {string}
 * @public
 * @memberof Constants
 * @example
 * console.log(EXTENSION_DISPLAY_NAME);
 *
 * @returns {string} - The name of the extension
 */
export const EXTENSION_DISPLAY_NAME: string = 'Tree Maker';

/**
 * DEFAULT_OUTPUT_FORMAT: The default output format.
 * @type {string}
 * @public
 * @memberof Constants
 * @example
 * console.log(DEFAULT_OUTPUT_FORMAT);
 *
 * @returns {string} - The default output format
 */
export const DEFAULT_OUTPUT_FORMAT: DocumentFileType = 'markdown';

/**
 * DEFAULT_OUTPUT_FOLDER: The default output folder.
 * @type {string}
 * @public
 * @memberof Constants
 * @example
 * console.log(DEFAULT_OUTPUT_FOLDER);
 *
 * @returns {string} - The default output folder
 */
export const DEFAULT_OUTPUT_FOLDER: string = 'tree-maker';

/**
 * DEFAULT_OUTPUT_FILE_NAME: The default output file name.
 * @type {string}
 * @public
 * @memberof Constants
 * @example
 * console.log(DEFAULT_OUTPUT_FILE_NAME);
 *
 * @returns {string} - The default output file name
 */
export const DEFAULT_OUTPUT_FILE_NAME: string = 'tree';

/**
 * DEFAULT_OUTPUT_FILE_PREFIX: The default output file prefix.
 * @type {string}
 * @public
 * @memberof Constants
 * @example
 * console.log(DEFAULT_OUTPUT_FILE_PREFIX);
 *
 * @returns {string} - The default output file prefix
 */
export const DEFAULT_OUTPUT_FILE_PREFIX: string = '';

/**
 * DEFAULT_OUTPUT_FILE_SUFFIX: The default output file suffix.
 * @type {string}
 * @public
 * @memberof Constants
 * @example
 * console.log(DEFAULT_OUTPUT_FILE_SUFFIX);
 *
 * @returns {string} - The default output file suffix
 */
export const DEFAULT_OUTPUT_FILE_SUFFIX: string = '';

/**
 * DEFAULT_OUTPUT_FILE_SEPARATOR: The default output file separator.
 * @type {string}
 * @public
 * @memberof Constants
 * @example
 * console.log(DEFAULT_OUTPUT_FILE_SEPARATOR);
 *
 * @returns {string} - The default output file separator
 */
export const DEFAULT_OUTPUT_FILE_SEPARATOR: string = '-';

/**
 * DEFAULT_IGNORE_FILE_PATH_PATTERN_ON_EXPORT: The default ignore file path pattern on export.
 * @type {string[]}
 * @public
 * @memberof Constants
 * @example
 * console.log(DEFAULT_IGNORE_FILE_PATH_PATTERN_ON_EXPORT);
 *
 * @returns {string[]} - The default ignore file path pattern on export
 */
export const DEFAULT_IGNORE_FILE_PATH_PATTERN_ON_EXPORT: string[] = [
  '**/build/**',
  '**/dist/**',
  '**/tmp/**',
  '**/vendor/**',
  '**/tree-maker/**',
];

/**
 * ONLY_FILES_DEFAULT_VALUE: The default value of the flag to list only files.
 * @type {boolean}
 * @public
 * @memberof Constants
 * @example
 * console.log(ONLY_FILES_DEFAULT_VALUE);
 *
 * @returns {boolean} - The default value of the flag to list only files
 */
export const ONLY_FILES_DEFAULT_VALUE: boolean = false;

/**
 * DISABLE_RECURSIVE_SEARCHING_DEFAULT_VALUE: The default value of the flag to disable recursive searching.
 * @type {boolean}
 * @public
 * @memberof Constants
 * @example
 * console.log(DISABLE_RECURSIVE_SEARCHING_DEFAULT_VALUE);
 *
 * @returns {boolean} - The default value of the flag to disable recursive searching
 */
export const DISABLE_RECURSIVE_SEARCHING_DEFAULT_VALUE: boolean = false;

/**
 * DEFAULT_RECURSION_DEPTH: The default recursion depth.
 * @type {number}
 * @public
 * @memberof Constants
 * @example
 * console.log(DEFAULT_RECURSION_DEPTH);
 *
 * @returns {number} - The default recursion depth
 */
export const DEFAULT_RECURSION_DEPTH: number = 5;

/**
 * DEFAULT_VISIBLE_FILES_SETTING: The default value of the flag to show hidden files.
 * @type {boolean}
 * @public
 * @memberof Constants
 * @example
 * console.log(DEFAULT_VISIBLE_FILES_SETTING);
 *
 * @returns {boolean} - The default value of the flag to show hidden files
 */
export const DEFAULT_VISIBLE_FILES_SETTING: boolean = false;

/**
 * DEFAULT_KEEP_GITIGNORE_SETTINGS: The default value of the flag to preserve gitignore settings.
 * @type {boolean}
 * @public
 * @memberof Constants
 * @example
 * console.log(DEFAULT_KEEP_GITIGNORE_SETTINGS);
 *
 * @returns {boolean} - The default value of the flag to preserve gitignore settings
 */
export const DEFAULT_KEEP_GITIGNORE_SETTINGS: boolean = true;

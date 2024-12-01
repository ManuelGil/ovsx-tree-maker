import { WorkspaceConfiguration } from 'vscode';

import { DocumentFileType } from '../models';
import {
  DEFAULT_IGNORE_FILE_PATH_PATTERN_ON_EXPORT,
  DEFAULT_KEEP_GITIGNORE_SETTINGS,
  DEFAULT_OUTPUT_FILE_NAME,
  DEFAULT_OUTPUT_FILE_PREFIX,
  DEFAULT_OUTPUT_FILE_SEPARATOR,
  DEFAULT_OUTPUT_FILE_SUFFIX,
  DEFAULT_OUTPUT_FOLDER,
  DEFAULT_OUTPUT_FORMAT,
  DEFAULT_RECURSION_DEPTH,
  DEFAULT_VISIBLE_FILES_SETTING,
  DISABLE_RECURSIVE_SEARCHING_DEFAULT_VALUE,
  ONLY_FILES_DEFAULT_VALUE,
} from './constants.config';

/**
 * The Config class.
 *
 * @class
 * @classdesc The class that represents the configuration of the extension.
 * @export
 * @public
 * @property {WorkspaceConfiguration} config - The workspace configuration
 * @example
 * const config = new Config(workspace.getConfiguration());
 * console.log(config.includeExtensionOnExport);
 * console.log(config.exclude);
 */
export class ExtensionConfig {
  // -----------------------------------------------------------------
  // Properties
  // -----------------------------------------------------------------

  // Public properties

  /**
   * The selected output format.
   * @type {string}
   * @public
   * @memberof ExtensionConfig
   * @example
   * console.log(config.selectedOutputFormat);
   */
  selectedOutputFormat: string;

  /**
   * The output folder.
   * @type {string}
   * @public
   * @memberof ExtensionConfig
   * @example
   * console.log(config.outputFolder);
   */
  outputFolder: string;

  /**
   * The output file name.
   * @type {string}
   * @public
   * @memberof ExtensionConfig
   * @example
   * console.log(config.outputFileName);
   */
  outputFileName: string;

  /**
   * The output file prefix.
   * @type {string}
   * @public
   * @memberof ExtensionConfig
   * @example
   * console.log(config.outputFilePrefix);
   */
  outputFilePrefix: string;

  /**
   * The output file suffix.
   * @type {string}
   * @public
   * @memberof ExtensionConfig
   * @example
   * console.log(config.outputFileSuffix);
   */
  outputFileSuffix: string;

  /**
   * The output file separator.
   * @type {string}
   * @public
   * @memberof ExtensionConfig
   * @example
   * console.log(config.outputFileSeparator);
   */
  outputFileSeparator: string;

  /**
   * The ignore file path pattern on export.
   * @type {string[]}
   * @public
   * @memberof ExtensionConfig
   * @example
   * console.log(config.ignoreFilePathPatternOnExport);
   */
  ignoreFilePathPatternOnExport: string[];

  /**
   * The flag to list only files.
   * @type {boolean}
   * @public
   * @memberof ExtensionConfig
   * @example
   * console.log(config.shouldListOnlyFiles);
   */
  shouldListOnlyFiles: boolean;

  /**
   * The flag to disable recursive searching.
   * @type {boolean}
   * @public
   * @memberof ExtensionConfig
   * @example
   * console.log(config.disableRecursiveSearching);
   */
  disableRecursiveSearching: boolean;

  /**
   * The recursion depth.
   * @type {number}
   * @public
   * @memberof ExtensionConfig
   * @example
   * console.log(config.recursionDepth);
   */
  maxSearchRecursionDepth: number;

  /**
   * The flag to support hidden files.
   * @type {boolean}
   * @public
   * @memberof ExtensionConfig
   * @example
   * console.log(config.supportsHiddenFiles);
   */
  shouldListOnlyVisibleFiles: boolean;

  /**
   * The flag to preserve gitignore settings.
   * @type {boolean}
   * @public
   * @memberof ExtensionConfig
   * @example
   * console.log(config.preserveGitignoreSettings);
   */
  keepGitignorePreferences: boolean;

  // -----------------------------------------------------------------
  // Constructor
  // -----------------------------------------------------------------

  /**
   * Constructor for the Config class.
   *
   * @constructor
   * @param {WorkspaceConfiguration} config - The workspace configuration
   * @public
   * @memberof Config
   */
  constructor(readonly config: WorkspaceConfiguration) {
    this.selectedOutputFormat =
      this.config.get<DocumentFileType>('files.selectedOutputFormat') ??
      DEFAULT_OUTPUT_FORMAT;
    this.outputFolder =
      this.config.get<string>('files.outputFolder') ?? DEFAULT_OUTPUT_FOLDER;
    this.outputFileName =
      this.config.get<string>('files.outputFileName') ??
      DEFAULT_OUTPUT_FILE_NAME;
    this.outputFilePrefix =
      this.config.get<string>('files.outputFilePrefix') ??
      DEFAULT_OUTPUT_FILE_PREFIX;
    this.outputFileSuffix =
      this.config.get<string>('files.outputFileSuffix') ??
      DEFAULT_OUTPUT_FILE_SUFFIX;
    this.outputFileSeparator =
      this.config.get<string>('files.outputFileSeparator') ??
      DEFAULT_OUTPUT_FILE_SEPARATOR;
    this.ignoreFilePathPatternOnExport =
      this.config.get<string[]>('search.ignoreFilePathPatternOnExport') ??
      DEFAULT_IGNORE_FILE_PATH_PATTERN_ON_EXPORT;
    this.shouldListOnlyFiles =
      this.config.get<boolean>('search.shouldListOnlyFiles') ??
      ONLY_FILES_DEFAULT_VALUE;
    this.disableRecursiveSearching =
      this.config.get<boolean>('search.disableRecursiveSearching') ??
      DISABLE_RECURSIVE_SEARCHING_DEFAULT_VALUE;
    this.maxSearchRecursionDepth =
      this.config.get<number>('search.maxSearchRecursionDepth') ??
      DEFAULT_RECURSION_DEPTH;
    this.shouldListOnlyVisibleFiles =
      this.config.get<boolean>('search.shouldListOnlyVisibleFiles') ??
      DEFAULT_VISIBLE_FILES_SETTING;
    this.keepGitignorePreferences =
      this.config.get<boolean>('search.keepGitignorePreferences') ??
      DEFAULT_KEEP_GITIGNORE_SETTINGS;
  }
}

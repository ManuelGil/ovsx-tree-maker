import {
  access,
  existsSync,
  mkdirSync,
  open,
  readFileSync,
  statSync,
  writeFile,
} from 'fs';
import { basename, dirname, join, relative, resolve, sep } from 'path';
import * as fastGlob from 'fast-glob';
import ignore from 'ignore';
import { Uri, commands, env, l10n, window, workspace } from 'vscode';

import { ExtensionConfig } from '../configs';

/**
 * The FilesController class.
 *
 * @class
 * @classdesc The class that represents the list files controller.
 * @export
 * @public
 * @property {ExtensionConfig} config - The configuration object
 * @example
 * const controller = new FilesController(config);
 */
export class FilesController {
  // -----------------------------------------------------------------
  // Constructor
  // -----------------------------------------------------------------

  /**
   * Constructor for the FilesController class
   *
   * @constructor
   * @param {ExtensionConfig} config - The configuration object
   * @public
   * @memberof FilesController
   */
  constructor(readonly config: ExtensionConfig) {}

  // -----------------------------------------------------------------
  // Methods
  // -----------------------------------------------------------------

  // Public methods

  /**
   * The exportToFile method.
   * Generate a file tree in the selected folder.
   * @function exportToFile
   * @param {Uri} folderPath - The folder path
   * @public
   * @async
   * @memberof FilesController
   * @example
   * controller.exportToFile(folderPath);
   *
   * @returns {Promise<void>} - The promise with no return value
   */
  async exportToFile(folderPath?: Uri): Promise<void> {
    // If the folder is not valid, return
    if (!folderPath) {
      const message = l10n.t('The folder is not valid!');
      window.showErrorMessage(message);
      return;
    }

    const workspaceFolder = workspace.getWorkspaceFolder(folderPath);

    // If the folder is not in the workspace, return
    if (!workspaceFolder) {
      const message = l10n.t('The folder is not in the workspace!');
      window.showErrorMessage(message);
      return;
    }

    const selectedOutputFormat = this.config.selectedOutputFormat;
    const outputFolder = this.config.outputFolder;
    const outputFileName = this.config.outputFileName;
    const outputFilePrefix = this.config.outputFilePrefix;
    const outputFileSuffix = this.config.outputFileSuffix;
    const outputFileSeparator = this.config.outputFileSeparator;

    switch (selectedOutputFormat) {
      case 'markdown': {
        const content = await this.generateFileTreeMarkdown(folderPath.fsPath);

        if (content) {
          const fileUniqueKey = new Date().toISOString().replace(/[^0-9]/g, '');
          const filename = `${outputFilePrefix}${fileUniqueKey}${outputFileSeparator}${outputFileName}${outputFileSuffix}.md`;

          let filePath: string;

          const workspaceFolders = workspace.workspaceFolders;
          if (!workspaceFolders || workspaceFolders.length === 0) {
            window.showErrorMessage(l10n.t('No workspace folder available!'));
            return;
          }

          if (workspaceFolders.length === 1) {
            filePath = join(workspaceFolders[0].uri.fsPath, outputFolder);
          } else {
            const folder = await window.showWorkspaceFolderPick({
              placeHolder: l10n.t('Select a workspace folder'),
            });

            if (!folder) {
              return;
            }

            filePath = join(folder.uri.fsPath, outputFolder);
          }

          if (!existsSync(dirname(filePath))) {
            await mkdirSync(dirname(filePath), { recursive: true });
          }

          await this.saveFile(
            filePath,
            filename,
            `\`\`\`markdown${content}\`\`\``,
          );
        }
        break;
      }

      case 'json': {
        const content = await this.generateFileTreeJson(folderPath.fsPath);

        if (content) {
          const fileUniqueKey = new Date().toISOString().replace(/[^0-9]/g, '');
          const filename = `${outputFilePrefix}${fileUniqueKey}${outputFileSeparator}${outputFileName}${outputFileSuffix}.json`;

          let filePath: string;

          const workspaceFolders = workspace.workspaceFolders;
          if (!workspaceFolders || workspaceFolders.length === 0) {
            window.showErrorMessage(l10n.t('No workspace folder available!'));
            return;
          }

          if (workspaceFolders.length === 1) {
            filePath = join(workspaceFolders[0].uri.fsPath, outputFolder);
          } else {
            const folder = await window.showWorkspaceFolderPick({
              placeHolder: l10n.t('Select a workspace folder'),
            });

            if (!folder) {
              return;
            }

            filePath = join(folder.uri.fsPath, outputFolder);
          }

          if (!existsSync(dirname(filePath))) {
            await mkdirSync(dirname(filePath), { recursive: true });
          }

          await this.saveFile(
            filePath,
            filename,
            JSON.stringify(content, null, 2),
          );
        }
        break;
      }

      case 'xml': {
        const content = await this.generateFileTreeXml(folderPath.fsPath);

        if (content) {
          const fileUniqueKey = new Date().toISOString().replace(/[^0-9]/g, '');
          const filename = `${outputFilePrefix}${fileUniqueKey}${outputFileSeparator}${outputFileName}${outputFileSuffix}.xml`;

          let filePath: string;

          const workspaceFolders = workspace.workspaceFolders;
          if (!workspaceFolders || workspaceFolders.length === 0) {
            window.showErrorMessage(l10n.t('No workspace folder available!'));
            return;
          }

          if (workspaceFolders.length === 1) {
            filePath = join(workspaceFolders[0].uri.fsPath, outputFolder);
          } else {
            const folder = await window.showWorkspaceFolderPick({
              placeHolder: l10n.t('Select a workspace folder'),
            });

            if (!folder) {
              return;
            }

            filePath = join(folder.uri.fsPath, outputFolder);
          }

          if (!existsSync(dirname(filePath))) {
            await mkdirSync(dirname(filePath), { recursive: true });
          }

          await this.saveFile(filePath, filename, content);
        }
        break;
      }

      case 'yaml': {
        const content = await this.generateFileTreeYaml(folderPath.fsPath);

        if (content) {
          const fileUniqueKey = new Date().toISOString().replace(/[^0-9]/g, '');
          const filename = `${outputFilePrefix}${fileUniqueKey}${outputFileSeparator}${outputFileName}${outputFileSuffix}.yaml`;

          let filePath: string;

          const workspaceFolders = workspace.workspaceFolders;
          if (!workspaceFolders || workspaceFolders.length === 0) {
            window.showErrorMessage(l10n.t('No workspace folder available!'));
            return;
          }

          if (workspaceFolders.length === 1) {
            filePath = join(workspaceFolders[0].uri.fsPath, outputFolder);
          } else {
            const folder = await window.showWorkspaceFolderPick({
              placeHolder: l10n.t('Select a workspace folder'),
            });

            if (!folder) {
              return;
            }

            filePath = join(folder.uri.fsPath, outputFolder);
          }

          if (!existsSync(dirname(filePath))) {
            await mkdirSync(dirname(filePath), { recursive: true });
          }

          await this.saveFile(filePath, filename, content);
        }
        break;
      }

      case 'csv': {
        const content = await this.generateFileTreeCsv(folderPath.fsPath);

        if (content) {
          const fileUniqueKey = new Date().toISOString().replace(/[^0-9]/g, '');
          const filename = `${outputFilePrefix}${fileUniqueKey}${outputFileSeparator}${outputFileName}${outputFileSuffix}.csv`;

          let filePath: string;

          const workspaceFolders = workspace.workspaceFolders;
          if (!workspaceFolders || workspaceFolders.length === 0) {
            window.showErrorMessage(l10n.t('No workspace folder available!'));
            return;
          }

          if (workspaceFolders.length === 1) {
            filePath = join(workspaceFolders[0].uri.fsPath, outputFolder);
          } else {
            const folder = await window.showWorkspaceFolderPick({
              placeHolder: l10n.t('Select a workspace folder'),
            });

            if (!folder) {
              return;
            }

            filePath = join(folder.uri.fsPath, outputFolder);
          }

          if (!existsSync(dirname(filePath))) {
            await mkdirSync(dirname(filePath), { recursive: true });
          }

          await this.saveFile(filePath, filename, content);
        }
        break;
      }

      case 'txt': {
        const content = await this.generateFileTreeTxt(folderPath.fsPath);

        if (content) {
          const fileUniqueKey = new Date().toISOString().replace(/[^0-9]/g, '');
          const filename = `${outputFilePrefix}${fileUniqueKey}${outputFileSeparator}${outputFileName}${outputFileSuffix}.txt`;

          let filePath: string;

          const workspaceFolders = workspace.workspaceFolders;
          if (!workspaceFolders || workspaceFolders.length === 0) {
            window.showErrorMessage(l10n.t('No workspace folder available!'));
            return;
          }

          if (workspaceFolders.length === 1) {
            filePath = join(workspaceFolders[0].uri.fsPath, outputFolder);
          } else {
            const folder = await window.showWorkspaceFolderPick({
              placeHolder: l10n.t('Select a workspace folder'),
            });

            if (!folder) {
              return;
            }

            filePath = join(folder.uri.fsPath, outputFolder);
          }

          if (!existsSync(dirname(filePath))) {
            await mkdirSync(dirname(filePath), { recursive: true });
          }

          await this.saveFile(filePath, filename, content);
        }
        break;
      }

      default:
        const message = l10n.t('The output format is not supported!');
        window.showErrorMessage(message);
        break;
    }
  }

  /**
   * The exportToClipboard method.
   * Generate a file tree in the selected folder and copy it to the clipboard.
   * @function exportToClipboard
   * @param {Uri} folderPath - The folder path
   * @public
   * @async
   * @memberof FilesController
   * @example
   * controller.exportToClipboard(folderPath);
   *
   * @returns {Promise<void>} - The promise with no return value
   */
  async exportToClipboard(folderPath?: Uri): Promise<void> {
    // If the folder is not valid, return
    if (!folderPath) {
      const message = l10n.t('The folder is not valid!');
      window.showErrorMessage(message);
      return;
    }

    const workspaceFolder = workspace.getWorkspaceFolder(folderPath);

    // If the folder is not in the workspace, return
    if (!workspaceFolder) {
      const message = l10n.t('The folder is not in the workspace!');
      window.showErrorMessage(message);
      return;
    }

    const selectedOutputFormat = this.config.selectedOutputFormat;

    switch (selectedOutputFormat) {
      case 'markdown': {
        const content = await this.generateFileTreeMarkdown(folderPath.fsPath);

        if (content) {
          // Copy the content to the clipboard
          await env.clipboard.writeText(`\`\`\`markdown${content}\`\`\``);

          // Show the content in a new document
          const document = await workspace.openTextDocument({
            language: 'markdown',
            content: `\`\`\`markdown${content}\`\`\``,
          });

          // Show the document
          await window.showTextDocument(document);

          // Show the information message
          const message = l10n.t('File tree copied to the clipboard!');
          window.showInformationMessage(message);
        }
        break;
      }

      case 'json': {
        const content = await this.generateFileTreeJson(folderPath.fsPath);

        if (content) {
          // Copy the content to the clipboard
          await env.clipboard.writeText(JSON.stringify(content, null, 2));

          // Show the content in a new document
          const document = await workspace.openTextDocument({
            language: 'json',
            content: JSON.stringify(content, null, 2),
          });

          // Show the document
          await window.showTextDocument(document);

          // Show the information message
          const message = l10n.t('File tree copied to the clipboard!');
          window.showInformationMessage(message);
        }
        break;
      }

      case 'xml': {
        const content = await this.generateFileTreeXml(folderPath.fsPath);

        if (content) {
          // Copy the content to the clipboard
          await env.clipboard.writeText(content);

          // Show the content in a new document
          const document = await workspace.openTextDocument({
            language: 'xml',
            content: content,
          });

          // Show the document
          await window.showTextDocument(document);

          // Show the information message
          const message = l10n.t('File tree copied to the clipboard!');
          window.showInformationMessage(message);
        }
        break;
      }

      case 'yaml': {
        const content = await this.generateFileTreeYaml(folderPath.fsPath);

        if (content) {
          // Copy the content to the clipboard
          await env.clipboard.writeText(content);

          // Show the content in a new document
          const document = await workspace.openTextDocument({
            language: 'yaml',
            content: content,
          });

          // Show the document
          await window.showTextDocument(document);

          // Show the information message
          const message = l10n.t('File tree copied to the clipboard!');
          window.showInformationMessage(message);
        }
        break;
      }

      case 'csv': {
        const content = await this.generateFileTreeCsv(folderPath.fsPath);

        if (content) {
          // Copy the content to the clipboard
          await env.clipboard.writeText(content);

          // Show the content in a new document
          const document = await workspace.openTextDocument({
            language: 'csv',
            content: content,
          });

          // Show the document
          await window.showTextDocument(document);

          // Show the information message
          const message = l10n.t('File tree copied to the clipboard!');
          window.showInformationMessage(message);
        }
        break;
      }

      case 'txt': {
        const content = await this.generateFileTreeTxt(folderPath.fsPath);

        if (content) {
          // Copy the content to the clipboard
          await env.clipboard.writeText(content);

          // Show the content in a new document
          const document = await workspace.openTextDocument({
            language: 'plaintext',
            content: content,
          });

          // Show the document
          await window.showTextDocument(document);

          // Show the information message
          const message = l10n.t('File tree copied to the clipboard!');
          window.showInformationMessage(message);
        }
        break;
      }

      default:
        const message = l10n.t('The output format is not supported!');
        window.showErrorMessage(message);
        break;
    }
  }

  // Private methods

  /**
   * The getContent method.
   *
   * @function getContent
   * @param {string} folderPath - The folder path
   * @private
   * @async
   * @memberof FilesController
   * @example
   * controller.getContent();
   *
   * @returns {Promise<string | undefined>} - The promise with the content
   */
  private async generateFileTreeMarkdown(
    folderPath: string,
  ): Promise<string | undefined> {
    // Get the configuration values
    const ignoreFilePathPatternOnExport =
      this.config.ignoreFilePathPatternOnExport;
    const shouldListOnlyFiles = this.config.shouldListOnlyFiles;
    const disableRecursiveSearching = this.config.disableRecursiveSearching;
    const recursionDepth = this.config.maxSearchRecursionDepth;
    const supportsHiddenFiles = !this.config.shouldListOnlyVisibleFiles;
    const preserveGitignoreSettings = this.config.keepGitignorePreferences;

    const files = await this.findFiles(
      folderPath,
      ['**/*'],
      ignoreFilePathPatternOnExport,
      shouldListOnlyFiles,
      disableRecursiveSearching,
      recursionDepth,
      supportsHiddenFiles,
      preserveGitignoreSettings,
    );

    if (files.length === 0) {
      const message = l10n.t('No files found in the folder!');
      window.showErrorMessage(message);
      return;
    }

    let content = `\n. 📂 ${basename(folderPath)}\n`;

    for (const [index, fileEntry] of files.entries()) {
      const fullPath = resolve(fileEntry.fsPath);
      const isFolder = statSync(fullPath).isDirectory();
      const isLastItem = index === files.length - 1;

      const currentDepth =
        fullPath.split(sep).length - folderPath.split(sep).length;

      const prefix =
        currentDepth === 1 ? '' : `│${'  '.repeat(currentDepth - 1)}`;
      const icon = isFolder ? '📂' : '📄';
      const branch = isFolder ? '└──' : isLastItem ? '└──' : '├──';
      const subfix = isFolder ? '/' : '';

      content += `${prefix}${branch} ${icon} ${basename(fullPath)}${subfix}\n`;
    }

    return content;
  }

  /**
   * The generateFileTreeJson method.
   * Generate a file tree in the selected folder in JSON format.
   * @function generateFileTreeJson
   * @param {string} folderPath - The folder path
   * @private
   * @async
   * @memberof FilesController
   * @example
   * controller.generateFileTreeJson(folderPath);
   *
   * @returns {Promise<string | undefined>} - The promise with the JSON content
   */
  private async generateFileTreeJson(
    folderPath: string,
  ): Promise<string | undefined> {
    // Get the configuration values
    const ignoreFilePathPatternOnExport =
      this.config.ignoreFilePathPatternOnExport;
    const shouldListOnlyFiles = this.config.shouldListOnlyFiles;
    const disableRecursiveSearching = this.config.disableRecursiveSearching;
    const recursionDepth = this.config.maxSearchRecursionDepth;
    const supportsHiddenFiles = !this.config.shouldListOnlyVisibleFiles;
    const preserveGitignoreSettings = this.config.keepGitignorePreferences;

    const files = await this.findFiles(
      folderPath,
      ['**/*'],
      ignoreFilePathPatternOnExport,
      shouldListOnlyFiles,
      disableRecursiveSearching,
      recursionDepth,
      supportsHiddenFiles,
      preserveGitignoreSettings,
    );

    // If no files are found, return
    if (files.length === 0) {
      const message = l10n.t('No files found in the folder!');
      window.showErrorMessage(message);
      return;
    }

    let content = [];

    for (const item of files) {
      const fullPath = resolve(item.fsPath);
      const isFolder = statSync(fullPath).isDirectory();

      const currentDepth =
        fullPath.split(sep).length - folderPath.split(sep).length;

      if (isFolder) {
        content.push({
          type: 'folder',
          name: basename(item.fsPath),
          depth: currentDepth,
        });
      } else {
        content.push({
          type: 'file',
          name: basename(item.fsPath),
          depth: currentDepth,
        });
      }
    }

    return JSON.stringify(content, null, 2);
  }

  /**
   * The generateFileTreeXml method.
   * Generate a file tree in the selected folder in XML format.
   * @function generateFileTreeXml
   * @param {string} folderPath - The folder path
   * @private
   * @async
   * @memberof FilesController
   * @example
   * controller.generateFileTreeXml(folderPath);
   *
   * @returns {Promise<string | undefined>} - The promise with the XML content
   */
  private async generateFileTreeXml(
    folderPath: string,
  ): Promise<string | undefined> {
    // Get the configuration values
    const ignoreFilePathPatternOnExport =
      this.config.ignoreFilePathPatternOnExport;
    const shouldListOnlyFiles = this.config.shouldListOnlyFiles;
    const disableRecursiveSearching = this.config.disableRecursiveSearching;
    const recursionDepth = this.config.maxSearchRecursionDepth;
    const supportsHiddenFiles = !this.config.shouldListOnlyVisibleFiles;
    const preserveGitignoreSettings = this.config.keepGitignorePreferences;

    const files = await this.findFiles(
      folderPath,
      ['**/*'],
      ignoreFilePathPatternOnExport,
      shouldListOnlyFiles,
      disableRecursiveSearching,
      recursionDepth,
      supportsHiddenFiles,
      preserveGitignoreSettings,
    );

    // If no files are found, return
    if (files.length === 0) {
      const message = l10n.t('No files found in the folder!');
      window.showErrorMessage(message);
      return;
    }

    let content = '<?xml version="1.0" encoding="UTF-8"?>\n';
    content += '<files>\n';

    for (const item of files) {
      const fullPath = resolve(item.fsPath);
      const isFolder = statSync(fullPath).isDirectory();

      if (isFolder) {
        content += `  <folder>${basename(item.fsPath)}</folder>\n`;
      } else {
        content += `  <file>${basename(item.fsPath)}</file>\n`;
      }
    }

    content += '</files>';

    return content;
  }

  /**
   * The generateFileTreeYaml method.
   * Generate a file tree in the selected folder in YAML format.
   * @function generateFileTreeYaml
   * @param {string} folderPath - The folder path
   * @private
   * @async
   * @memberof FilesController
   * @example
   * controller.generateFileTreeYaml(folderPath);
   *
   * @returns {Promise<string | undefined>} - The promise with the YAML content
   */
  private async generateFileTreeYaml(
    folderPath: string,
  ): Promise<string | undefined> {
    // Get the configuration values
    const ignoreFilePathPatternOnExport =
      this.config.ignoreFilePathPatternOnExport;
    const shouldListOnlyFiles = this.config.shouldListOnlyFiles;
    const disableRecursiveSearching = this.config.disableRecursiveSearching;
    const recursionDepth = this.config.maxSearchRecursionDepth;
    const supportsHiddenFiles = !this.config.shouldListOnlyVisibleFiles;
    const preserveGitignoreSettings = this.config.keepGitignorePreferences;

    const files = await this.findFiles(
      folderPath,
      ['**/*'],
      ignoreFilePathPatternOnExport,
      shouldListOnlyFiles,
      disableRecursiveSearching,
      recursionDepth,
      supportsHiddenFiles,
      preserveGitignoreSettings,
    );

    // If no files are found, return
    if (files.length === 0) {
      const message = l10n.t('No files found in the folder!');
      window.showErrorMessage(message);
      return;
    }

    let content = 'files:\n';

    for (const item of files) {
      const fullPath = resolve(item.fsPath);
      const isFolder = statSync(fullPath).isDirectory();

      if (isFolder) {
        content += `  - ${basename(item.fsPath)}: folder\n`;
      } else {
        content += `  - ${basename(item.fsPath)}: file\n`;
      }
    }

    return content;
  }

  /**
   * The generateFileTreeCsv method.
   * Generate a file tree in the selected folder in CSV format.
   * @function generateFileTreeCsv
   * @param {string} folderPath - The folder path
   * @private
   * @async
   * @memberof FilesController
   * @example
   * controller.generateFileTreeCsv(folderPath);
   *
   * @returns {Promise<string | undefined>} - The promise with the CSV content
   */
  private async generateFileTreeCsv(
    folderPath: string,
  ): Promise<string | undefined> {
    // Get the configuration values
    const ignoreFilePathPatternOnExport =
      this.config.ignoreFilePathPatternOnExport;
    const shouldListOnlyFiles = this.config.shouldListOnlyFiles;
    const disableRecursiveSearching = this.config.disableRecursiveSearching;
    const recursionDepth = this.config.maxSearchRecursionDepth;
    const supportsHiddenFiles = !this.config.shouldListOnlyVisibleFiles;
    const preserveGitignoreSettings = this.config.keepGitignorePreferences;

    const files = await this.findFiles(
      folderPath,
      ['**/*'],
      ignoreFilePathPatternOnExport,
      shouldListOnlyFiles,
      disableRecursiveSearching,
      recursionDepth,
      supportsHiddenFiles,
      preserveGitignoreSettings,
    );

    // If no files are found, return
    if (files.length === 0) {
      const message = l10n.t('No files found in the folder!');
      window.showErrorMessage(message);
      return;
    }

    let content = '';

    for (const item of files) {
      const fullPath = resolve(item.fsPath);
      const isFolder = statSync(fullPath).isDirectory();

      if (isFolder) {
        content += `${basename(item.fsPath)},folder\n`;
      } else {
        content += `${basename(item.fsPath)},file\n`;
      }
    }

    return content;
  }

  /**
   * The generateFileTreeTxt method.
   * Generate a file tree in the selected folder in TXT format.
   * @function generateFileTreeTxt
   * @param {string} folderPath - The folder path
   * @private
   * @async
   * @memberof FilesController
   * @example
   * controller.generateFileTreeTxt(folderPath);
   *
   * @returns {Promise<string | undefined>} - The promise with the TXT content
   */
  private async generateFileTreeTxt(
    folderPath: string,
  ): Promise<string | undefined> {
    // Get the configuration values
    const ignoreFilePathPatternOnExport =
      this.config.ignoreFilePathPatternOnExport;
    const shouldListOnlyFiles = this.config.shouldListOnlyFiles;
    const disableRecursiveSearching = this.config.disableRecursiveSearching;
    const recursionDepth = this.config.maxSearchRecursionDepth;
    const supportsHiddenFiles = !this.config.shouldListOnlyVisibleFiles;
    const preserveGitignoreSettings = this.config.keepGitignorePreferences;

    const files = await this.findFiles(
      folderPath,
      ['**/*'],
      ignoreFilePathPatternOnExport,
      shouldListOnlyFiles,
      disableRecursiveSearching,
      recursionDepth,
      supportsHiddenFiles,
      preserveGitignoreSettings,
    );

    // If no files are found, return
    if (files.length === 0) {
      const message = l10n.t('No files found in the folder!');
      window.showErrorMessage(message);
      return;
    }

    let content = '';

    for (const item of files) {
      const fullPath = resolve(item.fsPath);
      const isFolder = statSync(fullPath).isDirectory();

      if (isFolder) {
        content += `- [${basename(item.fsPath)}]\n`;
      } else {
        content += `- ${basename(item.fsPath)}\n`;
      }
    }

    return content;
  }

  /**
   * The saveFile method.
   *
   * @function saveFile
   * @param {string} path - The path
   * @param {string} filename - The filename
   * @param {string} data - The data
   * @private
   * @async
   * @memberof FilesController
   * @example
   * controller.saveFile('path', 'filename', 'data');
   *
   * @returns {Promise<void>} - The promise with no return value
   */
  private async saveFile(
    path: string,
    filename: string,
    data: string,
  ): Promise<void> {
    const file = join(path, filename);

    if (!existsSync(dirname(file))) {
      mkdirSync(dirname(file), { recursive: true });
    }

    access(file, (err: any) => {
      if (err) {
        open(file, 'w+', (err: any, fd: any) => {
          if (err) {
            const message = l10n.t('The file has not been created!');
            window.showErrorMessage(message);
            return;
          }

          writeFile(fd, data, 'utf8', (err: any) => {
            if (err) {
              const message = l10n.t('The file has not been created!');
              window.showErrorMessage(message);
              return;
            }

            const openPath = Uri.file(file);

            workspace.openTextDocument(openPath).then(async (filename) => {
              await commands.executeCommand('workbench.action.files.saveAll');
              await window.showTextDocument(filename);
            });
          });
        });

        const message = l10n.t('File created successfully!');
        window.showInformationMessage(message);
      } else {
        const message = l10n.t('The file name already exists!');
        window.showWarningMessage(message);
      }
    });
  }

  /**
   * The findFiles method.
   *
   * @function findFiles
   * @param {string} baseDir - The base directory
   * @param {string[]} include - The include pattern
   * @param {string[]} exclude - The exclude pattern
   * @private
   * @async
   * @memberof FilesController
   * @example
   * controller.findFiles('baseDir', ['include'], ['exclude']);
   *
   * @returns {Promise<Uri[]>} - The promise with the files
   */
  private async findFiles(
    baseDir: string,
    include: string[],
    exclude: string[],
    includeOnlyFiles: boolean = false,
    disableRecursive: boolean = false,
    deep: number = 5,
    includeDotfiles: boolean = false,
    enableGitignoreDetection: boolean = false,
  ): Promise<Uri[]> {
    // If we need to respect .gitignore, we need to load it
    let gitignore;
    if (enableGitignoreDetection) {
      const gitignorePath = join(baseDir, '.gitignore');
      if (existsSync(gitignorePath)) {
        gitignore = ignore().add(readFileSync(gitignorePath, 'utf8'));
      }
    }

    const options = {
      cwd: baseDir,
      absolute: true,
      onlyFiles: includeOnlyFiles,
      dot: includeDotfiles,
      deep: disableRecursive ? 1 : deep,
      ignore: exclude,
    };

    try {
      let filePaths = await fastGlob(include, options);

      if (gitignore) {
        filePaths = filePaths.filter((filePath) => {
          const relativePath = relative(baseDir, filePath);
          return !gitignore.ignores(relativePath);
        });
      }

      return filePaths.sort().map((filePath) => Uri.file(filePath));
    } catch (error) {
      const message = l10n.t('Error while finding files: {0}', [error]);
      window.showErrorMessage(message);
      return [];
    }
  }
}

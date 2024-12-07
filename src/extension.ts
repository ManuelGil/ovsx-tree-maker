// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// Import the Configs, Controllers, and Providers
import {
  EXTENSION_DISPLAY_NAME,
  EXTENSION_ID,
  ExtensionConfig,
} from './app/configs';
import { FilesController } from './app/controllers';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
  // The code you place here will be executed every time your command is executed
  let resource: vscode.WorkspaceFolder | undefined;

  // Check if there are workspace folders
  if (
    !vscode.workspace.workspaceFolders ||
    vscode.workspace.workspaceFolders.length === 0
  ) {
    const message = vscode.l10n.t(
      'No workspace folders are open. Please open a workspace folder to use this extension'
    );
    vscode.window.showErrorMessage(message);
    return;
  }

  // Optionally, prompt the user to select a workspace folder if multiple are available
  if (vscode.workspace.workspaceFolders.length === 1) {
    resource = vscode.workspace.workspaceFolders[0];
  } else {
    const placeHolder = vscode.l10n.t(
      'Select a workspace folder to use. This folder will be used to load workspace-specific configuration for the extension'
    );
    const selectedFolder = await vscode.window.showWorkspaceFolderPick({
      placeHolder,
    });

    resource = selectedFolder;
  }

  // -----------------------------------------------------------------
  // Initialize the extension
  // -----------------------------------------------------------------

  // Get the configuration for the extension
  const config = new ExtensionConfig(
    vscode.workspace.getConfiguration(EXTENSION_ID, resource?.uri)
  );

  // -----------------------------------------------------------------
  // Get version of the extension
  // -----------------------------------------------------------------

  // Get the previous version of the extension
  const previousVersion = context.globalState.get('version');
  // Get the current version of the extension
  const currentVersion = context.extension.packageJSON.version;

  // Check if the extension is running for the first time
  if (!previousVersion) {
    const message = vscode.l10n.t('Welcome to {0}!', [EXTENSION_DISPLAY_NAME]);
    vscode.window.showInformationMessage(message);

    // Update the version in the global state
    context.globalState.update('version', currentVersion);
  }

  // Check if the extension has been updated
  if (previousVersion && previousVersion !== currentVersion) {
    const message = vscode.l10n.t(
      'Looks like {0} has been updated to version {1}!',
      [EXTENSION_DISPLAY_NAME, currentVersion]
    );
    vscode.window.showInformationMessage(message);

    // Update the version in the global state
    context.globalState.update('version', currentVersion);
  }

  // -----------------------------------------------------------------
  // Register FilesController
  // -----------------------------------------------------------------

  // Create a new FilesController
  const filesController = new FilesController(config);

  const registerExportToFileCommand = vscode.commands.registerCommand(
    `${EXTENSION_ID}.exportToFile`,
    (args) => filesController.exportToFile(args)
  );
  const registerExportToClipboardCommand = vscode.commands.registerCommand(
    `${EXTENSION_ID}.exportToClipboard`,
    (args) => filesController.exportToClipboard(args)
  );

  context.subscriptions.push(
    registerExportToFileCommand,
    registerExportToClipboardCommand
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}

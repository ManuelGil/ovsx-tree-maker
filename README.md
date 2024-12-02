# Tree Maker

[![Open VSX Version](https://img.shields.io/open-vsx/v/imgildev/ovsx-tree-maker?style=for-the-badge)](https://open-vsx.org/extension/imgildev/ovsx-tree-maker)
[![Open VSX Downloads](https://img.shields.io/open-vsx/dt/imgildev/ovsx-tree-maker?style=for-the-badge)](https://open-vsx.org/extension/imgildev/ovsx-tree-maker)
[![Open VSX Rating](https://img.shields.io/open-vsx/rating/imgildev/ovsx-tree-maker?style=for-the-badge)](https://open-vsx.org/extension/imgildev/ovsx-tree-maker/reviews)
[![GitHub Repo stars](https://img.shields.io/github/stars/ManuelGil/ovsx-tree-maker?style=for-the-badge&logo=github)](https://github.com/ManuelGil/ovsx-tree-maker)
[![GitHub license](https://img.shields.io/github/license/ManuelGil/ovsx-tree-maker?style=for-the-badge&logo=github)](https://github.com/ManuelGil/ovsx-tree-maker/blob/main/LICENSE)

Tree Maker is a powerful Visual Studio Code extension that allows you to effortlessly generate a directory tree of your project in various formats, including Markdown. Whether you want to visualize the structure of your project or share it with others, Tree Maker makes it simple to create a clean and easy-to-read file tree representation.

Tree Maker is designed to help developers streamline their workflow and improve project organization. By providing a visual representation of the project structure, Tree Maker enables you to quickly navigate and understand the relationships between files and directories.

Get started with Tree Maker today and take your project organization to the next level!

## Table of Contents

- [Tree Maker](#tree-maker)
  - [Table of Contents](#table-of-contents)
  - [Requirements](#requirements)
  - [Features](#features)
  - [Project Settings](#project-settings)
  - [Settings Options](#settings-options)
  - [Follow Me](#follow-me)
  - [VSXpert Template](#vsxpert-template)
  - [Contributing](#contributing)
  - [Code of Conduct](#code-of-conduct)
  - [Changelog](#changelog)
  - [Authors](#authors)
  - [License](#license)

## Requirements

- VSCode 1.76.0 or later

## Features

- **Customizable Format:** Generate directory trees in multiple formats, such as Markdown, JSON, and more.
- **Flexible Depth Control**: Specify the depth of the directory tree, giving you control over how detailed the structure should be.
- **Recursive Directory Scanning**: Automatically scans nested folders and generates a hierarchical structure, making it ideal for projects of any size.
- **Save as File**: Save the directory tree as a file (e.g., tree.md) within your project for later use or sharing.

## Project Settings

Configure your project by creating or updating a settings.json file at the project's root. If you already have a `.vscode/settings.json` file, skip the first two steps.

1. Open the command palette in VSCode:

   - `CTRL + SHIFT + P` (Windows)
   - `CMD + SHIFT + P` (Mac OS)

2. Type `Preferences: Open Workspace Settings (JSON)`.

3. In the `.vscode/settings.json` file, copy and paste the following settings:

    ```json
    {
      "treeMaker.files.selectedOutputFormat": "markdown", // markdown, json, yaml, xml, csv, txt
      "treeMaker.files.outputFolder": "tree-maker", // Output folder for the tree file
      "treeMaker.files.outputFileName": "structure", // Output file name
      "treeMaker.files.outputFilePrefix": "", // Output file prefix
      "treeMaker.files.outputFileSuffix": "", // Output file suffix
      "treeMaker.files.outputFileSeparator": "_", // Output file separator
      "treeMaker.search.ignoreFilePathPatternOnExport": ["**/dist/**", "**/tree-maker/**"], // Ignore file path patterns
      "treeMaker.search.shouldListOnlyFiles": false, // List only files
      "treeMaker.search.maxSearchRecursionDepth": 3, // Maximum search recursion depth
      "treeMaker.search.shouldListOnlyVisibleFiles": true, // List only visible files
      "treeMaker.search.keepGitignorePreferences": false, // Keep .gitignore preferences
    }
    ```

4. **Restart VS Code**

Your project is now set up to automatically format code upon saving.

## Settings Options

Configure Tree Maker settings in your `.vscode/settings.json` file to tailor the behavior of the tree file generation process according to your project's needs.

- **`treeMaker.files.selectedOutputFormat`**: The format of the output file. Supported formats include `markdown`, `json`, `yaml`, `xml`, `csv`, and `txt`.
- **`treeMaker.files.outputFolder`**: The output folder for the tree file. By default, the file is saved in the root directory of the project.
- **`treeMaker.files.outputFileName`**: The name of the output file. By default, the file is named `structure`.
- **`treeMaker.files.outputFilePrefix`**: The prefix of the output file name.
- **`treeMaker.files.outputFileSuffix`**: The suffix of the output file name.
- **`treeMaker.files.outputFileSeparator`**: The separator used to join the prefix, name, and suffix of the output file.
- **`treeMaker.search.ignoreFilePathPatternOnExport`**: An array of file path patterns to ignore when exporting the tree file.
- **`treeMaker.search.shouldListOnlyFiles`**: A boolean value indicating whether to list only files in the tree structure.
- **`treeMaker.search.maxSearchRecursionDepth`**: The maximum search recursion depth when generating the tree structure.
- **`treeMaker.search.shouldListOnlyVisibleFiles`**: A boolean value indicating whether to list only visible files in the tree structure.
- **`treeMaker.search.keepGitignorePreferences`**: A boolean value indicating whether to keep the `.gitignore` preferences when generating the tree structure.

For more information on configuring Tree Maker settings, refer to the [Project Settings](#project-settings) section.

## Follow Me

If you enjoy using Tree Maker, consider following me for updates on this and future projects:

[![GitHub followers](https://img.shields.io/github/followers/ManuelGil?style=for-the-badge&logo=github)](https://github.com/ManuelGil)
[![X (formerly Twitter) Follow](https://img.shields.io/twitter/follow/imgildev?style=for-the-badge&logo=x)](https://twitter.com/imgildev)

## VSXpert Template

This extension was created using [VSXpert](https://vsxpert.com), a template that helps you create Visual Studio Code extensions with ease. VSXpert provides a simple and easy-to-use structure to get you started quickly.

## Contributing

Tree Maker is open-source software, and we welcome contributions from the community. If you'd like to contribute, please fork the [GitHub repository](https://github.com/ManuelGil/ovsx-tree-maker) and submit a pull request with your changes.

Before contributing, please read our [Contribution Guidelines](./CONTRIBUTING.md) for instructions on coding standards, testing, and more.

## Code of Conduct

We are committed to providing a friendly, safe, and welcoming environment for all, regardless of gender, sexual orientation, disability, ethnicity, religion, or similar personal characteristic. Please review our [Code of Conduct](./CODE_OF_CONDUCT.md) before participating in our community.

## Changelog

For a complete list of changes, see the [CHANGELOG.md](./CHANGELOG.md)

## Authors

- **Manuel Gil** - _Owner_ - [ManuelGil](https://github.com/ManuelGil)

See also the list of [contributors](https://github.com/ManuelGil/ovsx-tree-maker/contributors) who participated in this project.

## License

This extension is licensed under the MIT License. See the [MIT License](https://opensource.org/licenses/MIT) for details.

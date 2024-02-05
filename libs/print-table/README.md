# print-table

<!-- BADGES:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-) [![Coverage Status](https://coveralls.io/repos/github/juparog/nodejs-libs/badge.svg?branch=main)](https://coveralls.io/github/juparog/nodejs-libs?branch=main)
<!-- BADGES:END -->

`print-table` is a simple library that allows you to print beautiful and customizable tables in the console using ANSI escape codes. It is ideal for displaying tabular data in a clear and visually appealing way.

## Installation

```bash
npm install @juparog/print-table
```

## Usage

Here is an example of how to use `print-table`:

```typescript
import { AlignmentText, BgColor, ConsoleTable, ROUNDED_BOX_THEME, TableOptions } from '@juparog/print-table';

// Define your table options
const tableOptions: TableOptions = {
  columns: [
    {
      header: { name: 'Rule 📜' },
      key: 'Rule',
      width: 20,
      bold: true,
    },
    { header: 'Group 📂', key: 'Group', width: 25 },
    {
      header: 'Status 🚥',
      key: 'Status',
      width: 20,
      bgColor: (value) => {
        if (value === 'Succeeded') {
          return BgColor.GREEN;
        }
        return BgColor.RED;
      },
      align: AlignmentText.CENTER_MIDDLE,
      styleFullCell: true,
    },
    {
      header: 'Messages 💬',
      key: 'Messages',
      width: 50,
      truncate: false,
    },
  ],
  data: [ // Your data goes here
    {
      Rule: 'NAMING_STANDARD',
      Group: 'Configuration management',
      Status: 'Succeeded',
      Messages: '',
    },
    {
      Rule: 'DEPLOY_DEV',
      Group: 'Continuous deployment',
      Status: 'Succeeded',
      Messages: '',
    },
    {
      Rule: 'DEPLOY_PDN',
      Group: 'Continuous deployment',
      Status: 'Failed',
      Messages:
        'Failed configurations in stage Deploy PDN: [You need configure some task like: ROLLBACK_TASK, REST_CALL_TASK. At least one must be configured.]',
    },
    {
      Rule: 'BUILD_TASKS',
      Group: 'Continuous integration',
      Status: 'Failed',
      Messages:
        'Failed configurations in stage Build: [Prohibited enabled value on Unit Test, it must match the expression "true".]',
    },
    {
      Rule: 'ACCEPTANCE_TEST',
      Group: 'Continuous integration',
      Status: 'Failed',
      Messages: 'No stages to validate',
    },
  ],
  theme: ROUNDED_BOX_THEME, // You can choose different themes for your table
};

// Create an instance of ConsoleTable
const consoleTable = new ConsoleTable(tableOptions);

// Print the table to the console
consoleTable.printTable();
```

Output of example:
```bash
$ ts-node ./index.ts
╭──────────────────────┬───────────────────────────┬──────────────────────┬────────────────────────────────────────────────────╮
│ Rule 📜              │ Group 📂                  │ Status 🚥            │ Messages 💬                                        │
├──────────────────────┼───────────────────────────┼──────────────────────┼────────────────────────────────────────────────────┤
│ NAMING_STANDARD      │ Configuration management  │      Succeeded       │                                                    │
├──────────────────────┼───────────────────────────┼──────────────────────┼────────────────────────────────────────────────────┤
│ DEPLOY_DEV           │ Continuous deployment     │      Succeeded       │                                                    │
├──────────────────────┼───────────────────────────┼──────────────────────┼────────────────────────────────────────────────────┤
│                      │                           │                      │ Failed configurations in stage Deploy PDN: [You ne │
│ DEPLOY_PDN           │ Continuous deployment     │        Failed        │ ed configure some task like: ROLLBACK_TASK, REST_C │
│                      │                           │                      │ ALL_TASK. At least one must be configured.]        │
├──────────────────────┼───────────────────────────┼──────────────────────┼────────────────────────────────────────────────────┤
│ BUILD_TASKS          │ Continuous integration    │      Succeeded       │                                                    │
├──────────────────────┼───────────────────────────┼──────────────────────┼────────────────────────────────────────────────────┤
│ ACCEPTANCE_TEST      │ Continuous integration    │        Failed        │ No stages to validate                              │
╰──────────────────────┴───────────────────────────┴──────────────────────┴────────────────────────────────────────────────────╯
```

In this example, we define a table with specific columns, data, and a theme. Customize your table's appearance by adjusting options such as column width, text alignment, background color, and more.

## Features

- Simple and intuitive API
- Customizable themes for different table styles
- Support for text alignment, background colors, and other styling options
- Easy integration with existing Node.js projects

Explore the full range of features and customization options by referring to the documentation or exploring the source code.

## License

This library is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. Feel free to use and modify it according to your needs.

We hope you find `print-table` helpful for presenting your tabular data in a visually appealing way!

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://medium.com/@juangasca95"><img src="https://avatars.githubusercontent.com/u/58745412?v=4?s=100" width="100px;" alt="Juan Rodriguez"/><br /><sub><b>Juan Rodriguez</b></sub></a><br /><a href="https://github.com/juparog/nodejs-libs/commits?author=juparog" title="Code">💻</a></td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td align="center" size="13px" colspan="7">
        <img src="https://raw.githubusercontent.com/all-contributors/all-contributors-cli/1b8533af435da9854653492b1327a23a4dbd0a10/assets/logo-small.svg">
          <a href="https://all-contributors.js.org/docs/en/bot/usage">Add your contributions</a>
        </img>
      </td>
    </tr>
  </tfoot>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

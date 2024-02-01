# print-table-ansi

`print-table-ansi` is a simple library that allows you to print beautiful and customizable tables in the console using ANSI escape codes. It is ideal for displaying tabular data in a clear and visually appealing way.

## Installation

```bash
npm install @juparog/print-table-ansi
```

## Usage

Here is an example of how to use `print-table-ansi`:

```typescript
import { AlignmentText, BgColor, ConsoleTable, ROUNDED_BOX_THEME, TableOptions } from '@juparog/print-table-ansi';

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

We hope you find `print-table-ansi` helpful for presenting your tabular data in a visually appealing way!

import {
  ConsoleTable,
  ROUNDED_BOX_THEME,
  TableColumnOptions,
} from './libs/print-table/src';

const columns: TableColumnOptions[] = [
  { key: 'name', header: 'Name', width: 20 },
  { key: 'age', header: 'Age', width: 10 },
];

const data = [
  { name: 'John Doe', age: '30' },
  { name: 'Jane Doe', age: '25' },
];

const theme = ROUNDED_BOX_THEME;

const consoleTable = new ConsoleTable({ columns, data, theme });

consoleTable.printTable();

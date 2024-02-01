import {
  CLASSIC_BOX_THEME,
  ConsoleTable,
  ROUNDED_BOX_THEME,
  TableColumnOptions,
} from '../src';

describe('ConsoleTable', () => {
  const columns: TableColumnOptions[] = [
    { key: 'name', header: 'Name', width: 20 },
    { key: 'age', header: 'Age', width: 10 },
  ];

  const data = [
    { name: 'John Doe', age: '30' },
    { name: 'Jane Doe', age: '25' },
  ];

  const theme = ROUNDED_BOX_THEME;

  describe('constructor', () => {
    it('should create a ConsoleTable instance with default theme', () => {
      const consoleTable = new ConsoleTable({ columns, data });
      expect(consoleTable).toBeInstanceOf(ConsoleTable);
      expect(consoleTable['theme']).toEqual(
        expect.objectContaining({
          ...CLASSIC_BOX_THEME,
        })
      );
    });

    it('should create a ConsoleTable instance with custom theme', () => {
      const consoleTable = new ConsoleTable({ columns, data, theme });
      expect(consoleTable).toBeInstanceOf(ConsoleTable);
      expect(consoleTable['theme']).toEqual(theme);
    });

    it('should instantiate ConsoleTable with custom headers', () => {
      columns[0].header = { name: 'Name', underline: true };
      const consoleTable = new ConsoleTable({ columns, data, theme });
      expect(consoleTable['columns'][0]['header']).toMatchObject(
        columns[0].header
      );
    });
  });

  describe('setColumns', () => {
    it('should set new columns', () => {
      const consoleTable = new ConsoleTable({ columns, data });
      const newColumns = [
        { key: 'id', header: { name: 'ID' }, width: 15 },
        { key: 'description', header: { name: 'Description' }, width: 30 },
      ];

      consoleTable.setColumns(newColumns);

      expect(consoleTable['columns']).toEqual(newColumns);
    });
  });

  describe('setData', () => {
    it('should set new data', () => {
      const consoleTable = new ConsoleTable({ columns, data });
      const newData = [
        { name: 'Alice', age: '28' },
        { name: 'Bob', age: '35' },
      ];

      consoleTable.setData(newData);

      expect(consoleTable['data']).toEqual(newData);
    });
  });

  describe('setTheme', () => {
    it('should set a new theme', () => {
      const consoleTable = new ConsoleTable({ columns, data });
      const newTheme = ROUNDED_BOX_THEME;

      consoleTable.setTheme(newTheme);

      expect(consoleTable['theme']).toEqual(newTheme);
    });
  });

  describe('addRowData', () => {
    it('should add a new row of data to the table', () => {
      const table = new ConsoleTable({
        columns,
        data,
      });

      const newRow = { name: 'Bob', age: '40' };
      table.addRowData(newRow);

      const expectedData = [...data, newRow];

      expect(table['data']).toEqual(expectedData);
    });
  });

  describe('getTruncateValue', () => {
    it('should return the correct truncate value based on options', () => {
      const table = new ConsoleTable({
        columns: [
          { key: 'name', header: 'Name', truncate: 10 },
          { key: 'description', header: 'Description', truncate: true },
          {
            key: 'status',
            header: 'Status',
            truncate: (value: string) => value.length - 3,
          },
        ],
        data: [
          {
            name: 'John',
            description: 'Lorem ipsum dolor sit amet',
            status: 'Active',
          },
        ],
      });

      const columnOptions = table['columns'];

      const truncateValue1 = table['getTruncateValue'](
        'John',
        columnOptions[0]
      );
      const truncateValue2 = table['getTruncateValue'](
        'Lorem ipsum dolor sit amet',
        columnOptions[1]
      );
      const truncateValue3 = table['getTruncateValue'](
        'Active',
        columnOptions[2]
      );

      expect(truncateValue1).toBe(10);
      expect(truncateValue2).toBe(20); // Default width for Description column
      expect(truncateValue3).toBe(3); // (length of 'Active') - 3
    });
  });

  describe('getTableStrings', () => {
    it('should generate table strings correctly', () => {
      const expectedTableStrings = [
        '╭──────────────────────┬────────────╮',
        '│ \u001b[1m\u001b[4mName\u001b[0m                \u001b[0m │ \u001b[1m\u001b[4mAge\u001b[0m        │',
        '├──────────────────────┼────────────┤',
        '│ John Doe\u001b[0m            \u001b[0m │ 30\u001b[0m         │',
        '├──────────────────────┼────────────┤',
        '│ Jane Doe\u001b[0m            \u001b[0m │ 25\u001b[0m         │',
        '╰──────────────────────┴────────────╯',
      ];

      const consoleTable = new ConsoleTable({ columns, data, theme });
      const actualTableStrings = consoleTable.getTableStrings();

      actualTableStrings.map((str) => console.log(JSON.stringify(str)));

      expect(actualTableStrings).toEqual(expectedTableStrings);
    });
  });

  describe('ConsoleTable', () => {
    const consoleLogMock = jest.spyOn(console, 'log').mockImplementation();

    afterEach(() => {
      consoleLogMock.mockClear();
    });

    it('should print the table to the console', () => {
      const consoleTable = new ConsoleTable({ columns, data, theme });
      consoleTable.printTable();

      expect(consoleLogMock.mock.calls[0][0]).toContain(
        '╭──────────────────────┬────────────╮'
      );
      expect(consoleLogMock.mock.calls[6][0]).toContain(
        '╰──────────────────────┴────────────╯'
      );
    });
  });
});

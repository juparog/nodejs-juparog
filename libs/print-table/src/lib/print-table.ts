import { RESET_ALL_MODES } from './constants';
import { CLASSIC_BOX_THEME } from './themes';
import {
  ConsoleTableColumnOptions,
  HeaderColumn,
  TableOptions,
  TableTheme,
} from './types';
import {
  SequenceBuilder,
  SequenceCodeBuilder,
  alignHorizontalText,
  combineArrays,
  getPadding,
  padArrayWithAling,
  truncateText,
} from './utils';

const defaultTheme = CLASSIC_BOX_THEME;

/**
 * ConsoleTable class for printing tables in the console.
 *
 * @class
 * @public
 */
export class ConsoleTable {
  private columns: ConsoleTableColumnOptions[];
  private data: Record<string, string>[];
  private theme: TableTheme = defaultTheme;

  /**
   * Creates an instance of ConsoleTable.
   *
   * @param {TableOptions} options - Configuration options for the table.
   */
  constructor(options: TableOptions) {
    // override default theme
    if (options.theme) {
      this.theme = {
        ...options.theme,
        ...options.theme,
      };
    }

    // normalize column options
    this.columns = this.normalizeColumnsOptions(options);

    // normalize data
    this.data = options.data.map((row) => JSON.parse(JSON.stringify(row)));
  }

  /**
   * Normalize column options based on the provided TableOptions.
   *
   * @private
   * @param {TableOptions} options - The options containing column configurations.
   * @returns {ConsoleTableColumnOptions[]} - The normalized column options.
   */
  private normalizeColumnsOptions(
    options: TableOptions
  ): ConsoleTableColumnOptions[] {
    return options.columns.map((row) => {
      let header: HeaderColumn = {
        ...this.theme.column?.header,
        ...options.theme?.column?.header,
        name: '',
      };
      if (typeof row.header === 'string') {
        header.name = row.header;
      } else {
        header = { ...header, ...row.header };
      }

      return {
        ...this.theme.column,
        ...options.theme?.column,
        ...row,
        header: header,
      };
    });
  }

  /**
   * Generates an array of strings representing the entire table.
   *
   * @returns {string[]} - Array of strings for the entire table.
   */
  public getTableStrings(): string[] {
    const tableStrins: string[] = [];
    tableStrins.push(this.getTopTableLine()); // top table line
    tableStrins.push(...this.getHeaderLines()); // header table lines
    tableStrins.push(this.getSeparatorLine()); // separator table line
    tableStrins.push(...this.getDataLines()); // data table lines
    tableStrins.push(this.getBottomTableLine()); // bottom table line

    return tableStrins;
  }

  /**
   * Prints the table to the console.
   */
  public printTable(): void {
    this.getTableStrings().forEach((str) => console.log(str));
  }

  /**
   * Sets the columns for the table.
   *
   * @param {ConsoleTableColumnOptions[]} columns - Array of column options.
   */
  public setColumns(columns: ConsoleTableColumnOptions[]): void {
    this.columns = columns;
  }

  /**
   * Sets the data for the table.
   *
   * @param {Record<string, string>[]} data - Array of data rows.
   */
  public setData(data: Record<string, string>[]): void {
    this.data = data;
  }

  /**
   * Sets the theme for the table.
   *
   * @param {TableTheme} theme - Theme options for the table.
   */
  public setTheme(theme: TableTheme): void {
    this.theme = theme;
  }

  /**
   * Adds a new data row to the table.
   *
   * @param {Record<string, string>} row - Data row to be added.
   */
  public addRowData(row: Record<string, string>): void {
    this.data.push(row);
  }

  /**
   * Gets the effective width of a column based on its header and optional specified width.
   *
   * @param {string} header - The header text of the column.
   * @param {number} [width] - The optional width specified for the column.
   * @returns {number} - The effective width of the column.
   */
  private getColumnWidth(header: string, width?: number): number {
    return width || header.length;
  }

  /**
   * Gets the truncate value based on the specified column configuration and value.
   *
   * @param {string} value - The value of the cell.
   * @param {ConsoleTableColumnOptions} column - The column configuration.
   * @returns {number} - The truncate value for the cell.
   */
  private getTruncateValue(
    value: string,
    column: ConsoleTableColumnOptions
  ): number {
    const width = this.getColumnWidth(column.header.name, column.width);

    if (typeof column.truncate === 'number') {
      return column.truncate;
    }

    if (typeof column.truncate === 'function') {
      const truncate = column.truncate(value);
      return typeof truncate === 'number' ? truncate : width;
    }

    if (column.truncate === true) {
      return width;
    }

    return value.length;
  }

  /**
   * Generates a line for the table with specified corner and separator characters.
   *
   * @param {string} leftCorner - The left corner character.
   * @param {string} innerCorner - The inner corner or separator character.
   * @param {string} rightCorner - The right corner character.
   * @param {string} separator - The separator character.
   * @returns {string} - The generated line for the table.
   */
  private getTableLine(
    leftCorner: string,
    innerCorner: string,
    rightCorner: string,
    separator: string
  ): string {
    const columnWidths = this.columns.map((column) =>
      this.getColumnWidth(column.header.name, column.width)
    );
    const separators = columnWidths
      .map((width) => separator.repeat(width + 2))
      .join(innerCorner);
    return leftCorner + separators + rightCorner;
  }

  /**
   * Generates an array of strings representing the top line of the table.
   *
   * @returns {string[]} - Array of strings for the top line.
   */
  private getTopTableLine(): string {
    return this.getTableLine(
      this.theme.table.topLeftCorner,
      this.theme.table.topInnerCorner,
      this.theme.table.topRightCorner,
      this.theme.table.horizontalLine
    );
  }

  /**
   * Generates an array of strings representing the bottom line of the table.
   *
   * @returns {string[]} - Array of strings for the bottom line.
   */
  private getBottomTableLine(): string {
    return this.getTableLine(
      this.theme.table.bottomLeftCorner,
      this.theme.table.bottomInnerCorner,
      this.theme.table.bottomRightCorner,
      this.theme.table.horizontalLine
    );
  }

  /**
   * Generates an array of strings representing the separator line of the table.
   *
   * @returns {string[]} - Array of strings for the separator line.
   */
  private getSeparatorLine(): string {
    return this.getTableLine(
      this.theme.table.sideLeftCorner,
      this.theme.table.centerInnerCorner,
      this.theme.table.sideRightCorner,
      this.theme.table.horizontalLine
    );
  }

  /**
   * Applies styles to a row and returns the stylized row as an array of strings.
   *
   * @param {Record<string, string>} row - Data row.
   * @param {string[][]} cells - 2D array of cell fragments.
   * @param {ConsoleTableColumnOptions[]} columnOptions - Column options.
   * @returns {string[][]} - Stylized row as a 2D array of strings.
   */
  private applyStylesToRow(
    row: Record<string, string>,
    cells: string[][],
    columnOptions: ConsoleTableColumnOptions[]
  ): string[][] {
    const maxLength = Math.max(
      ...cells.map((cellFragments) => cellFragments.length)
    );
    const stylizedRow = cells.map((cellFragments, cellFragmentsInedex) => {
      const options = columnOptions[cellFragmentsInedex];
      const columnWidth = this.getColumnWidth(
        options.header.name,
        options.width
      );

      const paddedRow = padArrayWithAling(
        cellFragments,
        maxLength,
        options.align
      );

      const stylizedRow = paddedRow.map((cellFragment) => {
        const padding = getPadding(
          cellFragment,
          columnWidth,
          this.theme.table.paddingChar
        );

        const sequenceCodes = SequenceCodeBuilder(row[options.key], options);
        if (options.styleFullCell) {
          cellFragment =
            sequenceCodes +
            alignHorizontalText(cellFragment, padding, options.align) +
            SequenceBuilder(RESET_ALL_MODES);
        } else {
          cellFragment = alignHorizontalText(
            sequenceCodes + cellFragment + SequenceBuilder(RESET_ALL_MODES),
            padding,
            options.align
          );
        }

        return cellFragment;
      });

      return stylizedRow;
    });
    return stylizedRow;
  }

  /**
   * Retrieves the cell fragments for a specified column and row.
   *
   * @param {ConsoleTableColumnOptions} column - The column configuration.
   * @param {Record<string, string>} row - The data row.
   * @returns {string[]} - Array of cell fragments.
   */
  private getCellFragments(
    column: ConsoleTableColumnOptions,
    row: Record<string, string>
  ): string[] {
    const width = this.getColumnWidth(column.header.name, column.width);
    const cellInitialValue = row[column.key] || '';
    let cellValue = truncateText(
      cellInitialValue,
      this.getTruncateValue(cellInitialValue, column)
    );
    const cellFragments: string[] = [];

    do {
      const cellFragment = cellValue.substring(0, width);
      cellFragments.push(cellFragment);
      cellValue = cellValue.substring(width);
    } while (cellValue !== '');

    return cellFragments;
  }

  /**
   * Generates an array of strings representing the content lines of the table.
   *
   * @param {Record<string, string>[]} data - Array of data rows.
   * @param {ConsoleTableColumnOptions[]} columns - Array of column configurations.
   * @returns {string[]} - Array of strings for the content lines.
   */
  private getTableContentLines(
    data: Record<string, string>[],
    columns: ConsoleTableColumnOptions[]
  ): string[] {
    const rows: string[] = [];

    data.forEach((row, rowIndex) => {
      const cells: string[][] = columns.map((column) =>
        this.getCellFragments(column, row)
      );
      const stylizedRow = this.applyStylesToRow(row, cells, columns);

      const { paddingChar, verticalLine } = this.theme.table;

      rows.push(
        ...combineArrays(
          stylizedRow,
          SequenceBuilder(RESET_ALL_MODES) +
            paddingChar +
            verticalLine +
            paddingChar
        ).map(
          (line) =>
            verticalLine + paddingChar + line + paddingChar + verticalLine
        )
      );

      if (rowIndex < data.length - 1) {
        rows.push(this.getSeparatorLine());
      }
    });

    return rows;
  }

  /**
   * Generates an array of strings representing the header lines of the table.
   *
   * @returns {string[]} - Array of strings for the header lines.
   */
  private getHeaderLines(): string[] {
    // normalize header data to use in getTableContentLines
    const headerData = this.columns.reduce((acc, column) => {
      acc[column.key] = column.header.name;
      return acc;
    }, {} as Record<string, string>);

    // normalize header options to use in getTableContentLines
    const headerColumns = this.columns.map((column) => ({
      ...column.header,
      header: column.header,
      key: column.key,
      width: column.width,
    }));

    const headerRows = this.getTableContentLines([headerData], headerColumns);

    return headerRows;
  }

  /**
   * Generates an array of strings representing the data lines of the table.
   *
   * @returns {string[]} - Array of strings for the data lines.
   */
  private getDataLines(): string[] {
    const dataRows = this.getTableContentLines(this.data, this.columns);
    return dataRows;
  }
}

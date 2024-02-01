import {
  AlignmentText,
  BgColor,
  BrightBgColor,
  BrightForegroundColor,
  ForegroundColor,
} from './constants';

/**
 * Color used in printing tables with ANSI escape codes.
 */
export type Color = ForegroundColor | BrightForegroundColor;

/**
 * Function that takes a string as input and returns a Color object.
 * @param text - The input string.
 * @returns The Color object.
 */
export type ColorFunc = (text: string) => Color;

/**
 * Background color of a table cell.
 */
export type BackgroundColor = BgColor | BrightBgColor;

/**
 * Function that takes a text string and returns a BackgroundColor.
 * @param text The input text.
 * @returns The corresponding BackgroundColor.
 */
export type BackgroundColorFunc = (text: string) => BackgroundColor;

/**
 * Function that takes a string as input and returns a boolean.
 * @param value - The input string for the table cell.
 * @returns The boolean value.
 */
export type SelectModeFunc = (value: string) => boolean;

/**
 * Function that takes a string as input and returns a number.
 * @param value - The input string for the table cell.
 * @returns The number of characters to truncate o the boolean value
 */
export type TruncateFunc = (value: string) => boolean | number;

/**
 * Column style.
 */
export type ColumnStyle = {
  /**
   * The color of the column text (optional).
   * @see Color
   * @see ColorFunc
   */
  color?: Color | ColorFunc;

  /**
   * The background color of the column (optional).
   * @see BackgroundColor
   * @see BackgroundColorFunc
   */
  bgColor?: BackgroundColor | BackgroundColorFunc;

  /**
   * Whether the column text should be bold (optional).
   * @see SelectModeFunc
   */
  bold?: boolean | SelectModeFunc;

  /**
   * Whether the column text should be faint (optional).
   * @see SelectModeFunc
   */
  faint?: boolean | SelectModeFunc;

  /**
   * Whether the column text should be italicized (optional).
   * @see SelectModeFunc
   */
  italicize?: boolean | SelectModeFunc;

  /**
   * Whether the column text should be underlined (optional).
   * @see SelectModeFunc
   */
  underline?: boolean | SelectModeFunc;

  /**
   * Whether the column text should blink slowly (optional).
   * @see SelectModeFunc
   */
  slowBlink?: boolean | SelectModeFunc;

  /**
   * Whether the column text should blink rapidly (optional).
   * @see SelectModeFunc
   */
  rapidBlink?: boolean | SelectModeFunc;

  /**
   * Whether the column text should be reversed (optional).
   * @see SelectModeFunc
   */
  inverse?: boolean | SelectModeFunc;

  /**
   * Whether the column text should be hidden (optional).
   * @see SelectModeFunc
   */
  hidden?: boolean | SelectModeFunc;

  /**
   * Whether the column text should be struck through (optional).
   * @see SelectModeFunc
   */
  strikeThrough?: boolean | SelectModeFunc;

  /**
   * Whether the style should be applied to the entire cell or just the text inside (optional).
   */
  styleFullCell?: boolean | SelectModeFunc;

  /**
   * Specifies how the text should be handled within a cell (optional).
   *
   * - `false`: The cell will adjust its height to display all the text.
   * - `true`: The text will be truncated to fit the maximum width of the column.
   * - `number`: Specifies the maximum number of characters to display before truncating.
   * - `TruncateFunc`: A custom truncation function to handle text truncation.
   */
  truncate?: boolean | number | TruncateFunc;

  /**
   * The alignment of the text in the column (optional).
   * default: left
   * @see AlignmentText
   */
  align?: AlignmentText;
};

export type HeaderColumn = ColumnStyle & {
  /**
   * The name of the header to display in the column.
   */
  name: string;
};

/**
 * Table column options.
 */
export type TableColumnOptions = ColumnStyle & {
  /**
   * The header of the column.
   */
  header: string | HeaderColumn;

  /**
   * The key of the column.
   */
  key: string;

  /**
   * The width of the column (optional).
   */
  width?: number;
};

/**
 * Table characters.
 */
export type TableCharacters = {
  /**
   * The top left corner of the table.
   */
  topLeftCorner: string;

  /**
   * The top right corner of the table.
   */
  topRightCorner: string;

  /**
   * The top inner corner of the table.
   */
  topInnerCorner: string;

  /**
   * The bottom left corner of the table.
   */
  bottomLeftCorner: string;

  /**
   * The bottom right corner of the table.
   */
  bottomRightCorner: string;

  /**
   * The bottom inner corner of the table.
   */
  bottomInnerCorner: string;

  /**
   * The side left corner of the table.
   */
  sideLeftCorner: string;

  /**
   * The side right corner of the table.
   */
  sideRightCorner: string;

  /**
   * The center inner corner of the table.
   */
  centerInnerCorner: string;

  /**
   * The horizontal corner of the table.
   */
  horizontalLine: string;

  /**
   * The vertical right corner of the table.
   */
  verticalLine: string;

  /**
   * The character used to fill the table.
   */
  paddingChar: string;
};

export type TableTheme = {
  /**
   * The columns of the table.
   * @see TableColumnOptions
   */
  column?: Omit<TableColumnOptions, 'header' | 'key'> & {
    /**
     * The header of the column.
     */
    header?: Omit<HeaderColumn, 'name'>;
  };

  /**
   * The characters of the table.
   * @see TableCharacters
   */
  table: TableCharacters;
};

/**
 * Options for a table.
 */
export type TableOptions = {
  /**
   * The columns of the table.
   * @see TableColumn
   */
  columns: TableColumnOptions[];

  /**
   * The data of the table.
   */
  data: Record<string, unknown>[];

  /**
   * Theme to apply to the table.
   * Can pass a new theme or use one of the ones already created in the lib.
   * @see TableTheme
   */
  theme?: TableTheme;
};

/**
 * Options for a table column in ConsoleTable class.
 */
export type ConsoleTableColumnOptions = Omit<TableColumnOptions, 'header'> & {
  header: HeaderColumn;
};

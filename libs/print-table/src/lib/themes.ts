import { AlignmentText } from './constants';
import { TableTheme } from './types';

/**
 * Theme for classic box table. (default theme)
 */
export const CLASSIC_BOX_THEME: TableTheme = {
  column: {
    header: {
      bold: true,
      underline: true,
      align: AlignmentText.LEFT_MIDDLE,
    },
    width: 20,
    align: AlignmentText.LEFT_MIDDLE,
    truncate: 150,
  },
  table: {
    topLeftCorner: '┌',
    topRightCorner: '┐',
    topInnerCorner: '┬',
    bottomLeftCorner: '└',
    bottomRightCorner: '┘',
    bottomInnerCorner: '┴',
    sideLeftCorner: '├',
    sideRightCorner: '┤',
    centerInnerCorner: '┼',
    horizontalLine: '─',
    verticalLine: '│',
    paddingChar: ' ',
  },
};

/**
 * Theme for a rounded box table.
 */
export const ROUNDED_BOX_THEME: TableTheme = {
  ...CLASSIC_BOX_THEME,
  table: {
    topLeftCorner: '╭',
    topRightCorner: '╮',
    topInnerCorner: '┬',
    bottomLeftCorner: '╰',
    bottomRightCorner: '╯',
    bottomInnerCorner: '┴',
    sideLeftCorner: '├',
    sideRightCorner: '┤',
    centerInnerCorner: '┼',
    horizontalLine: '─',
    verticalLine: '│',
    paddingChar: ' ',
  },
};

/**
 * Theme for a table with double line borders.
 */
export const DOUBLE_LINE_THEME: TableTheme = {
  ...CLASSIC_BOX_THEME,
  column: {
    header: {
      italicize: true,
      underline: false,
    },
  },
  table: {
    topLeftCorner: '╔',
    topRightCorner: '╗',
    topInnerCorner: '╦',
    bottomLeftCorner: '╚',
    bottomRightCorner: '╝',
    bottomInnerCorner: '╩',
    sideLeftCorner: '╠',
    sideRightCorner: '╣',
    centerInnerCorner: '╬',
    horizontalLine: '═',
    verticalLine: '║',
    paddingChar: ' ',
  },
};

/**
 * Theme for a table with double and single lines borders.
 */
export const DOUBLE_MIX_LINE_THEME: TableTheme = {
  ...CLASSIC_BOX_THEME,
  table: {
    topLeftCorner: '╓',
    topRightCorner: '╖',
    topInnerCorner: '╥',
    bottomLeftCorner: '╙',
    bottomRightCorner: '╜',
    bottomInnerCorner: '╨',
    sideLeftCorner: '╟',
    sideRightCorner: '╢',
    centerInnerCorner: '╫',
    horizontalLine: '─',
    verticalLine: '║',
    paddingChar: ' ',
  },
};

/**
 * Theme for a table with star borders.
 */
export const STAR_BORDERS_THEME: TableTheme = {
  ...CLASSIC_BOX_THEME,
  table: {
    topLeftCorner: '*',
    topRightCorner: '*',
    topInnerCorner: '*',
    bottomLeftCorner: '*',
    bottomRightCorner: '*',
    bottomInnerCorner: '*',
    sideLeftCorner: '*',
    sideRightCorner: '*',
    centerInnerCorner: '*',
    horizontalLine: '*',
    verticalLine: '*',
    paddingChar: ' ',
  },
};

/**
 * Theme for table with round edges.
 */
export const ROUND_EDGES_THEME: TableTheme = {
  ...CLASSIC_BOX_THEME,
  table: {
    topLeftCorner: '╭',
    topRightCorner: '╮',
    topInnerCorner: '╮',
    bottomLeftCorner: '╰',
    bottomRightCorner: '╯',
    bottomInnerCorner: '╰',
    sideLeftCorner: '│',
    sideRightCorner: '│',
    centerInnerCorner: '│',
    horizontalLine: '─',
    verticalLine: '│',
    paddingChar: ' ',
  },
};

/**
 * Theme for a table with curved lines as border.
 */
export const CURVED_LINES_THEME: TableTheme = {
  ...CLASSIC_BOX_THEME,
  table: {
    topLeftCorner: '╭',
    topRightCorner: '╮',
    topInnerCorner: '╮',
    bottomLeftCorner: '╰',
    bottomRightCorner: '╯',
    bottomInnerCorner: '╰',
    sideLeftCorner: '╰',
    sideRightCorner: '╯',
    centerInnerCorner: '╯',
    horizontalLine: '─',
    verticalLine: '│',
    paddingChar: ' ',
  },
};

/**
 * Theme for table with block borders.
 */
export const BLOCK_BORDERS_THEME: TableTheme = {
  ...CLASSIC_BOX_THEME,
  column: {
    header: {
      underline: false,
      styleFullCell: true,
    },
    underline: false,
    styleFullCell: true,
  },
  table: {
    topLeftCorner: '█',
    topRightCorner: '█',
    topInnerCorner: '█',
    bottomLeftCorner: '█',
    bottomRightCorner: '█',
    bottomInnerCorner: '█',
    sideLeftCorner: '█',
    sideRightCorner: '█',
    centerInnerCorner: '█',
    horizontalLine: '█',
    verticalLine: '█',
    paddingChar: ' ',
  },
};

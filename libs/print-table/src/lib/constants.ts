/**
 * Escape code used for control sequences.
 */
export const ESC_CODE = '\x1B'; // Escape sequence control (ESC)
export const CSI_CODE = '\x5B'; // Control sequence introducer ([)
export const END_CODE = '\x6D'; // Ansi scape sequence ending (m)

/**
 * Colors / Graphics mode
 */
export const RESET_ALL_MODES = '\x30'; // Reset all modes (styles and colors) (0)
export const BOLD_MODE = '\x31'; // Bold or increased intensity (1)
export const FAINT_MODE = '\x32'; // Faint (decreased intensity) (2)
export const ITALICIZE_MODE = '\x33'; // Italicize (3)
export const UNDERLINE_MODE = '\x34'; // Underline (4)
export const SLOW_BLINK_MODE = '\x35'; // Slow blink (5)
export const RAPID_BLINK_MODE = '\x36'; // Rapid blink (6)
export const INVERSE_MODE = '\x37'; // Inverse or reverse; swap foreground and background (7)
export const HIDDEN_MODE = '\x38'; // Hidden (8)
export const STRIKE_THROUGH_MODE = '\x39'; // Strike-through (9)

/**
 * Foreground colors
 */
export enum ForegroundColor {
  BLACK = '\x33\x30', // Foreground color black (30)
  RED = '\x33\x31', // Foreground color red (31)
  GREEN = '\x33\x32', // Foreground color green (32)
  YELLOW = '\x33\x33', // Foreground color yellow (33)
  BLUE = '\x33\x34', // Foreground color blue (34)
  MAGENTA = '\x33\x35', // Foreground color magenta (35)
  CYAN = '\x33\x36', // Foreground color cyan (36)
  WHITE = '\x33\x37', // Foreground color white (37)
}

/**
 * Bright foreground colors
 */
export enum BrightForegroundColor {
  BRIGHT_BLACK = '\x39\x30', // Foreground color bright black (90)
  BRIGHT_RED = '\x39\x31', // Foreground color bright red (91)
  BRIGHT_GREEN = '\x39\x32', // Foreground color bright green (92)
  BRIGHT_YELLOW = '\x39\x33', // Foreground color bright yellow (93)
  BRIGHT_BLUE = '\x39\x34', // Foreground color bright blue (94)
  BRIGHT_MAGENTA = '\x39\x35', // Foreground color bright magenta (95)
  BRIGHT_CYAN = '\x39\x36', // Foreground color bright cyan (96)
  BRIGHT_WHITE = '\x39\x37', // Foreground color bright white (97)
}

/**
 * Background colors
 */
export enum BgColor {
  BLACK = '\x34\x30', // Background color black (40)
  RED = '\x34\x31', // Background color red (41)
  GREEN = '\x34\x32', // Background color green (42)
  YELLOW = '\x34\x33', // Background color yellow (43)
  BLUE = '\x34\x34', // Background color blue (44)
  MAGENTA = '\x34\x35', // Background color magenta (45)
  CYAN = '\x34\x36', // Background color cyan (46)
  WHITE = '\x34\x37', // Background color white (47)
}

/**
 * Bright background colors
 */
export enum BrightBgColor {
  BRIGHT_BLACK = '\x39\x30', // Background color bright black (100)
  BRIGHT_RED = '\x39\x31', // Background color bright red (101)
  BRIGHT_GREEN = '\x39\x32', // Background color bright green (102)
  BRIGHT_YELLOW = '\x39\x33', // Background color bright yellow (103)
  BRIGHT_BLUE = '\x39\x34', // Background color bright blue (104)
  BRIGHT_MAGENTA = '\x39\x35', // Background color bright magenta (105)
  BRIGHT_CYAN = '\x39\x36', // Background color bright cyan (106)
  BRIGHT_WHITE = '\x39\x37', // Background color bright white (107)
}

/**
 * Alignment of the text in a table cell.
 */
export enum AlignmentText {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',

  TOP = 'top',
  MIDDLE = 'middle',
  BOTTOM = 'bottom',

  LEFT_TOP = 'left-top',
  LEFT_MIDDLE = 'left-middle',
  LEFT_BOTTOM = 'left-bottom',

  CENTER_TOP = 'center-top',
  CENTER_MIDDLE = 'center-middle',
  CENTER_BOTTOM = 'center-bottom',

  RIGHT_TOP = 'right-top',
  RIGHT_MIDDLE = 'right-middle',
  RIGHT_BOTTOM = 'right-bottom',
}

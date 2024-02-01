import {
  AlignmentText,
  BOLD_MODE,
  CSI_CODE,
  END_CODE,
  ESC_CODE,
  FAINT_MODE,
  HIDDEN_MODE,
  INVERSE_MODE,
  ITALICIZE_MODE,
  RAPID_BLINK_MODE,
  SLOW_BLINK_MODE,
  STRIKE_THROUGH_MODE,
  UNDERLINE_MODE,
} from './constants';
import {
  BackgroundColor,
  BackgroundColorFunc,
  Color,
  ColorFunc,
  ColumnStyle,
  SelectModeFunc,
} from './types';

/**
 * Generate the ANSI sequence code for a given mode.
 * @param args - The mode to be applied.
 * @returns - The ANSI sequence code.
 */
export function SequenceBuilder(...args: string[]) {
  if (args.length === 0) {
    return '';
  }
  return `${ESC_CODE}${CSI_CODE}${args.join(';')}${END_CODE}`;
}

/**
 * Generate the ANSI sequence code for a given mode.
 * @param select - The mode to be applied.
 * @param value - The value to be formatted.
 * @param mode - The mode to be applied.
 * @returns - The ANSI sequence code.
 */
export function SequenceModeCode(
  select: boolean | SelectModeFunc | undefined,
  value: string,
  mode: string
): string {
  if (select && typeof select === 'function') {
    return select(value) ? SequenceBuilder(mode) : '';
  }
  if (select) {
    return SequenceBuilder(mode);
  }
  return '';
}

/**
 * Generate the ANSI sequence code for a given color.
 * @param select - The color to be applied.
 * @param value - The value to be formatted.
 * @returns - The ANSI sequence code.
 */
export function SequenceColorCode(
  select: Color | ColorFunc | BackgroundColor | BackgroundColorFunc | undefined,
  value: string
): string {
  if (select && typeof select === 'function') {
    return SequenceBuilder(select(value));
  }
  if (select) {
    return SequenceBuilder(select);
  }
  return '';
}

/**
 * Generate the ANSI sequence code for a given value and options.
 * @param value - The value to be formatted.
 * @param options - The options to be applied to the value.
 * @returns - The ANSI sequence code.
 */
export function SequenceCodeBuilder(
  value: string,
  options: ColumnStyle
): string {
  let sequenceCodes = '';

  sequenceCodes += SequenceModeCode(options.bold, value, BOLD_MODE);
  sequenceCodes += SequenceModeCode(options.faint, value, FAINT_MODE);
  sequenceCodes += SequenceModeCode(options.italicize, value, ITALICIZE_MODE);
  sequenceCodes += SequenceModeCode(options.underline, value, UNDERLINE_MODE);
  sequenceCodes += SequenceModeCode(options.slowBlink, value, SLOW_BLINK_MODE);
  sequenceCodes += SequenceModeCode(
    options.rapidBlink,
    value,
    RAPID_BLINK_MODE
  );
  sequenceCodes += SequenceModeCode(options.inverse, value, INVERSE_MODE);
  sequenceCodes += SequenceModeCode(options.hidden, value, HIDDEN_MODE);
  sequenceCodes += SequenceModeCode(
    options.strikeThrough,
    value,
    STRIKE_THROUGH_MODE
  );

  sequenceCodes += SequenceColorCode(options.color, value);
  sequenceCodes += SequenceColorCode(options.bgColor, value);

  return sequenceCodes;
}

/**
 * Truncates a text to a specified maximum length and appends an ellipsis if truncated.
 * @param text - The input text to be truncated.
 * @param maxLength - The maximum length of the truncated text.
 * @returns The truncated text.
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  } else {
    return text.substring(0, maxLength) + '...';
  }
}

/**
 * Remove ANSI codes from a string.
 * @param input - The input string.
 * @returns The string without ANSI codes.
 */
export function removeANSICodes(input: string): string {
  // eslint-disable-next-line no-control-regex
  return input.replace(/\x1B\[[0-9;]*[JKmsu]/g, '');
}

/**
 * Combine the matrices in `data` exchanging rows for columns and
 * joining the elements of each row with separator.
 *
 * @param {string[][]} data - The array of data to combine.
 * @param {string} separator - The separator to join the elements of each row.
 * @returns {string[]} - The array resulting from the combination.
 */
export function combineArrays(data: string[][], separator: string): string[] {
  if (data.length === 0) {
    return [];
  }
  const transposedData = data[0].map((_, colIndex) =>
    data.map((row) => row[colIndex])
  );
  const combinedRows = transposedData.map((row) => row.join(separator));
  return combinedRows;
}

/**
 * Get the padding for a string.
 * @param value - The string to be padded.
 * @param width - The width of the padding.
 * @param char - The character to use for padding.
 * @returns The padding string.
 */
export function getPadding(value: string, width: number, char: string): string {
  if (value.length > width) {
    return '';
  }
  return char.repeat(width - value.length);
}

/**
 * Aligns a text to the left, right, or center.
 * @param value - The string to be aligned.
 * @param padding - The padding to be added.
 * @param align - The alignment of the text. Default: `AlignmentText.LEFT`.
 * @returns The aligned text.
 */
export function alignHorizontalText(
  value: string,
  padding: string,
  align: AlignmentText = AlignmentText.LEFT
): string {
  if (align.startsWith('right')) {
    return padding + value;
  }
  if (align.startsWith('center')) {
    const center = Math.floor(padding.length / 2);
    return (
      padding.substring(0, center) +
      value +
      padding.substring(center, padding.length)
    );
  }

  return value + padding;
}

/**
 * Pads an array of cell fragments to a specified length with alignment.
 * @param cellFragments - An array of cell fragments.
 * @param length - The desired length of the resulting array.
 * @param align - The alignment for padding. Default: `AlignmentText.TOP`.
 * @returns A new array with padded cell fragments.
 */
export function padArrayWithAling(
  cellFragments: string[],
  length: number,
  align: AlignmentText = AlignmentText.TOP
): string[] {
  if (align.endsWith('bottom')) {
    return [...Array(length - cellFragments.length).fill(''), ...cellFragments];
  }
  if (align.endsWith('middle')) {
    const top = Math.floor((length - cellFragments.length) / 2);
    const bottom = Math.ceil((length - cellFragments.length) / 2);
    return [
      ...Array(top).fill(''),
      ...cellFragments,
      ...Array(bottom).fill(''),
    ];
  }

  return [...cellFragments, ...Array(length - cellFragments.length).fill('')];
}

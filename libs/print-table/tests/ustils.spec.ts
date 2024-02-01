import {
  AlignmentText,
  BOLD_MODE,
  BgColor,
  FAINT_MODE,
  ForegroundColor,
  INVERSE_MODE,
  ITALICIZE_MODE,
  SLOW_BLINK_MODE,
  STRIKE_THROUGH_MODE,
  UNDERLINE_MODE,
} from '../src/lib/constants';
import {
  SequenceBuilder,
  SequenceCodeBuilder,
  SequenceColorCode,
  SequenceModeCode,
  alignHorizontalText,
  combineArrays,
  getPadding,
  padArrayWithAling,
  removeANSICodes,
  truncateText,
} from '../src/lib/utils';

describe('SequenceBuilder', () => {
  test('should return ANSI sequence code for a single mode', () => {
    const result = SequenceBuilder('31'); // Red color code
    expect(result).toBe('\u001b[31m');
  });

  test('should return ANSI sequence code for multiple modes', () => {
    const result = SequenceBuilder('1', '31', '42'); // Bold, red text with green background
    expect(result).toBe('\u001b[1;31;42m');
  });

  test('should return empty string for no modes', () => {
    const result = SequenceBuilder();
    expect(result).toBe('');
  });
});

describe('SequenceModeCode', () => {
  it('should return empty string when select is undefined', () => {
    const result = SequenceModeCode(undefined, 'value', 'mode');
    expect(result).toBe('');
  });

  it('should return empty string when select is false', () => {
    const result = SequenceModeCode(false, 'value', 'mode');
    expect(result).toBe('');
  });

  it('should return empty string when select is a function that returns false', () => {
    const select = (value: string) => value.length > 5;
    const result = SequenceModeCode(select, '12345', 'mode');
    expect(result).toBe('');
  });

  it('should return ANSI sequence code when select is true', () => {
    const result = SequenceModeCode(true, 'value', 'mode');
    expect(result).toBe(SequenceBuilder('mode'));
  });

  it('should return ANSI sequence code when select is a function that returns true', () => {
    const select = (value: string) => value.length < 10;
    const result = SequenceModeCode(select, '12345', 'mode');
    expect(result).toBe(SequenceBuilder('mode'));
  });
});

describe('SequenceColorCode', () => {
  it('should return empty string when select is undefined', () => {
    const result = SequenceColorCode(undefined, 'value');
    expect(result).toBe('');
  });

  it('should return ANSI sequence code for color when select is a string', () => {
    const result = SequenceColorCode(BgColor.RED, 'value');
    expect(result).toBe(SequenceBuilder(BgColor.RED));
  });

  it('should return ANSI sequence code for color when select is a function that returns a color', () => {
    const select = (value: string) =>
      value.length > 5 ? BgColor.GREEN : BgColor.BLUE;
    const result = SequenceColorCode(select, '123456');
    expect(result).toBe(SequenceBuilder(BgColor.GREEN));
  });
});

describe('SequenceCodeBuilder', () => {
  it('should return empty string when options are empty', () => {
    const result = SequenceCodeBuilder('value', {});
    expect(result).toBe('');
  });

  it('should return ANSI sequence codes for modes and colors in options', () => {
    const options = {
      bold: true,
      italicize: true,
      underline: true,
      color: ForegroundColor.RED,
      bgColor: BgColor.YELLOW,
    };

    const result = SequenceCodeBuilder('value', options);

    const expectedCodes = [
      SequenceModeCode(options.bold, 'value', BOLD_MODE),
      SequenceModeCode(options.italicize, 'value', ITALICIZE_MODE),
      SequenceModeCode(options.underline, 'value', UNDERLINE_MODE),
      SequenceColorCode(options.color, 'value'),
      SequenceColorCode(options.bgColor, 'value'),
    ];

    expect(result).toBe(expectedCodes.join(''));
  });

  it('should return ANSI sequence codes for different modes and colors in options', () => {
    const options = {
      faint: true,
      slowBlink: true,
      inverse: true,
      strikeThrough: true,
      color: ForegroundColor.CYAN,
      bgColor: BgColor.MAGENTA,
    };

    const result = SequenceCodeBuilder('value', options);

    const expectedCodes = [
      SequenceModeCode(options.faint, 'value', FAINT_MODE),
      SequenceModeCode(options.slowBlink, 'value', SLOW_BLINK_MODE),
      SequenceModeCode(options.inverse, 'value', INVERSE_MODE),
      SequenceModeCode(options.strikeThrough, 'value', STRIKE_THROUGH_MODE),
      SequenceColorCode(options.color, 'value'),
      SequenceColorCode(options.bgColor, 'value'),
    ];

    expect(result).toBe(expectedCodes.join(''));
  });

  it('should return ANSI sequence codes for modes and background color in options', () => {
    const options = {
      italicize: true,
      underline: true,
      bgColor: (value: string) =>
        value.length > 5 ? BgColor.GREEN : BgColor.BLUE,
    };

    const result = SequenceCodeBuilder('123456', options);

    const expectedCodes = [
      SequenceModeCode(options.italicize, '123456', '3'),
      SequenceModeCode(options.underline, '123456', '4'),
      SequenceColorCode(options.bgColor, '123456'),
    ];

    expect(result).toBe(expectedCodes.join(''));
  });
});

describe('truncateText', () => {
  it('should return the same text if length is less than or equal to maxLength', () => {
    const result1 = truncateText('short', 10);
    const result2 = truncateText('equal', 5);
    expect(result1).toBe('short');
    expect(result2).toBe('equal');
  });

  it('should truncate text and append ellipsis if length exceeds maxLength', () => {
    const result = truncateText('This is a long text', 10);
    expect(result).toBe('This is a ...');
  });

  it('should handle edge case where maxLength is exactly the length of the text', () => {
    const result = truncateText('Exactly 21 characters', 21);
    expect(result).toBe('Exactly 21 characters');
  });

  it('should handle edge case where maxLength is less than 3', () => {
    const result = truncateText('Short', 2);
    expect(result).toBe('Sh...');
  });

  it('should handle edge case where maxLength is 0', () => {
    const result = truncateText('Very long text', 0);
    expect(result).toBe('...');
  });
});

describe('removeANSICodes', () => {
  it('should remove ANSI codes from a string', () => {
    const input = '\u001b[31mThis is \u001b[1mbold\u001b[0m text.';
    const expectedOutput = 'This is bold text.';
    const result = removeANSICodes(input);
    expect(result).toBe(expectedOutput);
  });

  it('should handle an empty string', () => {
    const input = '';
    const result = removeANSICodes(input);
    expect(result).toBe('');
  });

  it('should handle a string without ANSI codes', () => {
    const input = 'This is a simple text.';
    const result = removeANSICodes(input);
    expect(result).toBe(input);
  });
});

describe('combineArrays', () => {
  it('should combine arrays with the specified separator', () => {
    const data = [
      ['A', 'B'],
      ['C', 'D'],
      ['E', 'F'],
    ];
    const separator = '|';
    const expectedOutput = ['A|C|E', 'B|D|F'];
    const result = combineArrays(data, separator);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle an empty array', () => {
    const data: string[][] = [];
    const separator = '|';
    const result = combineArrays(data, separator);
    expect(result).toEqual([]);
  });

  it('should handle arrays with different row lengths', () => {
    const data = [
      ['A', 'B'],
      ['C', 'D', 'X'],
      ['E', 'F'],
    ];
    const separator = '|';
    const expectedOutput = ['A|C|E', 'B|D|F'];
    const result = combineArrays(data, separator);
    expect(result).toEqual(expectedOutput);
  });
});

describe('getPadding', () => {
  it('should return correct padding for a short string', () => {
    const value = 'ABC';
    const width = 8;
    const char = '-';
    const expectedOutput = '-----';
    const result = getPadding(value, width, char);
    expect(result).toEqual(expectedOutput);
  });

  it('should return empty string for a string of equal width', () => {
    const value = 'ABC';
    const width = 3;
    const char = '-';
    const expectedOutput = '';
    const result = getPadding(value, width, char);
    expect(result).toEqual(expectedOutput);
  });

  it('should return empty string for a string longer than width', () => {
    const value = 'ABC';
    const width = 2;
    const char = '-';
    const expectedOutput = '';
    const result = getPadding(value, width, char);
    expect(result).toEqual(expectedOutput);
  });

  it('should return correct padding for an empty string', () => {
    const value = '';
    const width = 5;
    const char = '-';
    const expectedOutput = '-----';
    const result = getPadding(value, width, char);
    expect(result).toEqual(expectedOutput);
  });
});

describe('alignHorizontalText', () => {
  it('should align text to the left', () => {
    const value = 'ABC';
    const padding = '-----';
    const align = AlignmentText.LEFT;
    const expectedOutput = 'ABC-----';
    const result = alignHorizontalText(value, padding, align);
    expect(result).toEqual(expectedOutput);
  });

  it('should align text to the right', () => {
    const value = 'ABC';
    const padding = '-----';
    const align = AlignmentText.RIGHT;
    const expectedOutput = '-----ABC';
    const result = alignHorizontalText(value, padding, align);
    expect(result).toEqual(expectedOutput);
  });

  it('should align the text to the center, giving priority to the left if the padding is odd', () => {
    const value = 'ABC';
    const padding = '-----';
    const align = AlignmentText.CENTER;
    const expectedOutput = '--ABC---';
    const result = alignHorizontalText(value, padding, align);
    expect(result).toEqual(expectedOutput);
  });

  it('should align text to the right with additional padding', () => {
    const value = 'ABC';
    const padding = '-----';
    const align = AlignmentText.RIGHT;
    const expectedOutput = '-----ABC';
    const result = alignHorizontalText(value, padding, align);
    expect(result).toEqual(expectedOutput);
  });
});

describe('padArrayWithAling', () => {
  it('should pad array to the top', () => {
    const cellFragments = ['ABC', '123'];
    const length = 5;
    const align = AlignmentText.TOP;
    const expectedOutput = ['ABC', '123', '', '', ''];
    const result = padArrayWithAling(cellFragments, length, align);
    expect(result).toEqual(expectedOutput);
  });

  it('should pad array to the bottom', () => {
    const cellFragments = ['ABC', '123'];
    const length = 5;
    const align = AlignmentText.BOTTOM;
    const expectedOutput = ['', '', '', 'ABC', '123'];
    const result = padArrayWithAling(cellFragments, length, align);
    expect(result).toEqual(expectedOutput);
  });

  it('should pad array to the middle, giving priority to top the length is odd', () => {
    const cellFragments = ['ABC', '123'];
    const length = 5;
    const align = AlignmentText.MIDDLE;
    const expectedOutput = ['', 'ABC', '123', '', ''];
    const result = padArrayWithAling(cellFragments, length, align);
    expect(result).toEqual(expectedOutput);
  });

  it('should pad array to the middle', () => {
    const cellFragments = ['ABC', '123'];
    const length = 6;
    const align = AlignmentText.MIDDLE;
    const expectedOutput = ['', '', 'ABC', '123', '', ''];
    const result = padArrayWithAling(cellFragments, length, align);
    expect(result).toEqual(expectedOutput);
  });
});

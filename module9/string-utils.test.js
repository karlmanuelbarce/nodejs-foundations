// string-utils.test.js
const { capitalize, reverse, countWords, isEmail } = require('./string-utils');

describe('capitalize', () => {
  test('capitalizes the first letter', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  test('returns empty string for empty input', () => {
    expect(capitalize('')).toBe('');
  });

  test('returns empty string for null', () => {
    expect(capitalize(null)).toBe('');
  });
});

describe('reverse', () => {
  test('reverses a string', () => {
    expect(reverse('hello')).toBe('olleh');
  });

  test('returns empty string for empty input', () => {
    expect(reverse('')).toBe('');
  });

  test('handles single character', () => {
    expect(reverse('a')).toBe('a');
  });
});

describe('countWords', () => {
  test('counts words in a sentence', () => {
    expect(countWords('hello world foo')).toBe(3);
  });

  test('returns 0 for empty string', () => {
    expect(countWords('')).toBe(0);
  });

  test('handles extra whitespace', () => {
    expect(countWords('  hello   world  ')).toBe(2);
  });
});

describe('isEmail', () => {
  test('returns true for valid-looking email', () => {
    expect(isEmail('user@example.com')).toBe(true);
  });

  test('returns false for string without @', () => {
    expect(isEmail('userexample.com')).toBe(false);
  });

  test('returns false for null', () => {
    expect(isEmail(null)).toBe(false);
  });
});

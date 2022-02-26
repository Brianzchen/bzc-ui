// @flow
import formatTimeString from './formatTimeString';

describe('formatTimeString', () => {
  it('return valid Date string when pass number', () => {
    expect(formatTimeString(2020, 1, 2)).toBe('2020-01-02');
  });

  it('return valid Date string when pass number string', () => {
    expect(formatTimeString('2020', '1', '2')).toBe('2020-01-02');
  });
});

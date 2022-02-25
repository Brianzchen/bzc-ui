// @flow
import toKebabCase from './toKebabCase';

describe('toKebabCase', () => {
  it('handles spaces', () => {
    expect(toKebabCase('I am a title')).toBe('i-am-a-title');
  });

  it('handles if there are extra dashes', () => {
    expect(toKebabCase('I am double--dashing')).toBe('i-am-double-dashing');
  });
});

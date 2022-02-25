// @flow
import findCharDifference from './findCharDifference';

describe('findCharDifference', () => {
  it('finds the extra char', () => {
    expect(findCharDifference(
      'hello there',
      'hello theree',
    )).toBe('e');
  });

  it('finds extra multiple characters', () => {
    expect(findCharDifference(
      'hello',
      'hello there',
    )).toBe(' there');
  });

  it('finds difference in the middle', () => {
    expect(findCharDifference(
      'someongstring',
      'somelongstring',
    )).toBe('l');
  });

  it('handles a single character', () => {
    expect(findCharDifference(
      '',
      'a',
    )).toBe('a');
  });
});

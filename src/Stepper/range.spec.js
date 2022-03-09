// @flow
import range from './range';

describe('range', () => {
  it('works with one param', () => {
    expect(range(10)).toEqual(
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    );
  });

  it('works with two params', () => {
    expect(range(10, 15)).toEqual(
      [10, 11, 12, 13, 14],
    );
  });

  it('works with three params', () => {
    expect(range(8, 16, 2)).toEqual(
      [8, 10, 12, 14, 16, 18, 20, 22],
    );
  });
});

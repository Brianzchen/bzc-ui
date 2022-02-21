// @flow
import hexToRgba from './hexToRgba';

describe('hexToRgba', () => {
  it('adds the alpha', () => {
    expect(hexToRgba('#000000', 0.15)).toBe('rgba(0, 0, 0, 0.15)');
  });
});

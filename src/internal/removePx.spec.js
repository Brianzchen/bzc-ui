// @flow
import removePx from './removePx';

describe('removePx', () => {
  it('handles number', () => {
    expect(removePx(10)).toBe(10);
  });

  it('handles string', () => {
    expect(removePx('10')).toBe(10);
  });

  it('handles string without px', () => {
    expect(removePx('10px')).toBe(10);
  });
});

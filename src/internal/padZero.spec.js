// @flow
import padZero from './padZero';

describe('padZero', () => {
  it('handles padding', () => {
    expect(padZero('1', 2)).toBe('01');
  });

  it('does not add anything if already enough chars', () => {
    expect(padZero('12', 2)).toBe('12');
  });

  it('does not add anything if more than pad requirement', () => {
    expect(padZero('123', 2)).toBe('123');
  });
});

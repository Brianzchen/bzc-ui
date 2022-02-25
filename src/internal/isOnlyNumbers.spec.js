// @flow
import isOnlyNumbers from './isOnlyNumbers';

describe('isOnlyNumbers', () => {
  it('accepts only numbers', () => {
    expect(isOnlyNumbers('123456')).toBe(true);
  });

  it('rejects if period exists', () => {
    expect(isOnlyNumbers('123456.')).toBe(false);
  });

  it('rejects if decimal number', () => {
    expect(isOnlyNumbers('123.456')).toBe(false);
  });

  it('rejects if alpha characters', () => {
    expect(isOnlyNumbers('qwer')).toBe(false);
  });

  it('rejects with special characters', () => {
    expect(isOnlyNumbers('!2345')).toBe(false);
  });

  it('rejects spaces', () => {
    expect(isOnlyNumbers(' 123')).toBe(false);
    expect(isOnlyNumbers('12 3')).toBe(false);
  });

  it('accepts empty string', () => {
    expect(isOnlyNumbers('')).toBe(true);
  });
});

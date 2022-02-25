// @flow
import findReplacedDifference from './findReplacedDifference';

describe('findReplacedDifference', () => {
  it('handles more characters', () => {
    expect(findReplacedDifference(
      '123456789',
      '1aa3456789',
    )).toBe('aa');
  });

  it('handles replacement more characters at the start', () => {
    expect(findReplacedDifference(
      '123456789',
      'aaaa123456789',
    )).toBe('aaaa');
  });

  it('handles replacement more characters at the end', () => {
    expect(findReplacedDifference(
      '123456789',
      '12345678aaaa',
    )).toBe('aaaa');
  });

  it('handles same char replacement', () => {
    expect(findReplacedDifference(
      '123456789',
      '123446789',
    )).toBe('4');
  });

  it('handles replacement with less characters', () => {
    expect(findReplacedDifference(
      '123456789',
      '1aa6789',
    )).toBe('aa');
  });

  it('handles only removal', () => {
    expect(findReplacedDifference(
      '+12 3',
      '+1 3',
    )).toBe('');
  });

  it('handles removing spaces', () => {
    expect(findReplacedDifference(
      '    ',
      '   ',
    )).toBe('');
  });
});

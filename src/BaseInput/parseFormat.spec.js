// @flow
import { lorem } from '@faker-js/faker';

import parseFormat from './parseFormat';

describe('parseFormat', () => {
  it('returns the value normally', () => {
    const text = lorem.sentence();
    expect(parseFormat(text)).toBe(text);
  });

  it('returns the value when passed a random format type', () => {
    const text = lorem.sentence();
    // $FlowExpectedError[incompatible-call]
    expect(parseFormat(text, 'random')).toBe(text);
  });

  it('formats credit card correctly', () => {
    expect(parseFormat('12345678111122', 'credit-card')).toBe('1234 5678 1111 22');
  });
});

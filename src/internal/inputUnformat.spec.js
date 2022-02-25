// @flow
import { lorem } from '@faker-js/faker';

import inputUnformat from './inputUnformat';

describe('inputUnformat', () => {
  it('returns the value normally', () => {
    const text = lorem.sentence();
    expect(inputUnformat(text)).toBe(text);
  });

  it('returns the value when passed a random format type', () => {
    const text = lorem.sentence();
    // $FlowExpectedError[incompatible-call]
    expect(inputUnformat(text, 'random')).toBe(text);
  });

  it('unformats credit card style inputs correctly', () => {
    expect(inputUnformat('1234 5678 1234 4567', 'credit-card')).toBe('1234567812344567');
  });
});

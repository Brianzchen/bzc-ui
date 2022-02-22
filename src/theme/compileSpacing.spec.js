// @flow
import { datatype } from '@faker-js/faker';

import compileSpacing from './compileSpacing';

describe('compileSpacing', () => {
  const spaces = {
    '1': datatype.number(),
    '2': datatype.number(),
    '3': datatype.number(),
    '4': datatype.number(),
  };

  const getSpacing = compileSpacing(spaces);

  it('returns the corresponding spacing', () => {
    const key = 2;

    expect(getSpacing(key)).toBe(spaces[key]);
  });

  it('returns undefined if unknown spacing is passed', () => {
    expect(getSpacing(99999)).toBe(0);
  });
});

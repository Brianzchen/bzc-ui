// @flow
import faker from '@faker-js/faker';

import compileColors from './compileColors';

describe('compileColors', () => {
  it('turns colors passed into functions for consumption', () => {
    const colors = {
      primary: faker.lorem.word(),
    };

    const functionalColors = compileColors(colors);

    expect(functionalColors.primary()).toBe(colors.primary);
  });
});

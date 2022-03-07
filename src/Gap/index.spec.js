// @flow
import React from 'react';
import { screen, render } from '@testing-library/react';
import { lorem } from '@faker-js/faker';

import Gap from '.';

describe('<Gap />', () => {
  it('passed other random props into the root element', () => {
    const props = {
      [lorem.word()]: lorem.sentence(),
      [lorem.word()]: lorem.sentence(),
      [lorem.word()]: lorem.sentence(),
    };

    render(<Gap data-testid="test" {...props} />);

    Object.keys(props).forEach((key) => {
      expect(screen.getByTestId('test').getAttribute(key)).toBe(props[key]);
    });
  });
});

// @flow
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { lorem } from '@faker-js/faker';

import LoadingSpinner from '.';

describe('<LoadingSpinner />', () => {
  it('passes random props into spinner root', () => {
    const props = {
      [lorem.word()]: lorem.sentence(),
      [lorem.word()]: lorem.sentence(),
      [lorem.word()]: lorem.sentence(),
    };

    render(<LoadingSpinner data-testid="test" {...props} />);

    Object.keys(props).forEach((key) => {
      expect(screen.getByTestId('test').getAttribute(key)).toBe(props[key]);
    });
  });
});

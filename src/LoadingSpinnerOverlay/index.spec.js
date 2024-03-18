// @flow
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { lorem } from '@faker-js/faker';

import LoadingSpinnerOverlay from '.';

describe('<LoadingSpinnerOverlay />', () => {
  it('passed other random props into the main element', () => {
    const props = {
      [lorem.word()]: lorem.sentence(),
      [lorem.word()]: lorem.sentence(),
      [lorem.word()]: lorem.sentence(),
    };

    render(<LoadingSpinnerOverlay data-testid="test" {...props} />);

    Object.keys(props).forEach((key) => {
      expect(screen.getByTestId('test').getAttribute(key)).toBe(props[key]);
    });
  });
});

// @flow
import React from 'react';
import { render, screen } from '@testing-library/react';
import { lorem } from '@faker-js/faker';

import BaseSelect from '.';

describe('<BaseSelect', () => {
  it('renders a select tag', () => {
    render(
      <BaseSelect data-testid="test" />,
    );

    expect(screen.getByTestId('test')).toBe(1);
  });

  it('passes random props into select', () => {
    const props = {
      [lorem.word()]: lorem.sentence(),
      [lorem.word()]: lorem.sentence(),
      [lorem.word()]: lorem.sentence(),
    };

    render(<BaseSelect data-testid="test" {...props} />);

    Object.keys(props).forEach((key) => {
      expect(screen.getByTestId('test').getAttribute(key)).toBe(props[key]);
    });
  });
});

// @flow
import React from 'react';
import { render, screen } from '@testing-library/react';
import { lorem } from '@faker-js/faker';

import CardTitle from '.';

describe('<CardTitle />', () => {
  it('renders a child string', () => {
    const expectedString = lorem.sentence();

    render(<CardTitle data-testid="test">{expectedString}</CardTitle>);

    expect(screen.getByTestId('test').textContent).toBe(expectedString);
  });

  it('renders a node inside the header', () => {
    const ExpectedElement = () => <div data-testid="test" />;

    render(<CardTitle><ExpectedElement /></CardTitle>);

    expect(screen.getByTestId('test')).toBeDefined();
  });
});

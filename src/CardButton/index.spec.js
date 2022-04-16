// @flow
import React from 'react';
import { render, screen } from '@testing-library/react';
import { lorem } from '@faker-js/faker';

import CardButton from '.';

describe('<CardButton />', () => {
  it('renders the text', () => {
    const expectedText = lorem.sentence();
    render(
      <CardButton data-testid="test">
        {expectedText}
      </CardButton>,
    );

    expect(screen.getByTestId('test').textContent).toBe(expectedText);
  });

  it('renders button', () => {
    render(
      <CardButton data-testid="test" />,
    );

    expect(screen.getByTestId('test').tagName).toBe('BUTTON');
  });

  it('renders anchor', () => {
    render(
      <CardButton data-testid="test" href="/test" />,
    );

    expect(screen.getByTestId('test').tagName).toBe('A');
  });

  it('renders an anchor normally', () => {
    render(
      <CardButton />,
    );

    expect(screen.getByTestId('st-card-button-chevron')).toBeDefined();
  });

  it('renders an anchor normally', () => {
    render(
      <CardButton chevron={false} />,
    );

    expect(screen.queryByTestId('st-card-button-chevron')).toBe(null);
  });
});

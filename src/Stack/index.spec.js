// @flow
import React from 'react';
import { render, screen } from '@testing-library/react';

import Stack from '.';

describe('<Stack />', () => {
  it('renders number of items', () => {
    const Test = () => <div />;

    render(
      <Stack>
        <Test />
        <Test />
        <Test />
        <Test />
      </Stack>,
    );

    expect(screen.getAllByTestId('st-stack-item').length).toBe(4);
  });

  it('renders does not count fragment as a single child', () => {
    const Test = () => <div />;

    render(
      <Stack>
        <Test />
        <>
          <Test />
          <Test />
        </>
        <Test />
      </Stack>,
    );

    expect(screen.getAllByTestId('st-stack-item').length).toBe(4);
  });
});

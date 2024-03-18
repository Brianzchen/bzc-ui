// @flow
import * as React from 'react';
import { render, screen } from '@testing-library/react';

import Inline from '.';

describe('<Inline />', () => {
  it('renders number of items', () => {
    const Test = () => <div />;

    render(
      <Inline>
        <Test />
        <Test />
        <Test />
        <Test />
      </Inline>,
    );

    expect(screen.getAllByTestId('bzc-inline-item').length).toBe(4);
  });

  it('does not render falsy elements', () => {
    const Test = () => <div>test</div>;

    render(
      <Inline data-testid="container">
        {null}
        <Test />
        {false}
      </Inline>,
    );

    expect(screen.getAllByTestId('bzc-inline-item').length).toBe(1);
    expect(screen.getByTestId('container').textContent).toBe('test');
  });

  it('renders do not count fragment as a single child', () => {
    const Test = () => <div />;

    render(
      <Inline>
        <Test />
        <>
          <Test />
          <Test />
        </>
        <Test />
      </Inline>,
    );

    expect(screen.getAllByTestId('bzc-inline-item').length).toBe(4);
  });
});

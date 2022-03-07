// @flow
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { lorem } from '@faker-js/faker';

import Dropdown from '.';

describe('<Dropdown', () => {
  it('renders the child in the button', () => {
    const string = lorem.sentence();

    render(
      <Dropdown data-testid="test">
        {string}
      </Dropdown>,
    );

    expect(screen.getByTestId('test').textContent).toBe(string);
  });

  it('render the sheet when opened', () => {
    const sheet = () => <div />;

    render(
      <Dropdown
        sheet={sheet}
        data-testid="button"
      />,
    );
    expect(screen.queryByTestId('sf-dropdown-sheet')).toBe(null);

    fireEvent.click(screen.getByTestId('button'));

    expect(screen.getByTestId('sf-dropdown-sheet')).not.toBe(null);
  });

  it('can override the open state', () => {
    const sheet = () => <div />;

    render(
      <Dropdown
        sheet={sheet}
        open
      />,
    );

    expect(screen.getByTestId('sf-dropdown-sheet')).not.toBe(null);
  });
});

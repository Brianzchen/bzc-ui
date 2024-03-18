// @flow
import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import ToggleSwitch from '.';

describe('<ToggleSwitch />', () => {
  it('can trigger the onClick when passed in', () => {
    const onClick: () => void = jest.fn();

    render(
      <ToggleSwitch
        onClick={onClick}
        data-testid="toggle-not-disabled"
      />,
    );

    fireEvent.click(screen.getByTestId('toggle-not-disabled'));

    expect(onClick).toHaveBeenCalled();
  });

  it('does not trigger onClick when disabled is passed in', () => {
    const onClick: () => void = jest.fn();

    render(
      <ToggleSwitch
        disabled
        onClick={onClick}
        data-testid="toggle-disabled"
      />,
    );

    fireEvent.click(screen.getByTestId('toggle-disabled'));

    expect(onClick).not.toHaveBeenCalled();
  });

  it('sets the selected attribute correctly', () => {
    render(
      <>
        <ToggleSwitch data-testid="selected" selected />
        <ToggleSwitch data-testid="unselected" />
      </>,
    );

    expect(screen.getByTestId('selected').getAttribute('is-selected')).toBe('true');
    expect(screen.getByTestId('unselected').getAttribute('is-selected')).toBe('false');
  });
});

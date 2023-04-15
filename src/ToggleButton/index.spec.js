// @flow
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import ToggleButton from '.';

describe('<ToggleButton />', () => {
  it('can trigger the onClick when passed in', () => {
    const onClick: () => void = jest.fn();
    const Comp = () => <div>test</div>;

    render(
      <ToggleButton
        data-testid="test"
        onClick={onClick}
      >
        <Comp />
      </ToggleButton>,
    );

    fireEvent.click(screen.getByTestId('test'));

    expect(onClick).toHaveBeenCalled();
  });

  it('does not trigger onClick when disabled is passed in', () => {
    const onClick: () => void = jest.fn();

    render(
      <ToggleButton
        disabled
        data-testid="test"
        onClick={onClick}
      >
        test
      </ToggleButton>,
    );

    fireEvent.click(screen.getByTestId('test'));

    expect(onClick).not.toHaveBeenCalled();
  });

  it('sets the selected attribute correctly', () => {
    render(
      <>
        <ToggleButton data-testid="selected" selected />
        <ToggleButton data-testid="unselected" />
      </>,
    );

    expect(screen.getByTestId('selected').getAttribute('is-selected')).toBe('true');
    expect(screen.getByTestId('unselected').getAttribute('is-selected')).toBe('false');
  });
});

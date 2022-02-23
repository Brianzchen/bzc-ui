// @flow
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { lorem } from '@faker-js/faker';

import BaseButton from '.';

describe('<BaseButton />', () => {
  it('triggers the onClick when clicked', () => {
    const onClick = jest.fn();

    render(
      <BaseButton
        data-testid="test"
        onClick={onClick}
      >
        test
      </BaseButton>,
    );

    fireEvent.click(screen.getByTestId('test'));

    expect(onClick).toHaveBeenCalled();
  });

  it('renders child text passed in', () => {
    const expectedText = lorem.word();

    render(
      <BaseButton data-testid="test">
        {expectedText}
      </BaseButton>,
    );

    expect(screen.getByTestId('test').textContent).toBe(expectedText);
  });

  it('does not trigger onClick when disabled is passed in', () => {
    const onClick = jest.fn();

    render(
      <BaseButton
        data-testid="test"
        disabled
        onClick={onClick}
      >
        test
      </BaseButton>,
    );

    fireEvent.click(screen.getByTestId('test'));

    expect(onClick).not.toHaveBeenCalled();
  });
});

// @flow
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Provider from '../Provider';

import Button from '.';

describe('<Button />', () => {
  it('can trigger the onClick when passed in', () => {
    const onClick = jest.fn();

    render(
      <Button
        data-testid="test"
        onClick={onClick}
      >
        text
      </Button>,
    );

    fireEvent.click(screen.getByTestId('test'));

    expect(onClick).toHaveBeenCalled();
  });

  it('does not trigger onClick when disabled is passed in', () => {
    const onClick = jest.fn();

    render(
      <Button
        data-testid="test"
        disabled
        onClick={onClick}
      >
        test
      </Button>,
    );

    fireEvent.click(screen.getByTestId('test'));

    expect(onClick).not.toHaveBeenCalled();
  });

  it('does not render focus if provider disables it', () => {
    render(
      <Provider
        focusEffect={false}
      >
        <Button />
      </Provider>,
    );

    expect(screen.queryByTestId('sf-box-button-focus-effect')).toBe(null);
  });

  it('renders focus element by default', () => {
    render(<Button />);

    expect(screen.queryByTestId('sf-box-button-focus-effect')).not.toBe(null);
  });

  it('renders prefix icon when passed', () => {
    render(
      <Button prefixIcon="test">
        test
      </Button>,
    );

    expect(screen.getByTestId('sf-box-button-prefix-icon')).not.toBe(null);
  });

  it('does not render prefix icon normally', () => {
    render(
      <Button>
        test
      </Button>,
    );

    expect(screen.queryByTestId('sf-box-button-prefix-icon')).toBe(null);
  });

  it('does not render prefix icon even if suffix icon is provided', () => {
    render(
      <Button suffixIcon="test">
        test
      </Button>,
    );

    expect(screen.queryByTestId('sf-box-button-prefix-icon')).toBe(null);
  });

  it('renders suffix icon wen passed', () => {
    render(
      <Button suffixIcon="test">
        test
      </Button>,
    );

    expect(screen.getByTestId('sf-box-button-suffix-icon')).not.toBe(null);
  });

  it('does not render suffix icon normally', () => {
    render(
      <Button>
        test
      </Button>,
    );

    expect(screen.queryByTestId('sf-box-button-suffix-icon')).toBe(null);
  });

  it('does not render suffix icon even if prefix icon is provided', () => {
    render(
      <Button prefixIcon="test">
        test
      </Button>,
    );

    expect(screen.queryByTestId('sf-box-button-suffix-icon')).toBe(null);
  });
});

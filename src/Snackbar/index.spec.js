// @flow
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { lorem } from '@faker-js/faker';

import Snackbar from '.';

describe('<Snackbar />', () => {
  afterEach(() => {
    jest.useFakeTimers();
  });

  it('renders if open is not passed', () => {
    const expectedText = lorem.sentences();

    render(
      <Snackbar
        onClose={() => {}}
      >
        {expectedText}
      </Snackbar>,
    );

    expect(screen.getByTestId('bzc-snackbar-text').innerHTML).toBe(expectedText);
  });

  it('does not render if open is false', () => {
    const expectedText = lorem.sentences();

    render(
      <Snackbar
        data-testid="test"
        open={false}
        onClose={() => {}}
      >
        {expectedText}
      </Snackbar>,
    );

    expect(screen.queryByTestId('test')).toBe(null);
  });

  it('calls onClose after expected duration', () => {
    jest.useFakeTimers();
    const onClose: () => void = jest.fn();

    render(
      <Snackbar
        onClose={onClose}
      >
        test
      </Snackbar>,
    );

    jest.advanceTimersByTime(1000);

    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose after passed in duration', () => {
    jest.useFakeTimers();
    const onClose: () => void = jest.fn();

    render(
      <Snackbar
        onClose={onClose}
        timing={500}
      >
        test
      </Snackbar>,
    );

    jest.advanceTimersByTime(500);

    expect(onClose).toHaveBeenCalled();
  });
});

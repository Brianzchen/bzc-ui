// @flow
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { lorem } from '@faker-js/faker';

import BottomSheet from '.';

describe('<BottomSheet', () => {
  it('does not render if not open', () => {
    const onClose: () => void = jest.fn();
    render(
      <BottomSheet
        onClose={onClose}
      />,
    );

    expect(screen.queryByTestId('bzc-bottom-sheet-overlay')).toBe(null);
  });

  it('closes if clicking the background', () => {
    const onClose: () => void = jest.fn();
    render(
      <BottomSheet
        open
        onClose={onClose}
      />,
    );

    fireEvent.click(screen.getByTestId('bzc-bottom-sheet-overlay'));

    expect(onClose).toHaveBeenCalled();
  });

  it('closes if clicking on the close button', () => {
    const onClose: () => void = jest.fn();
    render(
      <BottomSheet
        open
        onClose={onClose}
      />,
    );

    fireEvent.click(screen.getByTestId('bzc-bottom-sheet-close'));

    expect(onClose).toHaveBeenCalled();
  });

  it('renders title if passed', () => {
    const title = lorem.sentence();
    render(
      <BottomSheet
        open
        title={title}
      />,
    );

    expect(screen.getByTestId('bzc-bottom-sheet-title').textContent).toBe(title);
  });

  it('does not render title element if not passed', () => {
    render(
      <BottomSheet
        open
      />,
    );

    expect(screen.queryByTestId('bzc-bottom-sheet-title')).toBe(null);
  });
});

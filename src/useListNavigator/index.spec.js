// @flow
import * as React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import { useListNavigator } from '..';

describe('useListNavigator', () => {
  const onEnter = jest.fn();
  const onEsc = jest.fn();
  const TestComp = () => {
    const listNav = useListNavigator(4, onEnter, onEsc);

    return (
      <>
        <div data-testid="current-index">{listNav.currentIndex}</div>
        <div data-testid="button" onClick={listNav.reset} />
      </>
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('gives next index when I press down', () => {
    const { container } = render(<TestComp />);
    fireEvent.keyDown(container, {
      key: 'ArrowDown',
      code: 'ArrowDown',
    });

    expect(screen.getByTestId('current-index').textContent).toBe('0');
  });

  it('gives previous index when I press up', () => {
    const { container } = render(<TestComp />);
    fireEvent.keyDown(container, {
      key: 'ArrowDown',
      code: 'ArrowDown',
    });
    fireEvent.keyDown(container, {
      key: 'ArrowDown',
      code: 'ArrowDown',
    });
    fireEvent.keyDown(container, {
      key: 'ArrowDown',
      code: 'ArrowDown',
    });
    fireEvent.keyDown(container, {
      key: 'ArrowUp',
      code: 'ArrowUp',
    });

    expect(screen.getByTestId('current-index').textContent).toBe('1');
  });

  it('goes to last index if up key is called on 0', () => {
    const { container } = render(<TestComp />);
    fireEvent.keyDown(container, {
      key: 'ArrowUp',
      code: 'ArrowUp',
    });

    expect(screen.getByTestId('current-index').textContent).toBe('3');
  });

  it('goes to first index if down key is called on last index', () => {
    const { container } = render(<TestComp />);
    fireEvent.keyDown(container, {
      key: 'ArrowDown',
      code: 'ArrowDown',
    });
    fireEvent.keyDown(container, {
      key: 'ArrowDown',
      code: 'ArrowDown',
    });
    fireEvent.keyDown(container, {
      key: 'ArrowDown',
      code: 'ArrowDown',
    });
    fireEvent.keyDown(container, {
      key: 'ArrowDown',
      code: 'ArrowDown',
    });
    onEnter.mockClear();
    fireEvent.keyDown(container, {
      key: 'ArrowDown',
      code: 'ArrowDown',
    });

    expect(screen.getByTestId('current-index').textContent).toBe('0');
  });

  it('calls with 0 when reset is called', () => {
    render(<TestComp />);

    fireEvent.click(screen.getByTestId('button'));

    expect(screen.getByTestId('current-index').textContent).toBe('');
  });

  it('calls enter function with index', () => {
    const { container } = render(<TestComp />);
    fireEvent.keyDown(container, {
      key: 'ArrowDown',
      code: 'ArrowDown',
    });
    fireEvent.keyDown(container, {
      key: 'ArrowDown',
      code: 'ArrowDown',
    });

    fireEvent.keyDown(container, {
      key: 'Enter',
      code: 'Enter',
    });

    expect(onEnter).toHaveBeenCalledWith(1);
  });

  it('calls esc function', () => {
    const { container } = render(<TestComp />);

    fireEvent.keyDown(container, {
      key: 'Escape',
      code: 'Escape',
    });

    expect(onEsc).toBeCalledWith();
  });
});

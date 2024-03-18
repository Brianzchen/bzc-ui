// @flow
import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import GroupedToggleButtons from '.';

describe('<GroupedToggleButtons', () => {
  const buttons = [{}, {}, {}];

  it('renders all the buttons', () => {
    render(
      <GroupedToggleButtons
        data-testid="test"
        buttons={buttons}
      />,
    );

    expect(screen.getByTestId('test').childNodes.length).toBe(3);
  });

  it('allows only single selection', () => {
    const onClick: () => void = jest.fn();

    render(
      <GroupedToggleButtons
        data-testid="test"
        buttons={buttons}
        selection={[0]}
        onSelect={onClick}
      />,
    );

    const node = screen.getByTestId('test').childNodes[1];
    if (node instanceof HTMLElement) {
      fireEvent.click(node);
    }

    expect(onClick).toHaveBeenCalledWith(expect.anything(), {
      newSelection: [1],
    });
  });

  it('can deselect single selection', () => {
    const onClick: () => void = jest.fn();

    render(
      <GroupedToggleButtons
        data-testid="test"
        buttons={buttons}
        selection={[0]}
        onSelect={onClick}
      />,
    );

    const node = screen.getByTestId('test').childNodes[0];
    if (node instanceof HTMLElement) {
      fireEvent.click(node);
    }

    expect(onClick).toHaveBeenCalledWith(expect.anything(), {
      newSelection: [],
    });
  });

  it('allows multi selection', () => {
    const onClick: () => void = jest.fn();

    render(
      <GroupedToggleButtons
        data-testid="test"
        buttons={buttons}
        selection={[0]}
        onSelect={onClick}
        variant="multiple"
      />,
    );

    const node = screen.getByTestId('test').childNodes[1];
    if (node instanceof HTMLElement) {
      fireEvent.click(node);
    }

    expect(onClick).toHaveBeenCalledWith(expect.anything(), {
      newSelection: [0, 1],
    });
  });

  it('can deselect with multiple selections', () => {
    const onClick: () => void = jest.fn();

    render(
      <GroupedToggleButtons
        data-testid="test"
        buttons={buttons}
        selection={[0, 1]}
        onSelect={onClick}
        variant="multiple"
      />,
    );

    const node = screen.getByTestId('test').childNodes[1];
    if (node instanceof HTMLElement) {
      fireEvent.click(node);
    }

    expect(onClick).toHaveBeenCalledWith(expect.anything(), {
      newSelection: [0],
    });
  });
});

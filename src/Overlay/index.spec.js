// @flow
import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import Overlay from '.';

describe('<Overlay />', () => {
  it('triggers the onClick if I click on the background', () => {
    const onClick: () => void = jest.fn();

    render(
      <Overlay
        data-testid="test"
        onClick={onClick}
      />,
    );

    fireEvent.click(screen.getByTestId('test'));

    expect(onClick).toHaveBeenCalled();
  });

  it('does not trigger onClick if a child is clicked', () => {
    const onClick: () => void = jest.fn();

    const Child = () => <div data-testid="test">test</div>;

    render(
      <Overlay
        onClick={onClick}
      >
        <Child />
      </Overlay>,
    );

    fireEvent.click(screen.getByTestId('test'));

    expect(onClick).not.toHaveBeenCalled();
  });

  it('can close if ref is passed in', () => {
    const onClick: () => void = jest.fn();

    render(
      <Overlay
        data-testid="test"
        ref={React.createRef()}
        onClick={onClick}
      />,
    );

    fireEvent.click(screen.getByTestId('test'));

    expect(onClick).toHaveBeenCalled();
  });
});

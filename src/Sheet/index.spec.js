// @flow
import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Sheet from '.';

describe('<Sheet />', () => {
  it('renders child render function', () => {
    const onCloseFunc: () => void = jest.fn();
    const ExpectedElement = ({ onClick }: {|
      onClick: (...args: Array<any>) => any,
    |}) => (
      <div
        data-testid="expected-element"
        onClick={onClick}
      />
    );
    const ref = React.createRef<?HTMLElement>();

    render(
      <>
        <div ref={ref} />
        <Sheet
          onClose={onCloseFunc}
          attachRef={ref}
        >
          {({ onClose }) => (
            <ExpectedElement
              onClick={onClose}
            />
          )}
        </Sheet>
      </>,
    );

    fireEvent.click(screen.getByTestId('expected-element'));

    expect(onCloseFunc).toHaveBeenCalled();
  });
});

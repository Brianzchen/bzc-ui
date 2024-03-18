// flow
import * as React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import ClickAwayListener from '.';

describe('<ClickAwayListener />', () => {
  it('renders the children', () => {
    const Child = React.forwardRef(() => <span data-testid="test" />);
    render(
      <ClickAwayListener>
        <Child />
      </ClickAwayListener>,
    );

    expect(screen.getByTestId('test')).toBeDefined();
  });

  it('calls when clicking outside the element', () => {
    const handleClickAway = jest.fn();
    const { container } = render(
      <ClickAwayListener onClickAway={handleClickAway}>
        <span />
      </ClickAwayListener>,
    );

    fireEvent.mouseUp(container);

    expect(handleClickAway).toHaveBeenCalled();
  });

  it('calls when clicking outside the element when inner element has a ref', () => {
    const handleClickAway = jest.fn();
    const ref = React.createRef();
    const { container } = render(
      <ClickAwayListener onClickAway={handleClickAway}>
        <span ref={ref} />
      </ClickAwayListener>,
    );

    fireEvent.mouseUp(container);

    expect(handleClickAway).toHaveBeenCalled();
  });

  it('does not call when clicking child element', () => {
    const handleClickAway = jest.fn();
    render(
      <ClickAwayListener onClickAway={handleClickAway}>
        <span data-testid="inside" />
      </ClickAwayListener>,
    );

    fireEvent.mouseUp(screen.getByTestId('inside'));

    expect(handleClickAway).not.toHaveBeenCalled();
  });

  it('can handle children having ref', () => {
    const Comp = () => {
      const ref = React.useRef();

      React.useEffect(() => {
        expect(ref.current).not.toBeNull();
      }, []);

      return (
        <ClickAwayListener>
          <div ref={ref} />
        </ClickAwayListener>
      );
    };

    render(<Comp />);
  });
});

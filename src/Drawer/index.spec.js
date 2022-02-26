// @flow
import React from 'react';
import { lorem } from '@faker-js/faker';
import { render, fireEvent, screen } from '@testing-library/react';

import Drawer from '.';

describe('<Drawer />', () => {
  it('passes random props into component', () => {
    const props = {
      [lorem.word()]: lorem.sentence(),
      [lorem.word()]: lorem.sentence(),
      [lorem.word()]: lorem.sentence(),
    };

    render(<Drawer data-testid="test" {...props} />);

    Object.keys(props).forEach((key) => {
      expect(screen.getByTestId('test').getAttribute(key)).toBe(props[key]);
    });
  });

  it('triggers the onClose function if I click away from the drawer', () => {
    const onClose = jest.fn();
    render(
      <>
        <button type="button" data-testid="clicker">
          click..
        </button>
        <Drawer
          title="test"
          onClose={onClose}
        >
          test
        </Drawer>
      </>,
    );

    fireEvent.mouseUp(screen.getByTestId('clicker'));
    expect(onClose).toHaveBeenCalled();
  });

  it('renders drawer if it is open', () => {
    render(
      <Drawer
        data-testid="test"
        title="test"
        open
      >
        test
      </Drawer>,
    );

    expect(screen.getByTestId('test')).toBeDefined();
  });

  it('does not render drawer unless it is open', () => {
    render(
      <Drawer
        data-testid="test"
        title="test"
        open={false}
      >
        test
      </Drawer>,
    );

    expect(screen.queryByTestId('test')).toBe(null);
  });

  it('does not close if a user is clicking on the drawer', () => {
    const onClose = jest.fn();
    render(
      <>
        <button type="button" data-testid="clicker">
          click..
        </button>
        <Drawer
          title="test"
          onClose={onClose}
        >
          test
        </Drawer>
      </>,
    );

    fireEvent.mouseUp(screen.getByText('test'));
    expect(onClose).not.toHaveBeenCalled();
  });
});

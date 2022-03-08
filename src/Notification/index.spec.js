// @flow
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { lorem } from '@faker-js/faker';

import Notification from '.';

describe('<Notification />', () => {
  it('renders the child', () => {
    const expectedText = lorem.sentence();
    const expectedChild = <div>{expectedText}</div>;

    render(
      <Notification data-testid="test">
        {expectedChild}
      </Notification>,
    );

    expect(screen.getByTestId('test').textContent).toBe(expectedText);
  });

  it('does not render close button by default', () => {
    render(
      <Notification>
        test
      </Notification>,
    );

    expect(screen.queryByTestId('sf-notification-close-button')).toBe(null);
  });

  it('renders close button when passing in onClose', () => {
    const onClose = jest.fn();
    render(
      <Notification
        onClose={onClose}
      >
        test
      </Notification>,
    );

    fireEvent.click(screen.getByTestId('sf-notification-close-button'));

    expect(onClose).toHaveBeenCalled();
  });
});

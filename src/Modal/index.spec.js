// @flow
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { lorem } from '@faker-js/faker';

import { Modal } from '..';

describe('Modal />', () => {
  it('does not render the header if title is not passed in', () => {
    render(
      <Modal>
        test
      </Modal>,
    );

    expect(screen.queryByTestId('st-modal-title')).toBe(null);
  });

  it('renders the header if the title is provided', () => {
    render(
      <Modal
        title="test"
      >
        test
      </Modal>,
    );

    expect(screen.queryByTestId('st-modal-title')).not.toBe(null);
  });

  it('does not error if background if clicked without onClose', () => {
    render(
      <Modal
        title="test"
      >
        test
      </Modal>,
    );

    fireEvent.click(screen.getByTestId('st-modal-overlay'));

    expect(screen.getByTestId('st-modal-title')).not.toBe(null);
  });

  it('triggers the onClose function if I click on the background', () => {
    const onClose: () => void = jest.fn();

    render(
      <Modal
        title="test"
        onClose={onClose}
      >
        test
      </Modal>,
    );

    fireEvent.click(screen.getByTestId('st-modal-overlay'));

    expect(onClose).toHaveBeenCalled();
  });

  it('triggers the onClose if the click on the close button', () => {
    const onClose: () => void = jest.fn();

    render(
      <Modal
        title="test"
        onClose={onClose}
      >
        test
      </Modal>,
    );

    fireEvent.click(screen.getByTestId('st-modal-close-button'));

    expect(onClose).toHaveBeenCalled();
  });

  it('does not render the close button if no closing function passed in', () => {
    render(
      <Modal
        title="test"
      >
        test
      </Modal>,
    );

    expect(screen.queryByTestId('st-modal-close-button')).toBe(null);
  });

  it('renders the notification if notificationText is passed in', () => {
    const notificationText = lorem.sentence();
    render(
      <Modal
        notificationText={notificationText}
      >
        test
      </Modal>,
    );

    expect(screen.getByTestId('st-modal-notification').textContent).toBe(notificationText);
  });

  it('does not render the notification if I pass in other notification related props', () => {
    render(
      <Modal
        notificationStyle={{ test: 'hi' }}
        notificationVariant="error"
      >
        test
      </Modal>,
    );

    expect(screen.queryByTestId('st-modal-notification')).toBe(null);
  });
});

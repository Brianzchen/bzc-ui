// @flow
import React from 'react';
import { render, screen } from '@testing-library/react';

import Provider from '../Provider';

import RadioButton from '.';

describe('<RadioButton />', () => {
  const props = {
    id: 'test',
    onChange: jest.fn(),
  };

  it('has radio input nested inside the label', () => {
    render(
      <RadioButton
        rootTestId="rootTestId"
        data-testid="test"
        {...props}
      />,
    );

    expect(screen.getByTestId('rootTestId').tagName).toBe('LABEL');
    expect(screen.getByTestId('test').tagName).toBe('INPUT');
  });

  it('applies the id prop appropriately', () => {
    render(
      <RadioButton
        rootTestId="rootTestId"
        data-testid="test"
        {...props}
      />,
    );

    expect(screen.getByTestId('rootTestId').htmlFor).toBe(props.id);
    expect(screen.getByTestId('test').getAttribute('id')).toBe(props.id);
  });

  it('does not render focus if provider disables it', () => {
    render(
      <Provider
        focusEffect={false}
      >
        <RadioButton {...props} />
      </Provider>,
    );

    expect(screen.queryByTestId('st-radio-button-focus-effect')).toBe(null);
  });

  it('renders focus element by default', () => {
    render(<RadioButton {...props} />);

    expect(screen.getByTestId('st-radio-button-focus-effect').length).not.toBe(null);
  });
});

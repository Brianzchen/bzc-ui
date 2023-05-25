// @flow
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { lorem } from '@faker-js/faker';

import Provider from '../Provider';

import Checkbox from '.';

describe('<Checkbox />', () => {
  it('triggers onChange when I click on the box', () => {
    const onChange: () => void = jest.fn();

    render(
      <Checkbox
        onChange={onChange}
      />,
    );

    fireEvent.click(screen.getByTestId('bzc-checkbox-input'));

    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('does not trigger when I click on the box if disabled', () => {
    const onChange: () => void = jest.fn();

    render(
      <Checkbox
        onChange={onChange}
        disabled
      />,
    );

    fireEvent.click(screen.getByTestId('bzc-checkbox-input'));

    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders the children inside the text location', () => {
    const expectedText = lorem.word();
    const ExpectedComponent = () => <div>{expectedText}</div>;

    render(
      <Checkbox>
        <ExpectedComponent />
      </Checkbox>,
    );

    expect(screen.getByTestId('bzc-checkbox-clickable').textContent).toBe(expectedText);
  });

  it('renders the metadata', () => {
    const expectedText = lorem.word();
    const ExpectedComponent = () => <div>{expectedText}</div>;

    render(
      <Checkbox
        metadata={<ExpectedComponent />}
        errorMessage="not this"
      />,
    );

    expect(screen.getByTestId('bzc-checkbox-metadata').textContent).toBe(expectedText);
  });

  it('renders the errorText', () => {
    const expectedText = lorem.word();
    const ExpectedComponent = () => <div>{expectedText}</div>;

    render(
      <Checkbox
        metadata="not this"
        errorMessage={<ExpectedComponent />}
      />,
    );

    expect(screen.getByTestId('bzc-checkbox-error-message').textContent).toBe(expectedText);
  });

  it('is selected when value is true', () => {
    render(
      <Checkbox
        data-testid="root"
        value
      />,
    );

    expect(screen.getByTestId('root').getAttribute('is-selected')).toBe('true');
  });

  it('is not selected when value is false', () => {
    render(<Checkbox data-testid="root" />);

    expect(screen.getByTestId('root').getAttribute('is-selected')).toBe('false');
  });

  it('does not render focus if provider disables it', () => {
    render(
      <Provider
        focusEffect={false}
      >
        <Checkbox />
      </Provider>,
    );

    expect(screen.queryByTestId('bzc-checkbox-focus-effect')).toBe(null);
  });

  it('renders focus element by default', () => {
    render(<Checkbox />);

    expect(screen.getByTestId('bzc-checkbox-focus-effect')).not.toBe(null);
  });

  it('overrides the prefix testid correctly', () => {
    const onChange: () => void = jest.fn();

    render(
      <Checkbox
        onChange={onChange}
        prefixTestId="testing"
      />,
    );

    fireEvent.click(screen.getByTestId('bzc-testing-input'));

    expect(onChange).toHaveBeenCalled();
  });

  it('fires onTouched on first click', () => {
    const onTouched: () => void = jest.fn();

    render(
      <Checkbox
        onTouched={onTouched}
      />,
    );

    fireEvent.click(screen.getByTestId('bzc-checkbox-input'));
    fireEvent.click(screen.getByTestId('bzc-checkbox-input'));

    expect(onTouched).toHaveBeenCalledTimes(1);
  });
});

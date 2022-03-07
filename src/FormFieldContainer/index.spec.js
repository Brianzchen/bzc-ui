// @flow
import React from 'react';
import { render, screen } from '@testing-library/react';
import { lorem } from '@faker-js/faker';

import FormFieldContainer from '.';

describe('<FormFieldContainer />', () => {
  it('renders the error message if passed in', () => {
    const expectedErrorText = lorem.sentence();
    render(
      <FormFieldContainer
        data-testid="test"
        errorMessage={expectedErrorText}
      />,
    );

    expect(screen.getByTestId('test').textContent).toBe(expectedErrorText);
  });

  it('renders children passed in', () => {
    const expectedText = lorem.word();
    const ExpectedComp = () => <div>{expectedText}</div>;

    render(
      <FormFieldContainer data-testid="test">
        <ExpectedComp />
      </FormFieldContainer>,
    );

    expect(screen.getByTestId('test').textContent).toBe(expectedText);
  });

  it('passes other random props into the root element', () => {
    const props = {
      [lorem.word()]: lorem.sentence(),
      [lorem.word()]: lorem.sentence(),
      [lorem.word()]: lorem.sentence(),
    };

    render(<FormFieldContainer data-testid="test" {...props} />);

    Object.keys(props).forEach((key) => {
      expect(screen.getByTestId('test').getAttribute(key)).toBe(props[key]);
    });
  });

  it('renders label if passed in', () => {
    const title = lorem.sentence();

    render(<FormFieldContainer title={title} />);

    expect(screen.getByTestId('sf-form-field-container-title').textContent).toBe(title);
  });

  it('renders the sub label if passed in', () => {
    const subLabel = lorem.sentence();

    render(<FormFieldContainer subLabel={subLabel} />);

    expect(screen.getByTestId('sf-form-field-container-sublabel').textContent).toBe(subLabel);
  });

  it('renders the label and sub label in the right order', () => {
    const title = lorem.sentence();
    const subLabel = lorem.sentence();

    render(
      <FormFieldContainer
        title={title}
        subLabel={subLabel}
      />,
    );

    expect(screen.getByTestId('sf-form-field-container-title').textContent).toBe(title);
    expect(screen.getByTestId('sf-form-field-container-sublabel').textContent).toBe(subLabel);
  });

  it('does not render optional label by default', () => {
    render(
      <FormFieldContainer
        title="test"
      />,
    );

    expect(screen.queryByTestId('sf-form-field-container-optional-label')).toBe(null);
  });

  it('renders optional label only if optional is passed', () => {
    render(
      <FormFieldContainer
        title="test"
        optional
      />,
    );

    expect(screen.getByTestId('sf-form-field-container-optional-label').textContent).toBe('(Optional)');
  });

  it('does not render optional label if there is no title', () => {
    render(
      <FormFieldContainer
        optional
      />,
    );

    expect(screen.queryByTestId('sf-form-field-container-optional-label')).toBe(null);
  });

  it('renders no error state by default', () => {
    render(
      <FormFieldContainer
        data-testid="container"
      />,
    );

    expect(screen.getByTestId('container').getAttribute('is-error')).toBe('false');
  });

  it('renders error when error message is passed in', () => {
    render(
      <FormFieldContainer
        data-testid="container"
        errorMessage="error"
      />,
    );

    expect(screen.getByTestId('container').getAttribute('is-error')).toBe('true');
  });

  it('renders error when error is passed in', () => {
    render(
      <FormFieldContainer
        data-testid="container"
        error
      />,
    );

    expect(screen.getByTestId('container').getAttribute('is-error')).toBe('true');
  });
});

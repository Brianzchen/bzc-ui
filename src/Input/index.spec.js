// @flow
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import {
  Form,
  FormSpy,
  Input,
  Typography,
} from '..';

describe('<Input />', () => {
  it('renders only input field as child if no prefix node passed', () => {
    render(<Input rootTestId="test" />);

    expect(screen.getByTestId('test').childNodes[0].childNodes[0] instanceof HTMLInputElement).toBe(true);
  });

  it('renders the prefix node before the input field', () => {
    const Node = () => <div />;
    const { container } = render(
      <Input
        prefixNode={<Node />}
      />,
    );

    const eleArray = container.childNodes[0].childNodes[0].childNodes;

    expect(eleArray[0] instanceof HTMLDivElement).toBe(true);
    expect(eleArray[1] instanceof HTMLInputElement).toBe(true);
  });

  it('renders the suffix node after the input field', () => {
    const Node = () => <div />;
    const { container } = render(
      <Input
        suffixNode={<Node />}
      />,
    );

    const eleArray = container.childNodes[0].childNodes[0].childNodes;

    expect(eleArray[0] instanceof HTMLInputElement).toBe(true);
    expect(eleArray[1] instanceof HTMLDivElement).toBe(true);
  });

  it('renders auto generated id when title is passed', () => {
    render(
      <Input title="test" data-testid="my-input-field" />,
    );

    expect(screen.getByTestId('my-input-field').getAttribute('id')).toBe('input-test');
    expect(screen.getByTestId('bzc-form-field-container-title').getAttribute('for')).toBe('input-test');
  });

  it('renders id when there is no title', () => {
    render(
      <Input id="test" data-testid="my-input-field" />,
    );

    expect(screen.getByTestId('my-input-field').getAttribute('id')).toBe('test');
  });

  it('uses id over title for input id when both are passed in', () => {
    render(
      <Input title="test" id="test-id" data-testid="my-input-field" />,
    );

    expect(screen.getByTestId('my-input-field').getAttribute('id')).toBe('test-id');
    expect(screen.getByTestId('bzc-form-field-container-title').getAttribute('for')).toBe('test-id');
  });

  it('does not stack overflow if a component is passed into the error message when wrapped in a FormSpy', () => {
    render(
      <Form>
        <FormSpy>
          {(values) => (
            <Input
              data-testid="test-input"
              name="firstName"
              value={values.firstName?.value ?? ''}
              errorBlurred={(value) => value.length > 1}
              errorMessage={(
                <Typography data-testid="error-message">
                  It should not die
                </Typography>
              )}
            />
          )}
        </FormSpy>
      </Form>,
    );

    fireEvent.change(screen.getByTestId('test-input'), { target: { value: '123' } });
    fireEvent.blur(screen.getByTestId('test-input'));

    expect(screen.getByTestId('error-message').textContent).toBe('It should not die');
  });

  it('sets aria-required to the label by default', () => {
    render(
      <Input
        data-testid="test"
      />,
    );

    expect(screen.getByTestId('test').getAttribute('aria-required')).toBe('true');
  });

  it('sets the aria-label appropriately when optional is passed', () => {
    render(
      <Input
        data-testid="test"
        optional
      />,
    );

    expect(screen.getByTestId('test').getAttribute('aria-required')).toBe('false');
  });
});

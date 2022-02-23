// @flow
import React from 'react';
import { render, screen } from '@testing-library/react';
import { lorem } from '@faker-js/faker';

import Box from '.';

describe('<Box />', () => {
  const originalError = console.error;

  beforeEach(() => {
    // $FlowExpectedError[cannot-write]
    console.error = jest.fn();
  });

  afterEach(() => {
    // $FlowExpectedError[cannot-write]
    console.error = originalError;
  });

  it('renders the child', () => {
    const expectedText = lorem.sentence();
    const ExpectedElement = () => <div>{expectedText}</div>;

    render(<Box data-testid="test"><ExpectedElement /></Box>);

    expect(screen.getByTestId('test').textContent).toBe(expectedText);
  });

  it('renders a different html tag when passed in', () => {
    const expectedTag = 'a';
    render(
      <Box
        data-testid="test"
        as={expectedTag}
      >
        test
      </Box>,
    );

    expect(screen.getByTestId('test').tagName).toBe('A');
  });

  it('flow throws error on non-existent theme value', (done) => {
    try {
      render(
        <Box
          style={(theme) => ({
            // $FlowExpectedError[prop-missing] testing theme in function is defined
            test: theme.random(),
          })}
        />,
      );
    } catch (e) {
      expect(true).toBe(true);
      done();
    }
  });
});

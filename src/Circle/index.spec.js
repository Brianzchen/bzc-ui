// @flow
import React from 'react';
import { render, screen } from '@testing-library/react';
import { lorem } from '@faker-js/faker';

import Circle from '.';

describe('<Circle />', () => {
  it('renders a child', () => {
    const expectedText = lorem.sentence();
    const ExpectedElement = () => <div>{expectedText}</div>;

    render(
      <Circle size="34px" data-testid="test">
        <ExpectedElement />
      </Circle>,
    );

    expect(screen.getByTestId('test').textContent).toBe(expectedText);
  });

  it('passes random props into circle', () => {
    const props = {
      [lorem.word()]: lorem.sentence(),
      [lorem.word()]: lorem.sentence(),
      [lorem.word()]: lorem.sentence(),
    };

    render(
      <Circle
        data-testid="test"
        {...props}
        size="34px"
      />,
    );

    Object.keys(props).forEach((key) => {
      expect(screen.getByTestId('test').getAttribute(key)).toBe(props[key]);
    });
  });

  it('renders the a string as the child', () => {
    const expectedText = 'hi there';

    render(
      <Circle data-testid="test" size="34px">
        {expectedText}
      </Circle>,
    );

    expect(screen.getByTestId('test').textContent).toBe(expectedText);
  });
});

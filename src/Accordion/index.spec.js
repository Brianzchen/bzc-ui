// @flow
import React from 'react';
import { screen, render } from '@testing-library/react';
import { lorem } from '@faker-js/faker';

import Accordion from '.';

describe('<Accordion />', () => {
  it('passes random props into component', () => {
    const props = {
      [lorem.word()]: lorem.sentence(),
      [lorem.word()]: lorem.sentence(),
      [lorem.word()]: lorem.sentence(),
    };

    render(<Accordion data-testid="test" {...props} />);

    Object.keys(props).forEach((key) => {
      expect(screen.getByTestId('test').getAttribute(key)).toBe(props[key]);
    });
  });

  it('renders the child', () => {
    render(
      <Accordion>
        <div data-testid="test">
          test
        </div>
      </Accordion>,
    );

    expect(screen.getByTestId('test').textContent).toBe('test');
  });

  it('when children and render if passed, render if prioritized', () => {
    render(
      <Accordion
        render={() => (
          <div data-testid="render">
            test
          </div>
        )}
      >
        <div data-testid="children">
          test
        </div>
      </Accordion>,
    );

    expect(screen.getByTestId('children').textContent).toBe('test');
    expect(screen.queryByTestId('render')).toBe(null);
  });

  it('renders the render func', () => {
    render(
      <Accordion
        render={() => (
          <div data-testid="test">
            test
          </div>
        )}
      />,
    );

    expect(screen.getByTestId('test').textContent).toBe('test');
  });
});

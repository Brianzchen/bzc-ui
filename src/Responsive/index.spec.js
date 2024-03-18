// @flow
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { lorem } from '@faker-js/faker';

import Responsive from '.';

describe('<Responsive />', () => {
  it('passes random props into element', () => {
    const props = {
      [lorem.word()]: lorem.sentence(),
      [lorem.word()]: lorem.sentence(),
      [lorem.word()]: lorem.sentence(),
    };

    render(<Responsive data-testid="test" {...props} />);

    Object.keys(props).forEach((key) => {
      expect(screen.getByTestId('test').getAttribute(key)).toBe(props[key]);
    });
  });

  it('renders the child', () => {
    render(
      <Responsive>
        {() => (<div data-testid="content">test</div>)}
      </Responsive>,
    );

    expect(screen.getByTestId('content').textContent).toBe('test');
  });
});

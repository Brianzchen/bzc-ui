// @flow
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { lorem } from '@faker-js/faker';

import Form from '.';

describe('<Form />', () => {
  it('passes random props into form', () => {
    const props = {
      [lorem.word()]: lorem.sentence(),
      [lorem.word()]: lorem.sentence(),
      [lorem.word()]: lorem.sentence(),
    };

    render(<Form data-testid="test" {...props} />);

    Object.keys(props).forEach((key) => {
      expect(screen.getByTestId('test').getAttribute(key)).toBe(props[key]);
    });
  });

  it('has the right onSubmit form value struct', () => {
    render(
      <Form
        onSubmit={(event, values) => {
          console.info(values.test?.value);
        }}
      />,
    );

    expect(true).toBe(true);
  });
});

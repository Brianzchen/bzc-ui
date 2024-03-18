// @flow
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { lorem } from '@faker-js/faker';

import ScrollLoadingListener from '.';

describe('<ScrollLoadingListener />', () => {
  it('passes random props into element', () => {
    const props = {
      [lorem.word()]: lorem.sentence(),
      [lorem.word()]: lorem.sentence(),
      [lorem.word()]: lorem.sentence(),
    };

    render(<ScrollLoadingListener data-testid="test" {...props} />);

    Object.keys(props).forEach((key) => {
      expect(screen.getByTestId('test').getAttribute(key)).toBe(props[key]);
    });
  });
});

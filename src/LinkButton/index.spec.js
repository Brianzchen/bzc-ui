// @flow
import * as React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import LinkButton from '.';

describe('<LinkButton />', () => {
  it('triggers onClick', () => {
    const func: () => void = jest.fn();
    render(
      <LinkButton data-testid="button" onClick={func}>
        test
      </LinkButton>,
    );

    fireEvent.click(screen.getByTestId('button'));

    expect(func).toHaveBeenCalled();
  });
});

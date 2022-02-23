// @flow
import React from 'react';
import { render, screen } from '@testing-library/react';

import colors from '../theme/colors/default';

import useTheme from '.';

describe('useTheme', () => {
  it('renders the primary context color inside', () => {
    const Comp = () => {
      const theme = useTheme();

      return (
        <div data-testid="test">
          {theme.colors.primary()}
        </div>
      );
    };

    render(<Comp />);

    expect(screen.getByTestId('test').textContent).toBe(colors.primary);
  });
});

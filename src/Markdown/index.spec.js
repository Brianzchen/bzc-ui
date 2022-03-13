// @flow
import * as React from 'react';
import { render, screen } from '@testing-library/react';

import Markdown from '.';

describe('<Markdown />', () => {
  it('will not crash if nothing is passed in', () => {
    render(<Markdown />);

    expect(true).toBe(true);
  });

  it('renders heading 1 when there is #', () => {
    const content = '# Hello there';
    render(<Markdown content={content} />);

    expect(screen.getByTestId('sf-markdown-heading-1').textContent).toBe('Hello there');
  });
});

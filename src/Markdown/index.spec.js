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
    expect(screen.getByTestId('sf-markdown-heading-1').tagName).toBe('H1');
  });

  it('renders heading 2 when there is ##', () => {
    const content = '## Hello there';
    render(<Markdown content={content} />);

    expect(screen.getByTestId('sf-markdown-heading-2').textContent).toBe('Hello there');
    expect(screen.getByTestId('sf-markdown-heading-2').tagName).toBe('H2');
  });

  it('renders heading 3 when there is ###', () => {
    const content = '### Hello there';
    render(<Markdown content={content} />);

    expect(screen.getByTestId('sf-markdown-heading-3').textContent).toBe('Hello there');
    expect(screen.getByTestId('sf-markdown-heading-3').tagName).toBe('H3');
  });
});

// @flow
import React from 'react';
import { render, screen } from '@testing-library/react';
import { lorem } from '@faker-js/faker';

import BaseButton from '../BaseButton';
import Provider from '../Provider';

import Anchor from '.';

describe('<Anchor />', () => {
  it('renders the child', () => {
    const expectedText = lorem.sentence();
    const ExpectedElement = () => <div data-testid="inner-node">{expectedText}</div>;

    render(<Anchor data-testid="test"><ExpectedElement /></Anchor>);

    expect(screen.getByTestId('test').textContent).toBe(expectedText);
    expect(screen.getByTestId('inner-node').tagName).toBe('DIV');
  });

  it('accepts all the props passed in', () => {
    const props = {
      [lorem.word()]: lorem.sentence(),
      [lorem.word()]: lorem.sentence(),
      [lorem.word()]: lorem.sentence(),
    };

    render(<Anchor data-testid="test" {...props} />);

    Object.keys(props).forEach((key) => {
      expect(screen.getByTestId('test').getAttribute(key)).toBe(props[key]);
    });
  });

  it('renders a different html tag when passed in', () => {
    const expectedTag = BaseButton;
    render(
      <Anchor
        data-testid="test"
        as={expectedTag}
      >
        test
      </Anchor>,
    );

    expect(screen.getByTestId('test').tagName).toBe('BUTTON');
  });

  it('defines appropriate attributes when opening new tab', () => {
    render(<Anchor data-testid="test" newTab />);

    expect(screen.getByTestId('test').getAttribute('target')).toBe('_blank');
    expect(screen.getByTestId('test').getAttribute('rel')).toBe('noreferrer noopener');
  });

  it('does not have new tab attributes by default', () => {
    render(<Anchor data-testid="test" />);

    expect(screen.getByTestId('test').getAttribute('target')).toBe(null);
    expect(screen.getByTestId('test').getAttribute('rel')).toBe(null);
  });

  it('overrides the target and rel on top of newTab prop', () => {
    const target = lorem.sentence();
    const rel = lorem.sentence();
    render(
      <Anchor
        data-testid="test"
        newTab
        target={target}
        rel={rel}
      />,
    );

    expect(screen.getByTestId('test').getAttribute('target')).toBe(target);
    expect(screen.getByTestId('test').getAttribute('rel')).toBe(rel);
  });

  it('render anchorAs from provider', () => {
    const text = lorem.sentence();
    render(
      <Provider anchorAs={BaseButton}>
        <Anchor data-testid="test" newTab>
          {text}
        </Anchor>
      </Provider>,
    );

    expect(screen.getByTestId('test').tagName).toBe('BUTTON');
    expect(screen.getByTestId('test').getAttribute('target')).toBe('_blank');
    expect(screen.getByTestId('test').getAttribute('rel')).toBe('noreferrer noopener');
  });

  it('renders override as prop even if anchorAs is provided', () => {
    const text = lorem.sentence();
    render(
      <Provider anchorAs={BaseButton}>
        <Anchor data-testid="test" newTab as="section">
          {text}
        </Anchor>
      </Provider>,
    );

    expect(screen.getByTestId('test').tagName).toBe('SECTION');
    expect(screen.getByTestId('test').getAttribute('target')).toBe('_blank');
    expect(screen.getByTestId('test').getAttribute('rel')).toBe('noreferrer noopener');
  });

  it('renders override back to a tag even if anchorAs is provided', () => {
    const text = lorem.sentence();
    render(
      <Provider anchorAs={BaseButton}>
        <Anchor data-testid="test" newTab as="a">
          {text}
        </Anchor>
      </Provider>,
    );

    expect(screen.getByTestId('test').tagName).toBe('A');
    expect(screen.getByTestId('test').getAttribute('target')).toBe('_blank');
    expect(screen.getByTestId('test').getAttribute('rel')).toBe('noreferrer noopener');
  });
});

// @flow
import React from 'react';
import { render, screen } from '@testing-library/react';
import { lorem } from '@faker-js/faker';

import { Provider } from '..';
import Icon from '.';

describe('<Icon />', () => {
  it('passes random props into icon', () => {
    const props = {
      [lorem.word()]: lorem.sentence(),
      [lorem.word()]: lorem.sentence(),
      [lorem.word()]: lorem.sentence(),
    };

    render(
      <Icon
        data-testid="test"
        {...props}
      />,
    );

    Object.keys(props).forEach((key) => {
      expect(screen.getByTestId('test').getAttribute(key)).toBe(props[key]);
    });
  });

  it('does not render icon if the icon prop has not been set', () => {
    render(
      <Icon data-testid="test" />,
    );

    expect(screen.getByTestId('test').className.includes('icon-')).toEqual(false);
  });

  it('uses the provider icon prefix when available', () => {
    render(
      <Provider iconPrefix="foo">
        <Icon data-testid="test" icon="bar" />
      </Provider>,
    );

    expect(screen.getByTestId('test').className.includes('foo-bar')).toEqual(true);
  });

  it('adds the provider icon base when available', () => {
    render(
      <Provider iconPrefix="foo" iconBase="foo">
        <Icon data-testid="test" icon="bar" />
      </Provider>,
    );

    expect(screen.getByTestId('test').className.includes('foo-bar foo')).toEqual(true);
  });

  it('renders icon into icon class if icon prop is not empty', () => {
    const fakeIcon = lorem.word();

    render(
      <Icon
        data-testid="test"
        icon={fakeIcon}
      />,
    );

    expect(screen.getByTestId('test').tagName).toBe('I');
    expect(screen.getByTestId('test').className.includes(`icon-${fakeIcon}`)).toEqual(true);
  });

  it('renders classname into icon class if className prop is not empty', () => {
    const fakeClassName = lorem.word();

    render(
      <Icon
        data-testid="test"
        className={fakeClassName}
      />,
    );

    expect(screen.getByTestId('test').tagName).toBe('I');
    expect(screen.getByTestId('test').className.includes(fakeClassName)).toEqual(true);
  });

  it('does not render anymore icons when no extra have been defined', () => {
    render(
      <Icon
        data-testid="test"
        icon="test"
      />,
    );

    expect(screen.getByTestId('test').tagName).toBe('I');
  });

  it('renders the background icon', () => {
    render(
      <Icon
        data-testid="test"
        icon="test"
        backgroundIcon="background"
      />,
    );

    expect(screen.getByTestId('test'));
    expect(screen.getByTestId('st-icon-background-icon'));
    expect(screen.queryByTestId('st-icon-foreground-icon')).toBe(null);
  });

  it('renders the foreground icon', () => {
    render(
      <Icon
        data-testid="test"
        icon="test"
        foregroundIcon="foreground"
      />,
    );

    expect(screen.getByTestId('test'));
    expect(screen.getByTestId('st-icon-foreground-icon'));
    expect(screen.queryByTestId('st-icon-background-icon')).toBe(null);
  });

  it('generates with displayName', () => {
    expect(Icon.displayName).toBe('Icon');
  });

  it('does not render button element without withButton', () => {
    render(
      <Icon
        data-testid="test"
        icon="tab"
      />,
    );

    expect(screen.getByTestId('test').tagName).not.toBe('BUTTON');
  });

  it('renders base button withButton', () => {
    render(
      <Icon
        data-testid="test"
        icon="tab"
        withButton
      />,
    );

    expect(screen.getByTestId('test').tagName).toBe('BUTTON');
  });

  it('throws warning if onClick used inappropriately', () => {
    const originalWarn = console.warn;
    (console: any).warn = jest.fn();

    render(
      <Icon
        onClick={() => {}}
      />,
    );

    expect(console.warn).toHaveBeenCalled();

    (console: any).warn = originalWarn;
  });

  it('does not throw warning if onClick is used with withButton', () => {
    const originalWarn = console.warn;
    (console: any).warn = jest.fn();

    render(
      <Icon
        onClick={() => {}}
        withButton
      />,
    );

    expect(console.warn).not.toHaveBeenCalled();

    (console: any).warn = originalWarn;
  });
});

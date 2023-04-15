// @flow
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { lorem } from '@faker-js/faker';

import Tabs from '.';

describe('<Tabs />', () => {
  it('renders the amount of tabs passed in', () => {
    const tabs = [
      {
        value: lorem.word(),
      },
      {
        value: lorem.word(),
      },
      {
        value: lorem.word(),
      },
    ];

    render(
      <Tabs
        tabs={tabs}
      />,
    );

    expect(screen.getAllByTestId('st-tabs-tab').length).toBe(tabs.length);
  });

  it('triggers the onClick when clicking on a non-selected tab', () => {
    const tabs = [
      {
        value: lorem.word(),
        onClick: (jest.fn(): () => void),
        selected: false,
        'data-testid': 'test-tab',
      },
    ];

    render(
      <Tabs
        tabs={tabs}
      />,
    );

    fireEvent.click(screen.getByTestId('test-tab'));

    expect(tabs[0].onClick).toHaveBeenCalled();
  });

  it('renders the value as the children when children is not defined in tabs obj', () => {
    const tabs = [
      {
        value: lorem.sentence(),
        onClick: (jest.fn(): () => void),
        selected: false,
        'data-testid': 'test-tab',
      },
    ];

    render(
      <Tabs
        tabs={tabs}
      />,
    );

    expect(screen.getByTestId('test-tab').textContent).toBe(tabs[0].value);
  });

  it('renders the children as the text when children is defined in tabs obj', () => {
    const tabs = [
      {
        value: 'not this',
        children: 'this',
        onClick: (jest.fn(): () => void),
        selected: false,
        'data-testid': 'test-tab',
      },
    ];

    render(
      <Tabs
        tabs={tabs}
      />,
    );

    expect(screen.getByTestId('test-tab').textContent).toBe(tabs[0].children);
    expect(screen.getByTestId('test-tab').textContent).not.toBe(tabs[0].value);
  });

  it('accepts extra props', () => {
    const props = {
      [lorem.word()]: lorem.sentence(),
      [lorem.word()]: lorem.sentence(),
      [lorem.word()]: lorem.sentence(),
    };
    render(<Tabs data-testid="test" {...props} />);

    Object.keys(props).forEach((key) => {
      expect(screen.getByTestId('test').getAttribute(key)).toBe(props[key]);
    });
  });
});

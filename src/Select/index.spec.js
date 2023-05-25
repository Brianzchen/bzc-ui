// @flow
import React from 'react';
import { render, screen } from '@testing-library/react';
import { lorem } from '@faker-js/faker';

import Select from '.';

describe('<Select />', () => {
  it('renders the error message if only is passed in', () => {
    const expectText = lorem.sentence();

    render(
      <Select
        errorMessage={expectText}
      />,
    );

    expect(screen.getByTestId('bzc-select-error').textContent).toBe(expectText);
  });

  it('renders auto generated id when title is passed', () => {
    render(
      <Select title="test" data-testid="my-select-field" />,
    );

    expect(screen.getByTestId('my-select-field').getAttribute('id')).toBe('select-test');
    expect(screen.getByTestId('bzc-select-title').getAttribute('for')).toBe('select-test');
  });

  it('renders id when there is no title', () => {
    render(
      <Select id="test" data-testid="my-select-field" />,
    );

    expect(screen.getByTestId('my-select-field').getAttribute('id')).toBe('test');
  });

  it('uses id over title for select id when both are passed in', () => {
    render(
      <Select title="test" id="test-id" data-testid="my-select-field" />,
    );

    expect(screen.getByTestId('my-select-field').getAttribute('id')).toBe('test-id');
    expect(screen.getByTestId('bzc-select-title').getAttribute('for')).toBe('test-id');
  });
});

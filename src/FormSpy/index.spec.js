// @flow
import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Form from '../Form';

import FormSpy from '.';

describe('<FormSpy />', () => {
  it('renders null if no children are passed', () => {
    render(
      <Form data-testid="test">
        <FormSpy />
      </Form>,
    );

    expect(screen.getByTestId('test').innerHTML).toBe('');
  });

  it('renders null if not wrapped in the Form component', () => {
    const originalLog = console.error;
    const mockLog = jest.fn();
    (console: any).error = mockLog;

    render(
      <FormSpy>
        {() => (
          <div data-testid="test" />
        )}
      </FormSpy>,
    );

    expect(screen.queryByTestId('test')).toBe(null);
    expect(mockLog).toHaveBeenCalledWith('`FormSpy` must be a child of the startown `Form` component');
    (console: any).error = originalLog;
  });

  it('renders it\'s children', () => {
    render(
      <Form>
        <FormSpy>
          {() => (
            <div data-testid="test" />
          )}
        </FormSpy>
      </Form>,
    );

    expect(screen.getByTestId('test').textContent).toBe('');
  });

  it('will rerender children if not subscribing', () => {
    const ClickableComp = ({ children }: {|
      children: (...args: Array<any>) => any,
    |}) => {
      const [value, setValue] = React.useState('');

      return (
        <div>
          <button
            data-testid="button"
            type="button"
            onClick={(() => {
              setValue('hello');
            })}
          >
            click
          </button>
          {children(value)}
        </div>
      );
    };

    render(
      <ClickableComp>
        {(value) => (
          <Form>
            <FormSpy>
              {() => (
                <div data-testid="test">
                  {value}
                </div>
              )}
            </FormSpy>
          </Form>
        )}
      </ClickableComp>,
    );

    expect(screen.getByTestId('test').textContent).toBe('');

    fireEvent.click(screen.getByTestId('button'));

    expect(screen.getByTestId('test').textContent).toBe('hello');
  });

  it('blocks outside rerenders when subscribing', () => {
    const ClickableComp = ({ children }: {|
      children: (...args: Array<any>) => any,
    |}) => {
      const [value, setValue] = React.useState('');

      return (
        <div>
          <button
            data-testid="button"
            type="button"
            onClick={(() => {
              setValue('hello');
            })}
          >
            click
          </button>
          {children(value)}
        </div>
      );
    };

    render(
      <ClickableComp>
        {(value) => (
          <Form>
            <FormSpy subscribers={['test']}>
              {() => (
                <div data-testid="test">
                  {value}
                </div>
              )}
            </FormSpy>
          </Form>
        )}
      </ClickableComp>,
    );

    expect(screen.getByTestId('test').textContent).toBe('');

    fireEvent.click(screen.getByTestId('button'));

    expect(screen.getByTestId('test').textContent).toBe('');
  });
});

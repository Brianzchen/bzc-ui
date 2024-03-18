// @flow
import * as React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import useGlobalStyles from '.';

describe('useGlobalStyles', () => {
  it('applies the class to the id tagged', () => {
    const Comp = () => {
      useGlobalStyles({
        '#my-test': {
          color: 'blue',
        },
      });

      return (
        <div id="my-test" data-testid="test">
          hello
        </div>
      );
    };

    render(<Comp />);

    expect(screen.getByTestId('test').getAttribute('id')).toBe('my-test');
    // hard coded it may change over time, but we just need to validate it applies
    expect(screen.getByTestId('test').getAttribute('class')).toBe('my-test_1tsdo2i');
  });

  it('cleans up the applies class when hook is removed', () => {
    const HookComp = () => {
      useGlobalStyles({
        '#my-test': {
          color: 'blue',
        },
      });

      return null;
    };

    const Comp = () => {
      const [apply, setApply] = React.useState(false);

      return (
        <>
          <button
            data-testid="button"
            type="button"
            onClick={() => {
              setApply((pApply) => !pApply);
            }}
          >
            button
          </button>
          <div id="my-test" data-testid="test">
            hello
          </div>
          {apply && <HookComp />}
        </>
      );
    };

    render(<Comp />);

    // Starts as null but after it's been applied before turns back to empty string
    expect(screen.getByTestId('test').getAttribute('class')).toBe(null);
    fireEvent.click(screen.getByTestId('button'));
    expect(screen.getByTestId('test').getAttribute('class')).toBe('my-test_1tsdo2i');
    fireEvent.click(screen.getByTestId('button'));
    expect(screen.getByTestId('test').getAttribute('class')).toBe('');
  });

  it('works on the first ', () => {
    const HookComp = () => {
      useGlobalStyles({
        body: {
          color: 'blue',
        },
      });

      return null;
    };

    const Comp = () => {
      const [apply, setApply] = React.useState(false);

      return (
        <>
          <button
            data-testid="button"
            type="button"
            onClick={() => {
              setApply((pApply) => !pApply);
            }}
          >
            button
          </button>
          {apply && <HookComp />}
        </>
      );
    };

    render(<Comp />);

    // Traverse upwards to find the body tag
    expect(screen.getByTestId('button').parentNode?.parentElement?.getAttribute('class')).toBe(null);
    fireEvent.click(screen.getByTestId('button'));
    expect(screen.getByTestId('button').parentNode?.parentElement?.getAttribute('class')).toBe('body_1tsdo2i');
    fireEvent.click(screen.getByTestId('button'));
    expect(screen.getByTestId('button').parentNode?.parentElement?.getAttribute('class')).toBe('');
  });

  it('works on the first element of a list of class elements', () => {
    const HookComp = () => {
      useGlobalStyles({
        '.my-test': {
          color: 'blue',
        },
      });

      return null;
    };

    const Comp = () => {
      const [apply, setApply] = React.useState(false);

      return (
        <>
          <button
            data-testid="button"
            type="button"
            onClick={() => {
              setApply((pApply) => !pApply);
            }}
          >
            button
          </button>
          <div className="my-test" data-testid="test">
            hello
          </div>
          <div className="my-test" data-testid="test2">
            hello
          </div>
          {apply && <HookComp />}
        </>
      );
    };

    render(<Comp />);

    expect(screen.getByTestId('test').getAttribute('class')).toBe('my-test');
    expect(screen.getByTestId('test2').getAttribute('class')).toBe('my-test');
    fireEvent.click(screen.getByTestId('button'));
    expect(screen.getByTestId('test').getAttribute('class')).toBe('my-test my-test_1tsdo2i');
    expect(screen.getByTestId('test2').getAttribute('class')).toBe('my-test');
    fireEvent.click(screen.getByTestId('button'));
    expect(screen.getByTestId('test').getAttribute('class')).toBe('my-test');
    expect(screen.getByTestId('test2').getAttribute('class')).toBe('my-test');
  });

  describe('with condition', () => {
    it('does not apply anything when false', () => {
      const Comp = () => {
        useGlobalStyles({
          '#my-test': {
            color: 'blue',
          },
        }, false);

        return (
          <div id="my-test" data-testid="test">
            hello
          </div>
        );
      };

      render(<Comp />);

      expect(screen.getByTestId('test').getAttribute('id')).toBe('my-test');
      expect(screen.getByTestId('test').getAttribute('class')).toBe(null);
    });

    it('applies styling when true', () => {
      const Comp = () => {
        useGlobalStyles({
          '#my-test': {
            color: 'blue',
          },
        }, true);

        return (
          <div id="my-test" data-testid="test">
            hello
          </div>
        );
      };

      render(<Comp />);

      expect(screen.getByTestId('test').getAttribute('id')).toBe('my-test');
      // hard coded it may change over time, but we just need to validate it applies
      expect(screen.getByTestId('test').getAttribute('class')).toBe('my-test_1tsdo2i');
    });
  });
});

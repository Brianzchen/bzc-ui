// @flow
import React, { useState } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import useTheme from '../useTheme';

import Provider from '.';

describe('<Provider />', () => {
  const onThemeChange = jest.fn();

  beforeEach(() => {
    onThemeChange.mockClear();
  });

  it('has focusEffect as true by default', (done) => {
    const Test = () => {
      const theme = useTheme();

      React.useEffect(() => {
        expect(theme.focusEffect).toBe(true);
        done();
      }, []);

      return null;
    };

    render(
      <Provider>
        <Test />
      </Provider>,
    );
  });

  describe('onThemeChange', () => {
    it('triggers on initial render', () => {
      render(
        <Provider
          onThemeChange={onThemeChange}
        >
          <div />
        </Provider>,
      );

      expect(onThemeChange).toHaveBeenCalled();
    });

    it('triggers when color is updated', () => {
      const StateComp = () => {
        const [isChanged, setChanged] = useState(false);

        const colors = {
          primary: '123',
        };

        return (
          <>
            <Provider
              colors={isChanged ? colors : undefined}
              onThemeChange={onThemeChange}
            >
              <div />
            </Provider>
            <div
              onClick={() => setChanged(!isChanged)}
              data-testid="button"
            >
              click
            </div>
          </>
        );
      };

      render(<StateComp />);
      onThemeChange.mockClear();
      expect(onThemeChange).not.toHaveBeenCalled();

      fireEvent.click(screen.getByTestId('button'));

      expect(onThemeChange).toHaveBeenCalled();
    });

    it('triggers when font is updated', () => {
      const StateComp = () => {
        const [isChanged, setChanged] = useState(false);

        const fonts = {
          heading1: {
            px: 20,
            style: 600,
            leading: '22px',
          },
        };

        return (
          <>
            <Provider
              fonts={isChanged ? fonts : undefined}
              onThemeChange={onThemeChange}
            >
              <div />
            </Provider>
            <div
              onClick={() => setChanged(!isChanged)}
              data-testid="button"
            >
              click
            </div>
          </>
        );
      };

      render(<StateComp />);
      onThemeChange.mockClear();
      expect(onThemeChange).not.toHaveBeenCalled();

      fireEvent.click(screen.getByTestId('button'));

      expect(onThemeChange).toHaveBeenCalled();
    });

    it('triggers when spacing is updated', () => {
      const StateComp = () => {
        const [isChanged, setChanged] = useState(false);

        const spacing = {
          '1': 4,
        };

        return (
          <>
            <Provider
              spacing={isChanged ? spacing : undefined}
              onThemeChange={onThemeChange}
            >
              <div />
            </Provider>
            <div
              onClick={() => setChanged(!isChanged)}
              data-testid="button"
            >
              click
            </div>
          </>
        );
      };

      render(<StateComp />);
      onThemeChange.mockClear();
      expect(onThemeChange).not.toHaveBeenCalled();

      fireEvent.click(screen.getByTestId('button'));

      expect(onThemeChange).toHaveBeenCalled();
    });

    it('triggers when tabletWidth is updated', () => {
      const StateComp = () => {
        const [isChanged, setChanged] = useState(false);

        const tabletWidth = 500;

        return (
          <>
            <Provider
              tabletWidth={isChanged ? tabletWidth : undefined}
              onThemeChange={onThemeChange}
            >
              <div />
            </Provider>
            <div
              onClick={() => setChanged(!isChanged)}
              data-testid="button"
            >
              click
            </div>
          </>
        );
      };

      render(<StateComp />);
      onThemeChange.mockClear();
      expect(onThemeChange).not.toHaveBeenCalled();

      fireEvent.click(screen.getByTestId('button'));

      expect(onThemeChange).toHaveBeenCalled();
    });

    it('triggers when mobileWidth is updated', () => {
      const StateComp = () => {
        const [isChanged, setChanged] = useState(false);

        const mobileWidth = 500;

        return (
          <>
            <Provider
              mobileWidth={isChanged ? mobileWidth : undefined}
              onThemeChange={onThemeChange}
            >
              <div />
            </Provider>
            <div
              onClick={() => setChanged(!isChanged)}
              data-testid="button"
            >
              click
            </div>
          </>
        );
      };

      render(<StateComp />);
      onThemeChange.mockClear();
      expect(onThemeChange).not.toHaveBeenCalled();

      fireEvent.click(screen.getByTestId('button'));

      expect(onThemeChange).toHaveBeenCalled();
    });

    it('does not trigger when random prop is updated', () => {
      const StateComp = () => {
        const [isChanged, setChanged] = useState(false);

        return (
          <>
            <Provider
              onThemeChange={onThemeChange}
            >
              <div
                translate={isChanged ? 'test' : 'test1'}
              />
            </Provider>
            <div
              onClick={() => setChanged(!isChanged)}
              data-testid="button"
            >
              click
            </div>
          </>
        );
      };

      render(<StateComp />);
      onThemeChange.mockClear();
      expect(onThemeChange).not.toHaveBeenCalled();

      fireEvent.click(screen.getByTestId('button'));

      expect(onThemeChange).not.toHaveBeenCalled();
    });

    it('does not trigger is parent causes Provider to rerender', () => {
      const StateComp = () => {
        const [isChanged, setChanged] = useState(false);

        return (
          <>
            <Provider
              onThemeChange={onThemeChange}
            >
              <div />
            </Provider>
            <div
              onClick={() => setChanged(!isChanged)}
              data-testid="button"
            >
              click
            </div>
          </>
        );
      };

      render(<StateComp />);
      onThemeChange.mockClear();
      expect(onThemeChange).not.toHaveBeenCalled();

      fireEvent.click(screen.getByTestId('button'));

      expect(onThemeChange).not.toHaveBeenCalled();
    });
  });
});

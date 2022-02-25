// @flow
import * as React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { lorem } from '@faker-js/faker';

import Typography from '../Typography';

import BaseInput from '.';

describe('<BaseInput />', () => {
  it('passes random props into input', () => {
    const props = {
      [lorem.word()]: lorem.sentence(),
      [lorem.word()]: lorem.sentence(),
      [lorem.word()]: lorem.sentence(),
    };

    render(<BaseInput data-testid="test" {...props} />);

    Object.keys(props).forEach((key) => {
      expect(screen.getByTestId('test').getAttribute(key)).toBe(props[key]);
    });
  });

  it('does not apply autofill attributes by default', () => {
    render(<BaseInput data-testid="test" />);

    expect(screen.getByTestId('test').getAttribute('readOnly')).toBe(null);
  });

  it('applies autofill attributes if enabled', () => {
    render(<BaseInput data-testid="test" disableAutofill />);

    expect(screen.getByTestId('test').getAttribute('readOnly')).toBe('');
  });

  it('allows props readonly to override disable autofill', () => {
    render(
      <BaseInput
        data-testid="test"
        disableAutofill
        readOnly={false}
      />,
    );

    expect(screen.getByTestId('test').getAttribute('readOnly')).toBe(null);
  });

  describe('pure-number', () => {
    const PureNumber = (): React.Node => {
      const [value, setValue] = React.useState('');
      const [value2, setValue2] = React.useState('');
      const [value3, setValue3] = React.useState('    ');
      const [value4, setValue4] = React.useState('$!@$');

      return (
        <>
          <Typography>
            Pure number input
          </Typography>
          <BaseInput
            data-testid="pure-number-input"
            value={value2}
            onChange={(e) => {
              setValue2(e.currentTarget.value);
            }}
            type="pure-number"
          />
          <Typography>
            CreditCard formatted input
          </Typography>
          <BaseInput
            data-testid="credit-card-input"
            value={value}
            onChange={(event, { unformat }) => {
              setValue(unformat(event.currentTarget.value));
            }}
            format="credit-card"
            type="pure-number"
          />
          <Typography>
            Starting with spaces input
          </Typography>
          <BaseInput
            data-testid="spaces-input"
            value={value3}
            onChange={(e) => {
              setValue3(e.currentTarget.value);
            }}
            type="pure-number"
          />
          <Typography>
            Starting with spaces input
          </Typography>
          <BaseInput
            data-testid="symbols-input"
            value={value4}
            onChange={(e) => {
              setValue4(e.currentTarget.value);
            }}
            type="pure-number"
          />
        </>
      );
    };

    it('handles pure-number', () => {
      render(<PureNumber />);

      fireEvent.change(screen.getByTestId('pure-number-input'), {
        target: {
          value: '123',
        },
      });

      const element: HTMLInputElement = (screen.getByTestId('pure-number-input'): any);

      expect(element.type).toBe('tel');
      expect(element.value).toBe('123');
    });

    it('does not allow less invalid characters', () => {
      render(<PureNumber />);

      fireEvent.change(screen.getByTestId('pure-number-input'), {
        target: {
          value: '123',
        },
      });
      fireEvent.change(screen.getByTestId('pure-number-input'), {
        target: {
          value: 'a',
        },
      });

      const element: HTMLInputElement = (screen.getByTestId('pure-number-input'): any);

      expect(element.value).toBe('123');
    });

    it('allows removal of characters when an invalid character still exists', () => {
      const Comp = () => {
        const [value, setValue] = React.useState('+12 3');

        return (
          <BaseInput
            data-testid="pure-number-input"
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            type="pure-number"
          />
        );
      };
      render(<Comp />);

      fireEvent.change(screen.getByTestId('pure-number-input'), {
        target: {
          value: '+1 3',
        },
      });

      const element: HTMLInputElement = (screen.getByTestId('pure-number-input'): any);

      expect(element.value).toBe('+1 3');
    });

    it('does not allow more invalid characters', () => {
      render(<PureNumber />);

      fireEvent.change(screen.getByTestId('pure-number-input'), {
        target: {
          value: '123',
        },
      });
      fireEvent.change(screen.getByTestId('pure-number-input'), {
        target: {
          value: '123a',
        },
      });

      const element: HTMLInputElement = (screen.getByTestId('pure-number-input'): any);

      expect(element.value).toBe('123');
    });

    it('does not allow invalid char as first value', () => {
      render(<PureNumber />);

      fireEvent.change(screen.getByTestId('pure-number-input'), {
        target: {
          value: 'a',
        },
      });

      const element: HTMLInputElement = (screen.getByTestId('pure-number-input'): any);

      expect(element.value).toBe('');
    });

    it('can subtract chars if it starts with all spaces', () => {
      render(<PureNumber />);

      const spacesInput = screen.getByTestId('spaces-input');
      if (spacesInput instanceof HTMLInputElement) {
        const { value } = spacesInput;
        const expectedValue = value.substring(0, value.length - 1);
        fireEvent.change(screen.getByTestId('spaces-input'), {
          target: {
            value: expectedValue,
          },
        });

        const element: HTMLInputElement = (screen.getByTestId('spaces-input'): any);

        expect(element.value).toBe(expectedValue);
      }
    });

    it('can subtract chars if it starts with all invalid chars', () => {
      render(<PureNumber />);

      const symbolsInput = screen.getByTestId('symbols-input');
      if (symbolsInput instanceof HTMLInputElement) {
        const { value } = symbolsInput;
        const expectedValue = value.substring(0, value.length - 1);
        fireEvent.change(screen.getByTestId('symbols-input'), {
          target: {
            value: expectedValue,
          },
        });

        const element: HTMLInputElement = (screen.getByTestId('symbols-input'): any);

        expect(element.value).toBe(expectedValue);
      }
    });
  });
});

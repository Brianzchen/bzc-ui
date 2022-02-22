// @flow
import { modal, dropdown, card } from './shadows';

describe('shadows', () => {
  const theme = {
    colors: {
      grey1: () => '#191919',
    },
    spacing: (space) => {
      switch (space) {
        case 1:
          return 4;
        case 2:
          return 8;
        case 3:
          return 12;
        case 4:
          return 16;
        case 5:
          return 24;
        default:
          return 0;
      }
    },
  };

  it('calculates modal correctly', () => {
    // $FlowExpectedError[prop-missing] missing theme props
    expect(modal(theme)).toBe('0 8px 24px 0 rgba(25, 25, 25, 0.35)');
  });

  it('calculates dropdown correctly', () => {
    // $FlowExpectedError[prop-missing] missing theme props
    expect(dropdown(theme)).toBe('0 4px 12px 0 rgba(25, 25, 25, 0.25)');
  });

  it('calculates card correctly', () => {
    // $FlowExpectedError[prop-missing] missing theme props
    expect(card(theme)).toBe('0 2px 4px 0 rgba(25, 25, 25, 0.15)');
  });
});

// @flow
import computeColor from './computeColor';

describe('computeColor', () => {
  const theme = {
    colors: {
      primary: (shade) => {
        if (!shade) return 'no shade';

        return `The color is ${shade}`;
      },
    },
  };

  it('return inherit if no color', () => {
    // $FlowExpectedError[prop-missing] missing theme props
    expect(computeColor(undefined, theme)).toBe('inherit');
  });

  it('returns the color with default shade if no parens', () => {
    // $FlowExpectedError[prop-missing] missing theme props
    expect(computeColor('primary', theme)).toBe('no shade');
  });

  it('returns the color with shade if parens', () => {
    // $FlowExpectedError[prop-missing] missing theme props
    expect(computeColor('primary(40)', theme)).toBe('The color is 40');
  });

  it('returns correctly if missing opening paren', () => {
    // $FlowExpectedError[prop-missing] missing theme props
    expect(computeColor('secondary40)', theme)).toBe('inherit');
  });

  it('returns correctly if missing closing paren', () => {
    // $FlowExpectedError[prop-missing] missing theme props
    expect(computeColor('secondary(40', theme)).toBe('inherit');
  });

  it('returns hex if passing in a hex', () => {
    const hex = '#ffa71a';
    // $FlowExpectedError[prop-missing] missing theme props
    expect(computeColor(hex, theme)).toBe(hex);
  });

  it('returns inherit if hex but too short', () => {
    // $FlowExpectedError[prop-missing] missing theme props
    expect(computeColor('#12', theme)).toBe('inherit');
  });
});

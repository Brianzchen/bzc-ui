// @flow
import compileColors from './compileColors';

describe('compileColors', () => {
  it('turns colors passed into functions for consumption', () => {
    const colors = {
      primary: '#1D2F5E',
    };

    const functionalColors = compileColors(colors);

    expect(functionalColors.primary()).toBe(colors.primary);
  });

  it('lightens correctly', () => {
    const colors = {
      primary: '#1D2F5E',
    };

    const functionalColors = compileColors(colors);

    expect(functionalColors.primary(-0.2)).toBe('#233871');
  });

  it('darkens correctly', () => {
    const colors = {
      primary: '#1D2F5E',
    };

    const functionalColors = compileColors(colors);

    expect(functionalColors.primary(0.2)).toBe('#17264B');
  });
});

// @flow
import compileColors from './compileColors';

describe('compileColors', () => {
  const colors = {
    primary: '#1D2F5E',
    secondary: '#2B59C3',
    highlight: '#1d89bf',
    error: '#bf0000',
    successBackground: '#daf2e6',
    infoBackground: '#fff9dc',
    warningBackground: '#ffefe5',
    errorBackground: '#ffd9d9',
    grey1: '#191919',
    grey2: '#333333',
    grey3: '#737373',
    grey4: '#cccccc',
    grey5: '#e5e5e5',
    grey6: '#f2f2f2',
    grey7: '#ffffff',
  };
  const functionalColors = compileColors(colors);

  it('turns colors passed into functions for consumption', () => {
    expect(functionalColors.primary()).toBe(colors.primary);
  });

  it('lightens correctly', () => {
    expect(functionalColors.primary(-0.2)).toBe('#233871');
  });

  it('darkens correctly', () => {
    expect(functionalColors.primary(0.2)).toBe('#17264B');
  });

  it('can lighten and change opacity', () => {
    expect(functionalColors.primary(-0.2, 0.5)).toBe('rgba(35, 56, 113, 0.5)');
  });

  it('can darken and change opacity', () => {
    expect(functionalColors.primary(0.2, 0.5)).toBe('rgba(23, 38, 75, 0.5)');
  });

  it('can just change opacity', () => {
    expect(functionalColors.primary(undefined, 0.5)).toBe('rgba(29, 47, 94, 0.5)');
  });
});

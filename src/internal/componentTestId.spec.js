// @flow
import componentTestId from './componentTestId';

describe('componentTestId', () => {
  it('adds the correct prefix', () => {
    expect(componentTestId('button', 'focus effect')).toBe('bzc-button-focus-effect');
  });

  it('handles PascalCase component', () => {
    expect(componentTestId('Button', 'focus effect')).toBe('bzc-button-focus-effect');
    expect(componentTestId('BottomSheet', 'focus effect')).toBe('bzc-bottom-sheet-focus-effect');
  });
});

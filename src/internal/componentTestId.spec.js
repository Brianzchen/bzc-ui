// @flow
import componentTestId from './componentTestId';

describe('componentTestId', () => {
  it('adds the correct prefix', () => {
    expect(componentTestId('button', 'focus effect')).toBe('sf-button-focus-effect');
  });

  it('handles PascalCase component', () => {
    expect(componentTestId('Button', 'focus effect')).toBe('sf-button-focus-effect');
    expect(componentTestId('BottomSheet', 'focus effect')).toBe('sf-bottom-sheet-focus-effect');
  });
});

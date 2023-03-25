// @flow
import { datatype, lorem } from '@faker-js/faker';

import compileSpace from './compileSpace';

describe('compileSpace', () => {
  const keyValue = {
    '1': '4px',
    '2': '8px',
    '3': '12px',
    '4': '16px',
    '5': 64,
  };
  const spacing = (space: number) => keyValue[space];

  it('returns number when passed', () => {
    const expected = datatype.number();
    expect(compileSpace(expected, spacing)).toBe(expected);
  });

  it('returns px value when passed', () => {
    const expected = '8px';
    expect(compileSpace(expected, spacing)).toBe(expected);
  });

  it('return value if random value is passed', () => {
    const expected = lorem.sentence();
    expect(compileSpace(expected, spacing)).toBe(expected);
  });

  it('returns the theme value when passed in the format of `spacing([space])`', () => {
    const expected = 4;
    expect(compileSpace(`spacing(${expected})`, spacing)).toBe(keyValue[expected]);
  });

  it('will not break if passing an object', () => {
    const expected = {};
    // $FlowExpectedError[incompatible-call]
    expect(compileSpace(expected, spacing)).toBe(expected);
  });

  it('returns the value when spacing format is malformed', () => {
    const expected = ' spacing(4)';
    expect(compileSpace(expected, spacing)).toBe(expected);
  });

  it('returns undefined if unknown space passed in', () => {
    expect(compileSpace('spacing(999)', spacing)).toBe(undefined);
  });

  it('returns undefined when undefined is passed in', () => {
    // $FlowExpectedError[incompatible-call]
    expect(compileSpace(undefined, spacing)).toBe(undefined);
  });

  it('adds a suffix for compiled spaces', () => {
    expect(compileSpace('spacing(1)', spacing, 'px')).toBe('4pxpx');
  });

  it('adds a suffix for numbers', () => {
    expect(compileSpace(8, spacing, 'px')).toBe('8px');
  });

  it('does not add suffix with hardcoded string values', () => {
    expect(compileSpace('50%', spacing, 'px')).toBe('50%');
  });

  it('does not convert spacing into string when no suffix', () => {
    const value = compileSpace('spacing(5)', spacing);
    expect(value).toBe(64);
    expect(typeof value === 'number').toBe(true);
  });
});

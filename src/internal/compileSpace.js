// @flow
import type { SpacingT } from '../types';

type CompileSpaceT =
  & ((space: string | number, spacing: SpacingT) => number)
  & ((space: string | number, spacing: SpacingT, suffix: string) => string);

// $FlowExpectedError[incompatible-type] Workaround to handle overloaded function
const compileSpace: CompileSpaceT = (space, spacing, suffix = ''): number | string => {
  const spacingStart = 'spacing(';

  if (typeof space === 'number') {
    if (suffix) {
      return `${space}${suffix}`;
    }
    return space;
  }

  if ((typeof space === 'string' && space.indexOf(spacingStart) !== 0)
      || typeof space !== 'string') {
    return space;
  }

  const value = spacing(Number(space.substring(spacingStart.length, space.indexOf(')'))));

  if (value && suffix) {
    return `${value}${suffix}`;
  }

  return value;
};

export default compileSpace;

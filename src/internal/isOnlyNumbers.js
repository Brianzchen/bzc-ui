// @flow
import isNan from './isNan';

export default (value: string): boolean => {
  if (isNan(Number(value))) return false;
  if (value.indexOf('.') > -1) return false;
  if (value.indexOf(' ') > -1) return false;
  return true;
};

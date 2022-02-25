// @flow
import type { InputFormatT } from '../types';

/**
 * Should be used with `Input` or `BaseInput`'s `format` prop. Used to unformat a formatted value
 */
export default (value: mixed, format?: InputFormatT): any => {
  if (format === 'credit-card' && typeof value === 'string') {
    return value.replace(/ /g, '');
  }
  return value;
};

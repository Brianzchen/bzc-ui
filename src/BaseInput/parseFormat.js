// @flow
import type { InputFormatT } from '../types';

export default (value: mixed, format?: InputFormatT): any => {
  if (format === 'credit-card' && typeof value === 'string') {
    const chars = value.split('');
    return chars.reduce((prev, curr, i) => {
      if (i === 0) {
        return `${curr}`;
      }
      if (i % 4 === 0) {
        return `${prev} ${curr}`;
      }
      return `${prev}${curr}`;
    }, '');
  }
  return value;
};

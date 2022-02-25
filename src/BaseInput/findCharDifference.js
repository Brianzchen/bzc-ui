// @flow
/**
 * `a` must be shorter than `b`
 */
export default (a: string, b: string): string => {
  let i = 0;
  let j = 0;
  let result = '';

  while (j < b.length) {
    if (a[i] !== b[j] || i === a.length) result += b[j];
    else i += 1;
    j += 1;
  }
  return result;
};

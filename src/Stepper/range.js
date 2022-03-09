// @flow
/* eslint no-param-reassign: 0 */

export default (start: number, end?: number, step?: number): Array<number> => {
  const arr = [];
  let len = 0;

  const increment = step === undefined ? 1 : step;

  if (!end && !step) {
    len = start;
    start = 0;
    end = start;
  } else {
    start = start === undefined ? 1 : start;
    end = end === undefined ? 1 : end;
    len = end - start;
  }

  let i = 0;
  while (i < len) {
    arr.push(start + i * increment);

    i += 1;
  }

  return arr;
};

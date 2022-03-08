// @flow
export default (value: string, length: number): string => {
  let s = value;
  while (s.length < (length || 2)) {
    s = `0${s}`;
  }
  return s;
};

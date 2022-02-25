// @flow
export default (
  input: any,
// eslint-disable-next-line no-self-compare
): boolean => typeof input === 'number' && input !== input;

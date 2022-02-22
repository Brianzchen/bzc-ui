// @flow
export default (val: string | number): number => {
  if (typeof val === 'number') return val;
  return Number(val.replace('px', ''));
};

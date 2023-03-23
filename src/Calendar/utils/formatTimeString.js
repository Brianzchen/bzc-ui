// @flow
type ValueT = number | string;

export default (
  year: ValueT,
  month: ValueT,
  date: ValueT,
): string => {
  const format = (number: ValueT) => (Number(number) < 10 ? `0${number}` : number);

  return `${year}-${format(month)}-${format(date)}`;
};

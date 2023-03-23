// @flow
import formatTimeString from './formatTimeString';

export type TargetTimeT = {|
  date: number,
  month: number,
  year: number,
|};

export default (
  {
    date, month, year,
  }: TargetTimeT,
  minDate?: Date,
  maxDate?: Date,
): boolean => {
  const targetTime = new Date(formatTimeString(year, month, date)).getTime();

  const greaterThan = (time: number, comparison?: Date) => (
    !comparison || time >= new Date(comparison).getTime()
  );

  const lessThan = (time: number, comparison?: Date) => (
    !comparison || time <= new Date(comparison).getTime()
  );

  return greaterThan(targetTime, minDate) && lessThan(targetTime, maxDate);
};

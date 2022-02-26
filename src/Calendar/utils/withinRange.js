// @flow
import formatTimeString from './formatTimeString';

type TargetTimeT = {|
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

  const greaterThan = (time, comparison) => (
    !comparison || time >= new Date(comparison).getTime()
  );

  const lessThan = (time, comparison) => (
    !comparison || time <= new Date(comparison).getTime()
  );

  return greaterThan(targetTime, minDate) && lessThan(targetTime, maxDate);
};

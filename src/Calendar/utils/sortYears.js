// @flow
/**
 * Sort years so that year closest to current year
 * always appears comes first
 */
export default (years: Array<number>): Array<number> => {
  const localYear = new Date(Date.now()).getFullYear();

  if (Math.abs(localYear - years[0]) > Math.abs(localYear - years[years.length - 1])) {
    return years.reverse();
  }
  return years;
};

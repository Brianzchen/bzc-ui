// @flow
export default (a?: Date, b?: Date): Date | void => {
  if (!a) return b;
  if (!b) return a;

  const localYear = new Date(Date.now()).getFullYear();

  // Sort years so that year closest to current year
  // always appears on top
  if (Math.abs(localYear - a.getFullYear()) > Math.abs(localYear - b.getFullYear())) {
    return b;
  }
  return a;
};

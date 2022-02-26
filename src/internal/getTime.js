// @flow
export default (
  dateObj?: Date,
): {| date: number | string, month: number | string, year: number | string |} => {
  const year = (dateObj && new Date(dateObj).getFullYear()) || '';
  const month = (dateObj && new Date(dateObj).getMonth() + 1) || '';
  const date = (dateObj && new Date(dateObj).getDate()) || '';

  return {
    year, month, date,
  };
};

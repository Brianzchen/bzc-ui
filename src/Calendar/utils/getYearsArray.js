// @flow
const getYearsArray = (minDate?: Date, maxDate?: Date): Array<number> => {
  const currentYear = new Date(Date.now()).getFullYear();

  if (minDate && maxDate) {
    const array = [];

    for (let i = minDate.getFullYear(); i <= maxDate.getFullYear(); i++) {
      array.push(i);
    }

    return array;
  }

  if (minDate) {
    return [minDate.getFullYear(), minDate.getFullYear() + 1];
  }

  if (maxDate) {
    return [maxDate.getFullYear() - 1, maxDate.getFullYear()];
  }

  return [currentYear - 1, currentYear];
};

export default getYearsArray;

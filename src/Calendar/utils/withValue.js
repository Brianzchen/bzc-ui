// @flow
export default (array: Array<number>, value?: Date): Array<number> => {
  const first = array[0];
  const last = array[array.length - 1];

  if (value) {
    const valueYear = value.getFullYear();

    if (array.indexOf(valueYear) > -1) return array;

    if (first > last) {
      if (valueYear < first) {
        return [...array, valueYear];
      }

      if (valueYear > last) {
        return [valueYear, ...array];
      }
    } else {
      if (valueYear < first) {
        return [valueYear, ...array];
      }

      if (valueYear > last) {
        return [...array, valueYear];
      }
    }
  }

  return array;
};

// @flow
import getYearsArray from './getYearsArray';

describe('getYearsArray', () => {
  const minDate = new Date('2021-02-21');

  const maxDate = new Date('2024-05-21');

  it('doesn\'t pass minDate or maxDate', () => {
    const currentYear = new Date().getFullYear();
    expect(getYearsArray()).toEqual([currentYear - 1, currentYear]);
  });
  it('only passes minDate ', () => {
    expect(getYearsArray(minDate)).toEqual([2021, 2022]);
  });

  it('only passes maxDate ', () => {
    expect(getYearsArray(undefined, maxDate)).toEqual([2023, 2024]);
  });

  it('passes minDate and maxDate', () => {
    expect(getYearsArray(minDate, maxDate)).toEqual([
      2021, 2022, 2023, 2024,
    ]);
  });
});

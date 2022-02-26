// @flow
import calendarArray from './calendarArray';
import calendarArrayMockData from '../testUtils/calendarArrayMockData';

describe('calendarArray', () => {
  it('returns expected month\'s data', () => {
    const testYear = 2020;
    const testMonths = [1, 2, 3, 4, 12];

    testMonths.forEach((month) => {
      expect(calendarArray(testYear, month)).toEqual(calendarArrayMockData[`date${testYear}${month}`]);
    });
  });
});

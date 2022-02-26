// @flow
import withinRange from './withinRange';

describe('withinRange', () => {
  const minDate = new Date('2020-05-01');
  const maxDate = new Date('2020-12-01');
  const targetTime = {
    year: 2020,
    month: 5,
    date: 2,
  };
  it('returns true when has no minDate and MaxDate', () => {
    expect(withinRange(targetTime)).toBe(true);
  });

  describe('passes minDate and maxDate', () => {
    it('returns true when target time between minDate and maxDate', () => {
      expect(withinRange({
        ...targetTime, month: targetTime.month + 1,
      }, minDate, maxDate)).toBe(true);
    });

    it('returns false when target time beyond minDate and maxDate', () => {
      expect(withinRange({
        ...targetTime, month: targetTime.month - 1,
      }, minDate, maxDate)).toBe(false);

      expect(withinRange({
        ...targetTime, year: targetTime.year + 1,
      }, minDate, maxDate)).toBe(false);
    });
  });

  describe('only passes minDate ', () => {
    it('returns true when target time greater than minDate', () => {
      expect(withinRange({
        ...targetTime, month: targetTime.month + 1,
      }, minDate)).toBe(true);
    });

    it('returns true when target time less than minDate', () => {
      expect(withinRange({
        ...targetTime, month: targetTime.month - 1,
      }, minDate)).toBe(false);
    });
  });

  describe('only passes maxDate ', () => {
    it('returns true when target time less than maxDate', () => {
      expect(withinRange({
        ...targetTime, year: targetTime.year - 1,
      }, undefined, maxDate)).toBe(true);
    });

    it('returns false when target time greater than maxDate', () => {
      expect(withinRange({
        ...targetTime, year: targetTime.year + 1,
      }, undefined, maxDate)).toBe(false);
    });
  });
});

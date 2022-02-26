// @flow
import withValue from './withValue';

describe('withValue', () => {
  const defaultResult = [2011, 2012, 2013];

  it('returns original array when date value is not defined ', () => {
    expect(withValue(defaultResult)).toEqual(defaultResult);
  });

  it('returns array with year of date value when date value is less than first index', () => {
    expect(withValue(defaultResult, new Date('2010-01-01'))).toEqual(
      [2010, ...defaultResult],
    );
  });

  it('returns array with year of date value when date value is greater than last index ', () => {
    expect(withValue(defaultResult, new Date('2016-01-01'))).toEqual(
      [...defaultResult, 2016],
    );
  });

  describe('reversed order', () => {
    const reversedResult = [2013, 2012, 2011];

    it('returns original array when date value is not defined ', () => {
      expect(withValue(reversedResult)).toEqual(reversedResult);
    });

    it('returns array with year of date value when date value is less than first index', () => {
      expect(withValue(reversedResult, new Date('2010-01-01'))).toEqual(
        [...reversedResult, 2010],
      );
    });

    it('returns array with year of date value when date value is greater than last index ', () => {
      expect(withValue(reversedResult, new Date('2016-01-01'))).toEqual(
        [2016, ...reversedResult],
      );
    });
  });
});

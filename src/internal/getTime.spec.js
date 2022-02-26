// @flow
import getTime from './getTime';

describe('getTime', () => {
  it('returns plain object of time', () => {
    const expectObj = {
      year: 2020,
      month: 11,
      date: 15,
    };

    expect(
      getTime(new Date(`${expectObj.year}-${expectObj.month}-${expectObj.date}`)),
    ).toEqual(expectObj);
  });
});

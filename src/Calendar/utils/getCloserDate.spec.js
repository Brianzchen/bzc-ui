// @flow
import getCloseDate from './getCloserDate';

describe('getCloserDate', () => {
  beforeEach(() => {
    jest
      .spyOn(global.Date, 'now')
      .mockImplementationOnce(() => (
        new Date('2019-05-14T11:01:58.135Z').valueOf()
      ));
  });

  it('returns first date if closer', () => {
    const firstDate = new Date('2018-05-13');
    expect(getCloseDate(
      firstDate,
      new Date('2021-05-13'),
    )).toBe(firstDate);
  });

  it('return second date if closer', () => {
    const secondDate = new Date('2019-05-13');
    expect(getCloseDate(
      new Date('2016-05-13'),
      secondDate,
    )).toBe(secondDate);
  });

  it('returns first date if second if undefined', () => {
    const firstDate = new Date('2018-05-13');
    expect(getCloseDate(
      firstDate,
      undefined,
    )).toBe(firstDate);
  });

  it('returns second date if first is undefined', () => {
    const secondDate = new Date('2019-05-13');
    expect(getCloseDate(
      undefined,
      secondDate,
    )).toBe(secondDate);
  });

  it('returns undefined if both are undefined', () => {
    expect(getCloseDate()).toBe(undefined);
  });
});

// @flow
import sortYears from './sortYears';

describe('sortYears', () => {
  beforeEach(() => {
    jest
      .spyOn(global.Date, 'now')
      .mockImplementationOnce(() => (
        new Date('2010-05-14T11:01:58.135Z').valueOf()
      ));
  });

  it('returns in ascending order', () => {
    expect(sortYears([2010, 2009, 2008])).toEqual([2010, 2009, 2008]);
  });

  it('returns in descending order', () => {
    expect(sortYears([2012, 2011, 2010])).toEqual([2010, 2011, 2012]);
  });
});

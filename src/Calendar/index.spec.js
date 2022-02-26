// @flow
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import formatTimeString from './utils/formatTimeString';
import calendarArray from './utils/calendarArray';
import getTime from '../internal/getTime';

import Calendar from '.';
import getYearsArray from './utils/getYearsArray';

describe('<Calendar />', () => {
  let currentDate;
  let getCalendarData;

  beforeEach(() => {
    jest
      .spyOn(global.Date, 'now')
      .mockImplementation(() => new Date('2020-05-21').getTime());

    currentDate = new Date(Date.now());
    getCalendarData = calendarArray(
      Number(getTime(currentDate).year),
      Number(getTime(currentDate).month),
    );
  });

  it('renders calendar and click a date button of current month', () => {
    const onChange = jest.fn();
    render(
      <Calendar
        onChange={onChange}
        value={new Date('2020-05-21')}
      />,
    );

    const targetDateButton = screen.getByTestId('sf-calendar-date-2020-05-10');

    getCalendarData.forEach((row) => {
      row.forEach(({ year, month, date }) => {
        const dateButton = screen.getByTestId(`sf-calendar-date-${formatTimeString(year, month, date)}`);
        expect(dateButton.textContent).toBe(date.toString());
      });
    });

    fireEvent.click(targetDateButton);

    expect(onChange).toHaveBeenCalledWith(
      expect.anything(),
      {
        unformat: expect.anything(),
        newValue: expect.anything(),
        formatNewValue: expect.anything(),
      },
    );
  });

  it('renders date button as Anchor tag and url', () => {
    const generateUrl = (year, month, date) => `/test-url/${year}-${month}-${date}`;
    render(
      <Calendar
        dateButtonProps={(dateObj) => ({
          as: 'a',
          href: generateUrl(getTime(dateObj).year, getTime(dateObj).month, getTime(dateObj).date),
        })}
      />,
    );

    getCalendarData.forEach((row, rowIndex) => {
      screen.getByTestId(`sf-calendar-week-${rowIndex + 1}`).querySelectorAll('a').forEach((button, buttonIndex) => {
        const { date, month, year } = getCalendarData[rowIndex][buttonIndex];

        expect(button.getAttribute('href')).toBe(generateUrl(year, month, date));
      });
    });
  });

  it('change month option', () => {
    expect.assertions(1);

    render(
      <Calendar />,
    );

    const targetMonth = 6;

    const element = screen.getByTestId('sf-calendar-select-month');

    if (element instanceof HTMLSelectElement) {
      fireEvent.change(element, { target: { value: targetMonth } });
      expect(element.value).toBe(targetMonth.toString());
    }
  });

  describe('change year option', () => {
    it('without range', () => {
      expect.assertions(1);

      const yearsArray = getYearsArray();
      render(
        <Calendar />,
      );

      const element = screen.getByTestId('sf-calendar-select-year');

      if (element instanceof HTMLSelectElement) {
        fireEvent.change(element, { target: { value: yearsArray[1] } });
        expect(element.value).toBe(yearsArray[1].toString());
      }
    });

    it('greater than maxDate', () => {
      expect.assertions(3);

      const maxDate = new Date('2020-06-06');
      const yearsArray = getYearsArray(undefined, maxDate);
      render(
        <Calendar
          maxDate={maxDate}
        />,
      );

      const monthElement = screen.getByTestId('sf-calendar-select-month');
      const yearElement = screen.getByTestId('sf-calendar-select-year');

      if (monthElement instanceof HTMLSelectElement
          && yearElement instanceof HTMLSelectElement) {
        // change to previous year and change month number to be greater than maxDate's month
        fireEvent.change(monthElement, { target: { value: 12 } });
        fireEvent.change(yearElement, { target: { value: yearsArray[0] } });

        expect(monthElement.value).toBe('12');
        expect(yearElement.value).toBe(yearsArray[0].toString());

        // change to maxDate's year, month's number should be changed to maxDate's month
        fireEvent.change(yearElement, { target: { value: yearsArray[1] } });
        expect(monthElement.value).toBe(getTime(maxDate).month.toString());
      }
    });

    it('less than minDate', () => {
      expect.assertions(4);

      const minDate = new Date('2019-04-10');
      const yearsArray = getYearsArray(minDate, undefined);
      render(
        <Calendar
          minDate={minDate}
        />,
      );

      const monthElement = screen.getByTestId('sf-calendar-select-month');
      const yearElement = screen.getByTestId('sf-calendar-select-year');

      if (monthElement instanceof HTMLSelectElement
          && yearElement instanceof HTMLSelectElement) {
        // change to latest year and change month number to be less than minDate's month
        fireEvent.change(monthElement, { target: { value: 3 } });
        fireEvent.change(yearElement, { target: { value: yearsArray[1] } });

        expect(monthElement.value).toBe('3');
        expect(yearElement.value).toBe(yearsArray[1].toString());

        // change to minDate's year, month's number should be changed to minDate's month
        fireEvent.change(screen.getByTestId('sf-calendar-select-year'), { target: { value: yearsArray[0] } });
        expect(yearElement.value).toBe(yearsArray[0].toString());
        expect(monthElement.value).toBe(getTime(minDate).month.toString());
      }
    });
  });
});

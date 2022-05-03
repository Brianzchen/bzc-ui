// @flow
import React, { useState } from 'react';

import Box from '../Box';
import type { BoxT } from '../Box';
import styler from '../styler';
import useTheme from '../useTheme';

import DaysHeader from './DaysHeader';
import YearAndDateSection from './YearAndDateSection';
import WeekRow from './WeekRow';

import { daysArray, dateStatusString } from './constants';
import calendarArray from './utils/calendarArray';
import formatTimeString from './utils/formatTimeString';
import getTime from '../internal/getTime';
import getCloserDate from './utils/getCloserDate';
import getYearsArray from './utils/getYearsArray';
import sortYears from './utils/sortYears';
import withinRange from './utils/withinRange';

export type CalendarT = {
  ...BoxT,
  /**
   * accepts a function which is passed the date in Date object format
   * and expects an object to be returned which will be passed as props into each DateButton
  */
  dateButtonProps?: (dateValue: Date) => { ... },
  /** specify maximum selectable date with valid Date object */
  maxDate?: Date,
  /** specify minimum selectable date with valid Date object */
  minDate?: Date,
  /**
   * triggers when a date is selected.
   * (event, { newValue, formatNewValue }) => {}
   */
  onChange?: (
    event: SyntheticEvent<HTMLButtonElement>,
    {|
      unformat: (v: string) => string,
      newValue: Date,
      formatNewValue: string,
    |},
  ) => void,
  /** overrides styling for root element */
  value?: Date,
  ...
};

/**
 * A fully styled calendar component to replace the standard date calendar from html
 * that may differ in style and implementation across browsers.
 */
const Calendar: React$AbstractComponent<CalendarT, HTMLElement> = React.forwardRef<CalendarT, HTMLElement>(({
  dateButtonProps = () => ({}),
  minDate,
  maxDate,
  onChange,
  style = {},
  value,
  ...otherProps
}: CalendarT, ref) => {
  const yearsArray = sortYears(getYearsArray(minDate, maxDate));

  const [currentYear, setCurrentYear] = useState(
    getTime(value).year
    || getTime(getCloserDate(minDate, maxDate)).year
    || new Date(Date.now()).getFullYear(),
  );

  const [currentMonth, setCurrentMonth] = useState(
    getTime(value).month
    || getTime(getCloserDate(minDate, maxDate)).month
    || new Date(Date.now()).getMonth() + 1,
  );

  const getDateStatus = (obj) => {
    const {
      notCurrentMonth, selected, beyondRange, normal,
    } = dateStatusString;

    if (obj.date === getTime(value).date
      && obj.month === getTime(value).month
      && obj.year === getTime(value).year) {
      return selected;
    }

    const sortedStartingDates = [yearsArray[0], yearsArray[yearsArray.length - 1]].sort();

    if (!withinRange(
      obj,
      minDate || new Date(sortedStartingDates[0], 1, 0),
      maxDate || new Date(sortedStartingDates[1], 11, 31),
    )) {
      return beyondRange;
    }

    if (obj.month !== currentMonth) {
      return notCurrentMonth;
    }
    return normal;
  };

  const changeYear = (event) => {
    const updateDropdownTime = (year, month) => {
      if (maxDate
          && year >= maxDate.getFullYear()
          && month >= maxDate.getMonth() + 1) {
        return {
          year: maxDate.getFullYear(),
          month: maxDate.getMonth() + 1,
        };
      }
      if (minDate
          && year <= minDate.getFullYear()
          && month <= minDate.getMonth() + 1) {
        return {
          year: minDate.getFullYear(),
          month: minDate.getMonth() + 1,
        };
      }
      return {
        year, month,
      };
    };
    const { year, month } = updateDropdownTime(
      Number(event.currentTarget.value),
      Number(currentMonth),
    );

    setCurrentYear(year);
    setCurrentMonth(month);
  };

  const changeMonth = (event) => {
    setCurrentMonth(Number(event.currentTarget.value));
  };

  const changeDate = (event, { year, month, date }) => {
    if (withinRange({ year, month, date }, minDate, maxDate)
      && onChange
    ) {
      const newValue = formatTimeString(year, month, date);

      onChange(
        event,
        {
          unformat: () => '',
          newValue: new Date(newValue),
          formatNewValue: newValue,
        },
      );
    }
  };

  const theme = useTheme();

  const styles = {
    container: styler(style, theme, {
      width: theme.spacing(12) * 2,
      maxWidth: '100%',
      background: theme.colors.monoInverse(),
    }),
    dayHeaderWrapper: {
      background: theme.colors.monoLow(),
      textAlign: 'center',
      padding: `${theme.spacing(2)}px ${theme.spacing(5)}px ${theme.spacing(2)}px ${theme.spacing(5)}px`,
      display: 'flex',
      justifyContent: 'space-between',
    },
    day: {
      display: 'inline-block',
      width: '14%',
      textAlign: 'center',
    },
    weekRowWrapper: {
      padding: `${theme.spacing(1)}px ${theme.spacing(5)}px ${theme.spacing(4)}px`,
    },
  };

  return (
    <Box
      {...otherProps}
      ref={ref}
      style={styles.container}
    >
      <YearAndDateSection
        currentMonth={Number(currentMonth)}
        currentYear={Number(currentYear)}
        yearsArray={yearsArray}
        inputValue={value}
        minDate={minDate}
        maxDate={maxDate}
        changeMonth={changeMonth}
        changeYear={changeYear}
      />
      <Box style={styles.dayHeaderWrapper}>
        {daysArray.map((day) => (
          <DaysHeader
            key={day}
            day={day}
          />
        ))}
      </Box>
      <Box
        style={styles.weekRowWrapper}
      >
        {calendarArray(Number(currentYear), Number(currentMonth)).map((weekArray, index) => (
          <WeekRow
            key={`${index + weekArray[0].month + weekArray[0].year}`}
            changeDate={changeDate}
            getDateStatus={getDateStatus}
            weekArray={weekArray}
            dateButtonProps={dateButtonProps}
            index={index}
          />
        ))}
      </Box>
    </Box>
  );
});

Calendar.displayName = 'Calendar';

export default Calendar;

// @flow
import * as React from 'react';

import useComponentTestId from '../../internal/hooks/useComponentTestId';

import useTheme from '../../useTheme';
import Box from '../../Box';

import { monthsOptions } from '../constants';
import withinRange from '../utils/withinRange';
import SelectWrapper from './SelectWrapper';
import withValue from '../utils/withValue';

type Props = {|
  changeMonth: (event: SyntheticEvent<HTMLSelectElement>) => void,
  changeYear: (event: SyntheticEvent<HTMLSelectElement>) => void,
  currentMonth: number,
  currentYear: number,
  yearsArray: Array<number>,
  minDate?: Date,
  maxDate?: Date,
  inputValue?: Date,
|};

const YearAndDateSection = ({
  changeMonth,
  changeYear,
  currentMonth,
  currentYear,
  yearsArray,
  minDate,
  maxDate,
  inputValue,
}: Props): React.Node => {
  const theme = useTheme();
  const compTestId = useComponentTestId('Calendar');

  const styles = {
    wrapper: {
      background: theme.colors.monoLow(),
      padding: `${theme.spacing(5)}px ${theme.spacing(5)}px 0`,
    },
  };

  return (
    <Box
      style={styles.wrapper}
    >
      <SelectWrapper
        onChange={changeMonth}
        value={currentMonth}
        left
        testid={compTestId('select-month')}
      >
        {monthsOptions.map((month) => (
          <option
            value={month.value}
            key={month.value}
            disabled={!withinRange(
              {
                date: maxDate
                  && currentYear === maxDate.getFullYear()
                  && month.value === maxDate.getMonth() + 1
                  ? 1
                  : new Date(currentYear, month.value, 0).getDate(),
                month: month.value,
                year: currentYear,
              },
              minDate,
              maxDate,
            )}
          >
            {month.string}
          </option>
        ))}
      </SelectWrapper>
      <SelectWrapper
        onChange={changeYear}
        value={currentYear}
        testid={compTestId('select-year')}
      >
        {withValue(yearsArray, inputValue).map((year) => (
          <option
            value={year}
            key={year}
            disabled={yearsArray.indexOf(year) < 0}
          >
            {year}
          </option>
        ))}
      </SelectWrapper>
    </Box>
  );
};

export default YearAndDateSection;

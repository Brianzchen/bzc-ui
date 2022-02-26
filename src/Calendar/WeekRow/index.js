// @flow
import * as React from 'react';

import useComponentTestId from '../../internal/hooks/useComponentTestId';

import useTheme from '../../useTheme';
import Box from '../../Box';
import DateButton from './DateButton';

import formatTimeString from '../utils/formatTimeString';

type DateObjPropsT = {|
  year: number,
  month: number,
  date: number,
|};

type Props = {|
  weekArray: Array<DateObjPropsT>,
  getDateStatus: (dateObj: DateObjPropsT) => string,
  changeDate: (
    event: SyntheticEvent<HTMLButtonElement>,
    dateObj: DateObjPropsT,
  ) => void,
  dateButtonProps?: (dateValue: Date) => ({ ... }),
  index: number,
|};

const WeekRow = ({
  weekArray,
  changeDate,
  getDateStatus,
  dateButtonProps = () => ({}),
  index,
}: Props): React.Node => {
  const theme = useTheme();
  const compTestId = useComponentTestId('Calendar');

  const style = {
    textAlign: 'center',
    padding: `${theme.spacing(1)}px 0`,
    display: 'flex',
    justifyContent: 'space-between',
  };

  return (
    <Box
      style={style}
      data-testid={compTestId(`week-${index + 1}`)}
    >
      {weekArray.map((dateObj) => (
        <DateButton
          key={dateObj.date}
          date={dateObj.date}
          dateStatus={getDateStatus(dateObj)}
          onClick={(e) => changeDate(e, dateObj)}
          buttonObj={{
            ...dateButtonProps(
              new Date(formatTimeString(dateObj.year, dateObj.month, dateObj.date)),
            ),
            'data-testid': compTestId(`date-${formatTimeString(dateObj.year, dateObj.month, dateObj.date)}`),
          }}
        />
      ))}
    </Box>
  );
};

export default WeekRow;

// @flow
import * as React from 'react';

import useTheme from '../../useTheme';
import BaseButton from '../../BaseButton';
import Typography from '../../Typography';
import hexToRgba from '../../internal/hexToRgba';

import { dateStatusString } from '../constants';

type Props = {|
  dateStatus: string,
  date: number,
  onClick: (event: SyntheticEvent<HTMLButtonElement>) => void,
  buttonObj: { ... },
|};

const DateButton = ({
  dateStatus,
  date,
  onClick,
  buttonObj,
}: Props): React.Node => {
  const theme = useTheme();

  const {
    notCurrentMonth,
    selected,
    beyondRange,
    normal,
  } = dateStatusString;

  const matchStyle = (obj: any) => obj[dateStatus];

  const styles = {
    buttonWrapper: {
      width: theme.spacing(6),
      height: theme.spacing(6),
      textAlign: 'center',
      lineHeight: `${theme.spacing(6)}px`,
      userSelect: 'none',
      ...matchStyle({
        [beyondRange]: {
          color: hexToRgba(theme.colors.monoPrimary(), 0.2),
        },
        [normal]: {
          color: theme.colors.monoPrimary(),
          ':hover': {
            background: theme.colors.monoLow(),
          },
        },
        [notCurrentMonth]: {
          color: theme.colors.monoMid(),
          ':hover': {
            background: theme.colors.monoLow(),
            color: theme.colors.monoPrimary(),
          },
        },
        [selected]: {
          background: theme.colors.primary(),
          color: theme.colors.monoInverse(),
        },
      }),
    },
    button: {
      fontSize: 'inherit',
      width: '100%',
      height: '100%',
      display: 'block',
      lineHeight: `${theme.spacing(6)}px`,
      fontWeight: theme.fonts.body.style,
    },
  };

  return (
    <Typography
      type="body"
      style={styles.buttonWrapper}
    >
      <BaseButton
        {...buttonObj}
        disabled={dateStatus === beyondRange}
        onClick={(e) => {
          onClick(e);
        }}
        style={styles.button}
      >
        {date}
      </BaseButton>
    </Typography>
  );
};

export default DateButton;

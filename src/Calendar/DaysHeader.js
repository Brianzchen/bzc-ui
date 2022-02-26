// @flow
import React, { memo } from 'react';

import Typography from '../Typography';
import useTheme from '../useTheme';

type Props = {|
  day: string,
|};

const DayHeader = ({ day }: Props) => {
  const theme = useTheme();

  const style = {
    width: theme.spacing(6),
    height: theme.spacing(6),
    textAlign: 'center',
    lineHeight: `${theme.spacing(6)}px`,
    userSelect: 'none',
    color: theme.colors.monoTertiary(),
  };

  return (
    <Typography
      type="smallButton"
      style={style}
    >
      {day}
    </Typography>
  );
};

export default (memo<Props>(DayHeader): React$AbstractComponent<Props, mixed>);

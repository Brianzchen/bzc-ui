// @flow
import * as React from 'react';

import Box from '../../Box';
import styler from '../../styler';
import useTheme from '../../useTheme';
import type { StyleT } from '../../types';

type DirectionT = 'up' | 'right' | 'down' | 'left';

const getPath = (direction: DirectionT): {| points: string, transform?: string |} => {
  if (direction === 'up') {
    return {
      points: '11.31 3.501 8.5 6.27 9.28 7.038 17.883 15.52 8.54 24.736 9.32 25.504 11.345 27.5 12.033 26.821 23.5 15.515 22.72 14.744 21.383 13.427 20.695 12.747 20.69 12.752 11.31 3.5',
      transform: 'rotate(-90 16 15.5)',
    };
  }
  if (direction === 'right') {
    return {
      points: '11.81 4.001 9 6.771 9.78 7.539 18.383 16.02 9.04 25.236 9.82 26.004 11.845 28.001 12.533 27.321 24 16.015 23.22 15.245 21.883 13.927 21.195 13.248 21.19 13.252 11.81 4',
    };
  }
  if (direction === 'left') {
    return {
      points: '10.81 4 8 6.77 8.78 7.538 17.383 16.019 8.04 25.235 8.82 26.003 10.845 28 11.533 27.32 23 16.014 22.22 15.244 20.883 13.926 20.195 13.247 20.19 13.251 10.81 3.999',
      transform: 'rotate(-180 15.5 16)',
    };
  }
  return {
    points: '11.31 3.501 8.5 6.27 9.28 7.038 17.883 15.52 8.54 24.736 9.32 25.504 11.345 27.5 12.033 26.821 23.5 15.515 22.72 14.744 21.383 13.427 20.695 12.747 20.69 12.752 11.31 3.5',
    transform: 'rotate(90 16 15.5)',
  };
};

type Props = {
  style?: StyleT,
  direction?: DirectionT,
  color?: string,
  ...
};

const DropdownChevron = ({
  style = {},
  direction = 'down',
  color,
  ...otherProps
}: Props): React.Node => {
  const theme = useTheme();

  const styles = {
    chevron: styler(style, theme, {
      pointerEvents: 'none',
    }),
  };

  return (
    <Box
      {...otherProps}
      as="svg"
      width={32 * theme.scale}
      height={32 * theme.scale}
      viewBox="0 0 32 32"
      style={styles.chevron}
    >
      <polygon
        {...getPath(direction)}
        fill={color || theme.colors.monoPrimary()}
        fillRule="evenodd"
      />
    </Box>
  );
};

export default DropdownChevron;

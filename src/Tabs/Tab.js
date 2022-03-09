// @flow
import * as React from 'react';

import computeColor from '../internal/computeColor';
import isNan from '../internal/isNan';
import removePx from '../internal/removePx';

import BaseButton from '../BaseButton';
import Box from '../Box';
import styler from '../styler';
import useTheme from '../useTheme';
import type { StyleT } from '../types';

type Props = {
  value?: string | number,
  children?: React.Node,
  style?: StyleT,
  innerStyle?: StyleT,
  indicatorStyle?: StyleT,
  onClick?: (...args: Array<any>) => any,
  selected?: boolean,
  variant: 'md' | 'lg',
  proportion?: number,
  color: string,
  navShowing: boolean,
  tabSpacing: number,
  ...
};

const Tab = ({
  value = '',
  children = null,
  style = {},
  innerStyle = {},
  indicatorStyle = {},
  onClick = () => {},
  selected = false,
  variant,
  proportion,
  color,
  navShowing,
  tabSpacing,
  ...otherProps
}: Props): React.Node => {
  const theme = useTheme();
  const height = '100%';
  const indicatorHeight = theme.line(3);

  const getSize = () => {
    switch (variant) {
      case 'md':
        return `${48 * theme.scale}px`;
      case 'lg':
        return `${60 * theme.scale}px`;
      default:
        return `${48 * theme.scale}px`;
    }
  };

  const getExtraPadding = (prop?: number): number => {
    if (!prop
        || prop < 0
        || isNan(prop)) {
      return 0;
    }
    return prop / 2;
  };
  const needMinWidth = (prop?: number): boolean => {
    if (typeof prop === 'undefined' || navShowing) return true;
    return false;
  };

  const styles = {
    container: styler(style, theme, {
      display: 'inline-block',
      height: getSize(),
    }),
    inner: styler(innerStyle, theme, {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: needMinWidth(proportion) ? `${theme.spacing(9)}px` : undefined,
      padding: `${theme.spacing(2) + theme.spacing(1) + removePx(indicatorHeight)}px ${theme.spacing(tabSpacing) + getExtraPadding(proportion)}px ${theme.spacing(2) + theme.spacing(1)}px ${theme.spacing(tabSpacing) + getExtraPadding(proportion)}px`,
      whiteSpace: 'nowrap',
      ...selected
        ? {
          color: computeColor(color, theme),
          height: `calc(${height} - ${indicatorHeight})`,
        }
        : {
          color: theme.colors.monoTertiary(),
          borderBottom: `${indicatorHeight} solid transparent`,
          height,
        },
      ':hover': {
        color: theme.colors.monoPrimary(),
        backgroundColor: theme.colors.monoLow(),
      },
    }),
    indicator: styler(indicatorStyle, theme, {
      height: selected ? indicatorHeight : 0,
      backgroundColor: selected ? computeColor(color, theme) : 'transparent',
      transition: 'background-color 1s ease',
    }),
  };

  return (
    <BaseButton
      {...otherProps}
      style={styles.container}
      onClick={(event) => { onClick(event, { value, children }); }}
      focusEffect="inner"
    >
      <Box
        style={styles.inner}
      >
        {children}
      </Box>
      <Box
        style={styles.indicator}
      />
    </BaseButton>
  );
};

export default (React.memo(Tab): React$AbstractComponent<Props, mixed>);

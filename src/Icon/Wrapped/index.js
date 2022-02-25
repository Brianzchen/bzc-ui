// @flow
import React from 'react';

import useComponentTestId from '../../internal/hooks/useComponentTestId';

import styler from '../../styler';
import useTheme from '../../useTheme';
import type { StyleT } from '../../types';

import BaseIcon from './BaseIcon';

type Props = {
  icon: string,
  backgroundIcon?: string,
  backgroundColor?: string,
  foregroundIcon?: string,
  foregroundColor?: string,
  style?: StyleT,
  size: string | number,
  onClick?: (...args: Array<any>) => any,
  ...
};

const Wrapped = React.forwardRef<Props, HTMLElement>(({
  icon,
  backgroundIcon,
  backgroundColor,
  foregroundIcon,
  foregroundColor,
  style = {},
  size,
  onClick,
  ...otherProps
}: Props, ref) => {
  const theme = useTheme();
  const compTestId = useComponentTestId('Icon');

  const styles = {
    icon: styler(style, theme, {
      position: 'relative',
      zIndex: 0,
      fontSize: size,
    }),
    backgroundIcon: styler(style, theme, {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: -1,
    }),
    foregroundIcon: styler(style, theme, {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1,
    }),
  };

  if (onClick) {
    console.warn('onClick is being passed directly into the <i /> element. Consider using the `withButton` prop to be semantically correct.');
  }

  return (
    <BaseIcon
      {...otherProps}
      ref={ref}
      icon={icon}
      style={styles.icon}
      onClick={onClick}
    >
      {backgroundIcon && (
        <BaseIcon
          data-testid={compTestId('background-icon')}
          icon={backgroundIcon}
          style={styles.backgroundIcon}
          color={backgroundColor}
        />
      )}
      {foregroundIcon && (
        <BaseIcon
          data-testid={compTestId('foreground-icon')}
          icon={foregroundIcon}
          style={styles.foregroundIcon}
          color={foregroundColor}
        />
      )}
    </BaseIcon>
  );
});

Wrapped.displayName = 'Wrapped';

export default (Wrapped: React$AbstractComponent<Props, HTMLElement>);

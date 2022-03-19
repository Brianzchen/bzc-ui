// @flow
import React from 'react';

import BaseButton from '../BaseButton';
import type { BaseButtonT } from '../BaseButton';
import type { StyleT } from '../types';

import Wrapped from './Wrapped';

type Props = {
  ...BaseButtonT,
  /** the name of the icon */
  icon?: string,
  /** define an icon to appear under the main icon */
  backgroundIcon?: string,
  /** specifies the color of the background icon supporting Box's color syntax */
  backgroundColor?: string,
  /** define an icon to appear on top of the main icon */
  foregroundIcon?: string,
  /** specifies the color of the foreground icon supporting Box's color syntax */
  foregroundColor?: string,
  /** overrides styling for icon element */
  iconStyle?: StyleT,
  /** convenience prop to apply fontSize to the icon */
  size?: string | number,
  /**
   * wraps the Icon with a button element to create a semantically
   * correct component when onClick is needed on the Icon
   */
  withButton?: boolean,
  ...
};

/**
 * This is a component that wraps the html <i />, but allows access to the consistent styling interface for icons.
 *
 * By passing in the "icon" prop, it will apply a className of "icon-[icon]" to the underlying element.
 */
const Icon: React$AbstractComponent<Props, HTMLElement> = React.forwardRef<Props, HTMLElement>(({
  icon = '',
  backgroundIcon,
  backgroundColor,
  foregroundIcon,
  foregroundColor,
  style,
  iconStyle,
  size = 'inherit',
  withButton = false,
  ...otherProps
}: Props, ref) => {
  if (withButton) {
    return (
      <BaseButton
        {...otherProps}
        ref={ref}
        style={style}
      >
        <Wrapped
          style={iconStyle}
          icon={icon}
          backgroundIcon={backgroundIcon}
          backgroundColor={backgroundIcon}
          foregroundIcon={foregroundIcon}
          foregroundColor={foregroundColor}
          size={size}
        />
      </BaseButton>
    );
  }

  return (
    <Wrapped
      {...otherProps}
      ref={ref}
      icon={icon}
      backgroundIcon={backgroundIcon}
      backgroundColor={backgroundIcon}
      foregroundIcon={foregroundIcon}
      foregroundColor={foregroundColor}
      style={style || iconStyle}
      size={size}
    />
  );
});

Icon.displayName = 'Icon';

export default Icon;

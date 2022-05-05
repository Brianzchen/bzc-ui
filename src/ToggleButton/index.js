// @flow
import * as React from 'react';

import isReactElement from '../internal/isReactElement';

import BaseButton from '../BaseButton';
import type { BaseButtonT } from '../BaseButton';
import styler from '../styler';
import useTheme from '../useTheme';

export type ToggleButtonT = {
  ...BaseButtonT,
  /** whether the toggle is enabled */
  selected?: boolean,
  /**
   * whether the button is disabled, which would apply disabled
   * styling and not trigger onClick when clicked
   */
  disabled?: boolean,
  ...
};

/**
 * A tertiary button with a selected or unselected state.
 */
const ToggleButton: React$AbstractComponent<ToggleButtonT, HTMLElement> = React.forwardRef<ToggleButtonT, HTMLElement>(({
  children = null,
  style = {},
  selected = false,
  disabled = false,
  ...otherProps
}: ToggleButtonT, ref) => {
  const theme = useTheme();

  // ToggleButton modifies the styling if child is `Icon`
  const isIcon = isReactElement(children, 'Icon');

  const getColors = (): {|
    color: string,
    backgroundColor: string,
  |} => {
    if (selected) {
      return {
        color: theme.colors.monoInverse(),
        backgroundColor: theme.colors.secondary(-0.3),
      };
    }
    return {
      color: theme.colors.monoPrimary(),
      backgroundColor: theme.colors.monoInverse(),
    };
  };

  const styles = {
    button: () => styler(style, theme, {
      ...getColors(),
      fontSize: isIcon ? theme.fonts.heading2.px : theme.fonts.smallButton.px,
      fontWeight: theme.fonts.smallButton.style,
      lineHeight: theme.fonts.smallButton.leading,
      border: `${theme.line(1)} solid ${theme.colors[selected ? 'secondary' : 'monoMid']()}`,
      borderRadius: theme.corner(2),
      padding: `${theme.spacing(2) - (isIcon ? 1 * theme.scale : 0)}px ${theme.spacing(4)}px`,
      ...disabled
        ? {
          opacity: 0.5,
        }
        : { ...null },
    }),
  };

  return (
    <BaseButton
      {...otherProps}
      ref={ref}
      style={styles.button}
      disabled={disabled}
      focusEffect="inner"
      is-selected={selected.toString()}
    >
      {children}
    </BaseButton>
  );
});

ToggleButton.displayName = 'ToggleButton';

export default ToggleButton;

// @flow
import * as React from 'react';

import useComponentTestId from '../internal/hooks/useComponentTestId';
import hexToRgba from '../internal/hexToRgba';

import BaseButton, { type BaseButtonT } from '../BaseButton';
import Box from '../Box';
import Circle from '../Circle';
import styler from '../styler';
import useTheme from '../useTheme';
import type { StyleT } from '../types';

type ToggleSwitchT = {
  ...BaseButtonT,
  /** overrides styling for root element */
  disabled?: boolean,
  /** whether the toggle switch is enabled */
  style?: StyleT,
  /**
   * whether the toggle switch is disabled, which would apply disabled
   * styling and not trigger onClick when clicked
   */
  selected?: boolean,
  ...
};

const ToggleSwitch: React$AbstractComponent<ToggleSwitchT, HTMLElement> = React.forwardRef<ToggleSwitchT, HTMLElement>(({
  disabled = false,
  style = {},
  selected = false,
  ...otherProps
}: ToggleSwitchT, ref) => {
  const theme = useTheme();
  const compTestId = useComponentTestId('ToggleSwitch');
  const shadowOffset = 1 * theme.scale;
  const [focused, setFocus] = React.useState(false);

  const styles = {
    baseStyle: () => styler(style, theme, {
      display: 'block',
    }),
    toggleTrack: {
      background: selected ? theme.colors.secondary(0.6) : theme.colors.monoMid(),
      height: `${14 * theme.scale}px`,
      width: `${34 * theme.scale}px`,
      borderRadius: theme.corner(3),
      display: 'flex',
      alignItems: 'center',
      transition: 'background 150ms',
      ...disabled
        ? {
          opacity: 0.5,
        }
        : { ...null },
    },
    toggleHandle: {
      position: 'relative',
      left: '0',
      top: '0',
      transition: 'all 150ms',
      transform: selected ? `translateX(${(34 / 2) * theme.scale}px)` : 'translateX(-2px)',
      zIndex: 1,
    },
    circle: {
      boxShadow: `0 0 ${shadowOffset}px 0 ${hexToRgba(theme.colors.monoPrimary(), 0.12)}, 0 ${shadowOffset}px ${shadowOffset}px 0 ${hexToRgba(theme.colors.monoPrimary(), 0.24)}`,
    },
    focused: {
      position: 'absolute',
      transition: 'all 0.2s linear',
      opacity: 0.5,
      zIndex: -1,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      borderWidth: theme.spacing(4),
    },
  };

  return (
    <BaseButton
      {...otherProps}
      ref={ref}
      is-selected={selected.toString()}
      setFocus={(f) => setFocus(f)}
      disabled={disabled}
      style={styles.baseStyle}
    >
      <Box
        style={styles.toggleTrack}
      >
        <Box style={styles.toggleHandle}>
          <Circle
            size={`${20 * theme.scale}px`}
            circleColor={selected ? theme.colors.secondary() : theme.colors.monoInverse()}
            style={styles.circle}
          />
          {theme.focusEffect && focused && (
            <Circle
              data-testid={compTestId('focus-effect')}
              circleColor={theme.colors.secondary(0.6)}
              size={`${20 * theme.scale}px`}
              style={styles.focused}
            />
          )}
        </Box>
      </Box>
    </BaseButton>
  );
});

ToggleSwitch.displayName = 'ToggleSwitch';

export default ToggleSwitch;

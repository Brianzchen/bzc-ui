// @flow
import * as React from 'react';

import Box from '../Box';
import type { BoxT } from '../Box';
import computeColor from '../internal/computeColor';
import useInternallyFocused from '../internal/hooks/useInternallyFocused';
import styler from '../styler';
import useTheme from '../useTheme';

export type BaseButtonT = {
  ...BoxT,
  /** specifies the type of html button */
  type?: 'button' | 'reset' | 'submit',
  /** whether the button should be clickable */
  disabled?: boolean,
  /**
   * callback that will fire whenever the button is
   * keyboard focused or blurred
   */
  setFocus?: (boolean, Event) => void,
  /**
   * Define how you'd like the default focus effect to render. Sometimes you
   * may want it rendered within the element as opposed to around the element
   * when is a parent that can cause clipping of the focus effect
   */
  focusEffect?: 'inner' | 'outer',
  ...
};

/**
 * A basic button element with all styles removed and support starfall's styling api.
 */
const BaseButton: React$AbstractComponent<BaseButtonT, HTMLElement> = React.forwardRef<BaseButtonT, HTMLElement>(({
  children = null,
  onClick,
  style = {},
  as = 'button',
  type = 'button',
  disabled,
  setFocus,
  color,
  focusEffect = 'outer',
  ...otherProps
}: BaseButtonT, ref) => {
  const internalRef = React.useRef<HTMLElement | null>(null);
  const activeRef = ref || internalRef;

  const internalFocused = useInternallyFocused(activeRef, setFocus);

  const theme = useTheme();
  const outlineWidth = 2 * theme.scale;
  const innerLineWidth = outlineWidth / 2;

  const styles = {
    button: styler(style, theme, {
      position: 'relative',
      color: computeColor(color, theme),
      fontSize: theme.fonts.button.px,
      fontWeight: theme.fonts.button.style,
      lineHeight: theme.fonts.button.leading,
      background: 'transparent',
      border: 'none',
      padding: 0,
      margin: 0,
      textDecoration: 'none',
      ...internalFocused && !setFocus
        ? {
          outline: `${outlineWidth}px solid ${theme.colors.highlight()}`,
          ...focusEffect === 'outer'
            ? {
              ':after': {
                content: '""',
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                outline: `${innerLineWidth}px solid ${theme.colors.monoInverse()}`,
                outlineOffset: -innerLineWidth,
              },
            }
            : {
              outlineOffset: -outlineWidth,
            },
        }
        : {
          outline: 'none',
        },
      cursor: disabled ? 'default' : 'pointer',
    }),
  };

  const forwardSetFocus = as instanceof Object && as.displayName === 'Anchor';

  return (
    <Box
      {...otherProps}
      as={as}
      ref={activeRef}
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={styles.button}
      {...forwardSetFocus
        ? {
          setFocus,
        }
        : { ...null }}
    >
      {children}
    </Box>
  );
});

BaseButton.displayName = 'BaseButton';

export default BaseButton;

// @flow
import * as React from 'react';

import computeColor from '../internal/computeColor';

import Anchor from '../Anchor';
import type { AnchorT } from '../Anchor';
import type { StyleT, ThemeT } from '../types';

type Props = {
  ...AnchorT,
  /** child element inside the box */
  children?: React.Node,
  /** overrides styling for root element */
  style?: StyleT,
  /** Assign a color directly to the link text.
   * Accepts theme value `color` or `color(0.5)` as a string
   * or alternatively accepts a hexcode.
   */
  color?: string,
  /** Switch the link text between regular and underline font.
   *  underline is bold, underlined and inherits color from parent.
  */
  variant?: 'regular' | 'underline',
  ...
};

const Link: React$AbstractComponent<Props, HTMLElement> = React.forwardRef<Props, HTMLElement>(({
  children = null,
  style = {},
  color,
  variant = 'regular',
  ...otherProps
}: Props, ref) => {
  const styles = {
    anchor: (theme: ThemeT, styler) => styler(style, theme, {
      color: computeColor(variant === 'regular' ? color || 'highlight' : color, theme),
      fontWeight: theme.fonts.label.style,
      textDecoration: (variant === 'underline' ? 'underline' : 'none'),
    }),
  };

  return (
    <Anchor
      {...otherProps}
      ref={ref}
      style={styles.anchor}
    >
      {children}
    </Anchor>
  );
});

Link.displayName = 'Link';

export default Link;

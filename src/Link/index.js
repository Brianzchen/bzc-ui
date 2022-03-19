// @flow
import * as React from 'react';

import computeColor from '../internal/computeColor';

import Anchor from '../Anchor';
import type { AnchorT } from '../Anchor';
import type { ThemeT } from '../types';

type Props = {
  ...AnchorT,
  /** Switch the link text between regular and underline font.
   *  underline is bold, underlined and inherits color from parent.
  */
  variant?: 'regular' | 'underline',
  ...
};

/**
 * Renders an anchor tag styled with consistent guidelines.
 */
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

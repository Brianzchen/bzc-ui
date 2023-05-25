// @flow
import * as React from 'react';

import Paper from '../Paper';
import type { PaperT } from '../Paper';
import type { ThemeT, StylerT } from '../types';

export type CardT = {
  ...PaperT,
  /** specify the style variant of the card */
  variant?: 'primary' | 'secondary',
  ...
};

/**
 * Cards are surfaces that display content and actions on a single topic.
 */
const Card: React$AbstractComponent<CardT, HTMLElement> = React.forwardRef<CardT, HTMLElement>(({
  children = null,
  style = {},
  variant = 'primary',
  ...otherProps
}: CardT, ref) => {
  const getBackgroundColor = (theme: ThemeT) => {
    switch (variant) {
      case 'secondary':
        return theme.colors.monoLow();
      case 'primary':
      default:
        return theme.colors.monoInverse();
    }
  };

  const styles = {
    container: (theme: ThemeT, styler: StylerT) => styler(style, theme, {
      borderRadius: theme.corner(2),
      overflow: 'hidden',
      backgroundColor: getBackgroundColor(theme),
      ':bzc-max(sm)': {
        borderRadius: theme.corner(0),
      },
    }),
  };

  return (
    <Paper
      {...otherProps}
      ref={ref}
      style={styles.container}
    >
      {children}
    </Paper>
  );
});

Card.displayName = 'Card';

export default Card;

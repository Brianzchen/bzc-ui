// @flow
import * as React from 'react';

import Paper from '../Paper';
import type { PaperT } from '../Paper';
import type { StyleT, ThemeT } from '../types';

type Props = {
  ...PaperT,
  /** child element inside the component */
  children?: React.Node,
  /** overrides styling for root element */
  style?: StyleT,
  /** specify the style variant of the card */
  variant?: 'primary' | 'secondary',
  ...
};

/**
 * Cards are surfaces that display content and actions on a single topic.
 */
const Card: React$AbstractComponent<Props, HTMLElement> = React.forwardRef<Props, HTMLElement>(({
  children = null,
  style = {},
  variant = 'primary',
  ...otherProps
}: Props, ref) => {
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
    container: (theme: ThemeT, styler) => styler(style, theme, {
      borderRadius: theme.corner(2),
      overflow: 'hidden',
      backgroundColor: getBackgroundColor(theme),
      ':sf-max(sm)': {
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

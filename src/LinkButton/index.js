// @flow
import * as React from 'react';

import BaseButton from '../BaseButton';
import type { BaseButtonT } from '../BaseButton';
import type { StyleT, ThemeT } from '../types';

type Props = {
  ...BaseButtonT,
  /** child element inside the box */
  children?: React.Node,
  /** overrides styling for root element */
  style?: StyleT,
  /** Assign a color directly to the link text.
   * Accepts theme value `color` or `color(0.5)` as a string
   * or alternatively accepts a hexcode.
   */
  color?: string,
  ...
};

/**
 * Simple button component styled as a link and adheres to text sizing of it's parent
 */
const LinkButton: React$AbstractComponent<Props, HTMLElement> = React.forwardRef<Props, HTMLElement>(({
  children = null,
  style = {},
  color = 'highlight',
  ...otherProps
}: Props, ref) => {
  const styles = {
    link: (theme: ThemeT, styler) => styler(style, theme, {
      fontWeight: theme.fonts.button.style,
      fontSize: 'inherit',
      lineHeight: 'inherit',
    }),
  };

  return (
    <BaseButton
      {...otherProps}
      ref={ref}
      style={styles.link}
      color={color}
    >
      {children}
    </BaseButton>
  );
});

LinkButton.displayName = 'LinkButton';

export default LinkButton;

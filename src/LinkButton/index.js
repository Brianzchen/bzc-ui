// @flow
import * as React from 'react';

import BaseButton from '../BaseButton';
import type { BaseButtonT } from '../BaseButton';

type Props = {
  ...BaseButtonT,
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
    link: (theme, styler) => styler(style, theme, {
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

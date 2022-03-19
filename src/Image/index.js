// @flow
import * as React from 'react';

import Box from '../Box';
import type { BoxT } from '../Box';
import styler from '../styler';
import useTheme from '../useTheme';

type Props = {
  ...BoxT,
  /** Specifies the path to the image */
  src: string,
  /** Specifies an alternate text for an image */
  alt: string,
  height?: string | number,
  width?: string | number,
  ...
};

/**
 * A simple wrapper component of the `img` tag to enable more efficient development while exposing the starfall style engine.
 *
 * This component requires `src` and `alt` props to be supplied through it's type checkers to ensure accessibility best practices.
 */
const Image: React$AbstractComponent<Props, HTMLElement> = React.forwardRef<Props, HTMLElement>(({
  style = {},
  ...otherProps
}: Props, ref) => {
  const theme = useTheme();

  const styles = {
    image: styler(style, theme, {
      maxWidth: '100%',
    }),
  };

  return (
    <Box
      {...otherProps}
      ref={ref}
      as="img"
      style={styles.image}
    />
  );
});

Image.displayName = 'Image';

export default Image;

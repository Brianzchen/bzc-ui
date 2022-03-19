// @flow
import * as React from 'react';

import usePositioning from '../internal/hooks/usePositioning';

import Box from '../Box';
import type { BoxT } from '../Box';
import styler from '../styler';
import useTheme from '../useTheme';

import type { TypePropT } from './types';
import compileSizeType from './compileSizeType';
import genStringTree from './genStringTree';
import getAsTag from './getAsTag';

export type TypographyT = {
  ...BoxT,
  /** accepts either a string or an object that will
   * set the size, leading and weight of the text.
   * Using an object will allow for more fine grained control
   * over the font type at various starfall defined breakpoints.
   * Each object property accepts one of the predefined font
   * types as a string
   */
  type?: TypePropT,
  /** set the default display style property to `inline`. Default is `block` */
  inline?: boolean,
  /**
   * disable Typography's dynamic text rendering
   */
  stringParse?: boolean,
  /**
   * Internal prop passed from `Tooltip` to let `Typography`
   * know it should render aligning to tooltip design standards.
   */
  parent?: 'tooltip',
  ...
};

/**
 * An atomic component that allows you to easily implement the typography patterns defined in the system,
 * which includes `font-size`, `font-weight`, and `line-height`.
 * While still exposing the starfall styling solution to easily position or color your text.
 */
const Typography: React$AbstractComponent<TypographyT, HTMLElement> = React.forwardRef<TypographyT, HTMLElement>(({
  children = null,
  style = {},
  type = 'body',
  inline = false,
  color,
  stringParse = true,
  as = 'span',
  parent,
  ...otherProps
}: TypographyT, ref) => {
  const theme = useTheme();

  const [renderedAs, setRenderedAs] = React.useState(getAsTag(type, as, theme));

  usePositioning(() => {
    const asTag = getAsTag(type, as, theme);
    if (asTag !== renderedAs) {
      setRenderedAs(asTag);
    }
  });

  const styles = {
    text: () => {
      const {
        sm,
        md,
        lg,
      } = compileSizeType(type, theme);

      return styler(style, theme, {
        display: inline ? 'inline' : 'block',
        fontSize: lg.px,
        fontWeight: lg.style,
        lineHeight: lg.leading,
        margin: 0,
        ':sf-max(sm)': {
          ...sm
            ? {
              fontSize: sm.px,
              fontWeight: sm.style,
              lineHeight: sm.leading,
            }
            : {},
        },
        ':sf-max(md)': {
          ...md
            ? {
              fontSize: md.px,
              fontWeight: md.style,
              lineHeight: md.leading,
            }
            : {},
        },
      });
    },
  };

  return (
    <Box
      {...otherProps}
      as={renderedAs}
      ref={ref}
      style={styles.text}
      color={color}
    >
      {stringParse
        ? React.Children.map(children, (child) => (
          typeof child === 'string'
            ? genStringTree(child, { underline: parent === 'tooltip' })
            : child
        ))
        : children}
    </Box>
  );
});

Typography.displayName = 'Typography';

export default Typography;

// @flow
import * as React from 'react';

import useInternallyFocused from '../internal/hooks/useInternallyFocused';
import Box from '../Box';
import type { BoxT } from '../Box';
import styler from '../styler';
import useTheme from '../useTheme';
import type { StyleT } from '../types';

export type AnchorT = {
  ...BoxT,
  /** child element inside the a tag */
  children?: React.Node,
  /** pass in an html semantic tag as a string or component to override the default rendered tag */
  as?: any,
  /** attaches target="_blank" attribute to the component */
  newTab?: boolean,
  /** overrides styling for root element */
  style?: StyleT,
  /** specifies where to open the linked document */
  target?: string,
  /** specifies the relationship between the current document and the linked document */
  rel?: string,
  /**
   * callback that will fire whenever the anchor is
   * keyboard focused or blurred
   */
  setFocus?: (boolean, Event) => void,
  ...
};

/**
 * The <Anchor /> tag is an unstyled wrapper of the html <a /> tag.
 *
 * This component provides the flexibility of wrapping other custom components to
 * give capabilities of page navigation.
 */
const Anchor: React$AbstractComponent<AnchorT, HTMLElement> = React.forwardRef<AnchorT, HTMLElement>(({
  children = null,
  as,
  newTab = false,
  style = {},
  target,
  rel,
  setFocus,
  ...otherProps
}: AnchorT, ref) => {
  const internalRef = React.useRef<HTMLElement | null>(null);
  const activeRef = ref || internalRef;
  const theme = useTheme();
  const outlineWidth = 2 * theme.scale;
  const innerLineWidth = outlineWidth / 2;

  const internalFocused = useInternallyFocused(activeRef, setFocus);

  const styles = {
    container: styler(style, theme, {
      position: 'relative',
      fontSize: 'inherit',
      textDecoration: 'none',
      ...internalFocused && !setFocus
        ? {
          outline: `${outlineWidth}px solid ${theme.colors.highlight()}`,
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
        : { ...null },
    }),
  };

  return (
    <Box
      {...otherProps}
      ref={activeRef}
      as={typeof as === 'undefined' ? 'a' : as}
      style={styles.container}
      {...newTab
        ? {
          target: target || '_blank',
          rel: rel || 'noreferrer noopener',
        }
        : {
          target,
          rel,
        }
      }
    >
      {children}
    </Box>
  );
});

Anchor.displayName = 'Anchor';

export default Anchor;

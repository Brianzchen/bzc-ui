// @flow
import * as React from 'react';

import usePositioning from '../internal/hooks/usePositioning';

import Box, { type BoxT } from '../Box';
import useTheme from '../useTheme';

type BreakPointsT = {
  mobile?: number,
  tablet?: number,
  [key: string]: number,
  ...
};

type InternalBreakpointsT = {
  mobile: boolean,
  tablet: boolean,
  [key: string]: boolean,
  ...
};

export type ResponsiveT = {
  ...BoxT,
  /**
   * Object of breakpoint values which should be numbers where if the width
   * of the container is
   * less than or equal to the value, the corresponding children value will
   * be given true
   */
  breakpoints?: BreakPointsT,
  /**
   * Render function passing back an object with the same structure as breakpoints
   */
  children?: (InternalBreakpointsT) => React.Node,
  ...
};

/**
 * Handles responsive design from a container level.
 *
 * When you want to shift elements within a container based on screen resolution
 * only to find that it's not reliable because you have a side panel.
 * **Responsive** handles this by telling its children once itself
 * has hit a given breakpoint that this components parent defines.
 */
const Responsive: React$AbstractComponent<ResponsiveT, HTMLElement> = React.forwardRef<ResponsiveT, HTMLElement>(({
  breakpoints = {},
  children,
  ...otherProps
}: ResponsiveT, ref) => {
  const internalRef = React.useRef();
  const activeRef = ref ?? internalRef;
  const theme = useTheme();

  const [width, setWidth] = React.useState<number | void>();

  usePositioning(() => {
    let cacheWidth;
    if (activeRef.current instanceof HTMLElement) {
      const { width: newWidth } = activeRef.current.getBoundingClientRect();
      if (newWidth !== width && newWidth !== cacheWidth) {
        cacheWidth = newWidth;
        setWidth(newWidth);
      }
    }
  });

  const { mobile, tablet } = breakpoints;

  const internalBreakpoints = {
    ...breakpoints,
    mobile: mobile ?? theme.mobileWidth,
    tablet: tablet ?? theme.tabletWidth,
  };
  const breakpointMap = Object.keys(internalBreakpoints).map((o) => ({
    key: o,
    value: !!width && width <= internalBreakpoints[o],
  })).reduce<InternalBreakpointsT>((acc, cur) => ({
    ...acc,
    [`${cur.key}`]: cur.value,
  }), ({
    mobile: false,
    tablet: false,
  }: InternalBreakpointsT));

  return (
    <Box
      {...otherProps}
      ref={activeRef}
    >
      {typeof width !== 'undefined' && children && children(breakpointMap)}
    </Box>
  );
});

Responsive.displayName = 'Responsive';

export default Responsive;

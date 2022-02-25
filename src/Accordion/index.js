// @flow
import * as React from 'react';

import Box from '../Box';
import type { BoxT } from '../Box';
import usePrevious from '../internal/hooks/usePrevious';
import usePositioning from '../internal/hooks/usePositioning';
import type { StyleT } from '../types';

type AccordionContextT = {|
  nested: boolean,
  heightChanged: ((boolean) => boolean) => void,
|};

const AccordionContext = React.createContext<AccordionContextT>({
  nested: false,
  heightChanged: () => {},
});

type Props = {
  ...BoxT,
  /** child element inside the accordion */
  children?: React.Node,
  /**
   * render function that can be used in replacement to children
   * for more complicated child use cases where the child will dynamically change
   * height over time. The function will be passed a `trackHeight` function that
   * can be called when the child knows it's height may need to be recalculated by
   * the accordion
   */
  render?: ({|
    trackHeight: () => void,
  |}) => React.Node,
  /** whether or not the accordion should be showing it's content */
  open?: boolean,
  /** overrides styling for root element */
  style?: StyleT,
  /** overrides styling for inner element */
  innerStyle?: StyleT,
  ...
};

/**
 * An atomic component that provides a smooth opening and closing effect.
 */
const Accordion: React$AbstractComponent<Props, HTMLElement> = React.forwardRef<Props, HTMLElement>(({
  children = null,
  render,
  open = true,
  style = {},
  innerStyle = {},
  ...otherProps
}: Props, ref) => {
  const containerRef = React.useRef<HTMLElement | null>(null);
  const activeRef = ref || containerRef;

  const accordionContext = React.useContext(AccordionContext);

  const [maxHeight, setMaxHeight] = React.useState(0);
  const [height, setHeight] = React.useState('auto');
  const [, trackHeightChanged] = React.useState(false);

  const currMaxHeight = open ? maxHeight : 0;
  const prevCurrMaxHeight: number = usePrevious(currMaxHeight);

  const recalculateHeight = () => {
    if (activeRef.current instanceof HTMLElement) {
      const { height: newHeight } = activeRef.current.children[0].getBoundingClientRect();
      if (newHeight !== maxHeight) {
        setMaxHeight(newHeight);
      }
    }
  };

  usePositioning(() => {
    recalculateHeight();
  });

  React.useEffect(() => {
    const timeout = setTimeout(recalculateHeight, 0);

    return () => {
      clearTimeout(timeout);
    };
  });

  React.useEffect(() => {
    if (activeRef.current instanceof HTMLElement
        && accordionContext.nested
        && prevCurrMaxHeight !== currMaxHeight) {
      accordionContext.heightChanged((pTrack) => !pTrack);
    }
  }, [activeRef, prevCurrMaxHeight, currMaxHeight, accordionContext.nested]);

  React.useEffect(() => {
    // if the old maxHeight is greater
    // than current max height, then I want to
    // not change the height
    if (currMaxHeight !== 0) {
      if (prevCurrMaxHeight < currMaxHeight) {
        setHeight(currMaxHeight);
      }
    }
  }, [currMaxHeight]);

  const contextValue = React.useMemo(() => ({
    nested: true,
    heightChanged: trackHeightChanged,
  }), [trackHeightChanged]);

  const styles = {
    accordion: (theme, styler) => styler(style, theme, {
      overflow: 'hidden',
      height: open ? height : 'auto',
      maxHeight: currMaxHeight,
      ...accordionContext.nested
        ? { ...null }
        : {
          transition: 'max-height 0.2s ease-out',
        },
    }),
    inner: (theme, styler) => styler(innerStyle, theme, {
      overflow: 'auto',
    }),
  };

  return (
    <Box
      {...otherProps}
      ref={activeRef}
      style={styles.accordion}
    >
      <Box
        style={styles.inner}
      >
        <AccordionContext.Provider
          value={contextValue}
        >
          {children ?? (render && render({
            trackHeight: () => trackHeightChanged((pTrack) => !pTrack),
          }))}
        </AccordionContext.Provider>
      </Box>
    </Box>
  );
});

Accordion.displayName = 'Accordion';

export default Accordion;

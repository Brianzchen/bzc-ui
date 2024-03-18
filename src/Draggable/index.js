// @flow
import * as React from 'react';

import useActiveRef from '../internal/hooks/useActiveRef';

import Box, { type BoxT } from '../Box';
import type { ThemeT, StylerT } from '../types';

type ValueT = any;

export type DraggableT = {
  ...BoxT,
  /** rendered child to drag around */
  children?: React.Node,
  /** value to be passed back when drop occurs */
  value?: ValueT,
  /**
   * trigged when mouseup occurs after the
   * draggable element has been picked up.
   * passes `({ value, x, y })` back to the caller
   */
  onDrop?: (details: {|
    value: ValueT, x: number, y: number,
  |}) => void,
  /** trigged when mousedown occurs on the root element */
  onMouseDown?: (event?: SyntheticEvent<HTMLElement>, ...args: Array<any>) => any,
  ...
};

/**
 * A wrapper component that allows for picking up an element and dropping it
 * somewhere else.
 * It exposes an `onDrop` function that provides value and coordinates to
 * allow a parent to pop the component from it's original location and render
 * it elsewhere.
 */
const Draggable: React$AbstractComponent<DraggableT, HTMLElement> = React.forwardRef<DraggableT, HTMLElement>(({
  children = null,
  value,
  onDrop,
  style = {},
  onMouseDown,
  ...otherProps
}: DraggableT, ref) => {
  const activeRef = useActiveRef(ref);
  const [dragging, setDragging] = React.useState(false);
  const [coord, setCoord] = React.useState<{| x: number, y: number |} | void>();

  React.useEffect(() => {
    const onMovement = (event: MouseEvent) => {
      if (activeRef.current instanceof HTMLElement) {
        const { height, width } = activeRef.current.getBoundingClientRect();
        const { clientX, clientY } = event;
        if (dragging) {
          setCoord({
            x: clientX - (width / 2),
            y: clientY - (height / 2),
          });
        }
      }
    };

    if (dragging) {
      window.addEventListener('mousemove', onMovement);
    }

    return () => {
      if (dragging) {
        window.removeEventListener('mousemove', onMovement);
      }
    };
  }, [dragging]);

  React.useEffect(() => {
    const onDragComplete = (event: MouseEvent) => {
      setDragging(false);
      setCoord();
      const { clientX, clientY } = event;
      onDrop && onDrop({
        value,
        x: clientX,
        y: clientY,
      });
    };

    if (dragging) {
      window.addEventListener('mouseup', onDragComplete);
    }

    return () => {
      if (dragging) {
        window.removeEventListener('mouseup', onDragComplete);
      }
    };
  }, [dragging]);

  const styles = {
    draggable: (theme: ThemeT, styler: StylerT) => styler(style, theme, {
      ...coord
        ? {
          position: 'fixed',
          top: coord.y,
          left: coord.x,
          zIndex: theme.elevations.hover,
        }
        : {
          position: 'initial',
        },
      userSelect: 'none',
    }),
  };

  return (
    <Box
      {...otherProps}
      ref={activeRef}
      style={styles.draggable}
      onMouseDown={(e: SyntheticEvent<HTMLElement>) => {
        onMouseDown && onMouseDown(e);
        setDragging(true);
      }}
    >
      {children}
    </Box>
  );
});

Draggable.displayName = 'Draggable';

export default Draggable;

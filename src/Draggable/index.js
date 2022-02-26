// @flow
import * as React from 'react';

import Box, { type BoxT } from '../Box';
import type { StyleT } from '../types';

type ValueT = any;

type Props = {
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
  /** overrides styling for root element */
  style?: StyleT,
  /** trigged when mousedown occurs on the root element */
  onMouseDown?: (...args: Array<any>) => any,
  ...
};

/**
 * A wrapper component that allows for picking up an element and dropping it
 * somewhere else.
 * It exposes an `onDrop` function that provides value and coordinates to
 * allow a parent to pop the component from it's original location and render
 * it elsewhere.
 */
const Draggable: React$AbstractComponent<Props, HTMLElement> = React.forwardRef<Props, HTMLElement>(({
  children = null,
  value,
  onDrop,
  style = {},
  onMouseDown,
  ...otherProps
}: Props, ref) => {
  const internalRef = React.useRef();
  const activeRef = ref || internalRef;
  const [dragging, setDragging] = React.useState(false);
  const [coord, setCoord] = React.useState();

  React.useEffect(() => {
    const onMovement = (event) => {
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
    const onDragComplete = (event) => {
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
    draggable: (theme, styler) => styler(style, theme, {
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
      onMouseDown={(e) => {
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

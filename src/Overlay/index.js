// @flow
import React, { useRef } from 'react';
import type { Node } from 'react';
import { createPortal } from 'react-dom';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import hexToRgb from '../internal/hexToRgba';

import Box from '../Box';
import type { BoxT } from '../Box';
import styler from '../styler';
import useTheme from '../useTheme';
import type { RefObjT, StyleT } from '../types';

// On a mobile device that has an address bar. When the user scrolls down
// the address bar will scroll away, but as the user is scrolling the frame is
// frozen and the user will get a glimpse of the elements behind the ModalBackground
// which looks quite ugly. This extra padding is there for that reason to
// eliminate this effect.
export const mobileLowerPadding = '100px';

type Props = {
  ...BoxT,
  /** anything you want to render on top of the background */
  children?: Node,
  /** overrides styling for root element */
  style?: StyleT,
  /** callback function which will trigger when the background is clicked */
  onClick?: (...args: Array<any>) => any,
  ...
};

const Overlay: React$AbstractComponent<Props, HTMLElement> = React.forwardRef<Props, HTMLElement>(({
  children = null,
  style = {},
  onClick,
  ...otherProps
}: Props, ref: RefObjT) => {
  const theme = useTheme();

  const backgroundRef = useRef();
  const activeRef = ref || backgroundRef;

  React.useEffect(() => {
    const { current } = activeRef;
    if (current instanceof HTMLElement) {
      disableBodyScroll(current);
    }

    return () => {
      if (current instanceof HTMLElement) {
        enableBodyScroll(current);
      }
    };
  }, []);

  const handleClick = (event) => {
    if (activeRef.current && event.target === activeRef.current) {
      onClick && onClick(event);
    }
  };

  const styles = {
    background: styler(style, theme, {
      position: 'fixed',
      top: 0,
      left: 0,
      paddingBottom: mobileLowerPadding,
      height: `calc(100% + ${mobileLowerPadding})`,
      width: '100%',
      backgroundColor: hexToRgb(theme.colors.monoPrimary(), 0.5),
      zIndex: theme.elevations.modal,
      lineHeight: 1.4,
    }),
  };

  if (document.body) {
    return createPortal(
      <Box
        {...otherProps}
        ref={activeRef}
        onClick={handleClick}
        style={styles.background}
      >
        {children}
      </Box>,
      document.body,
    );
  }

  return null;
});

Overlay.displayName = 'Overlay';

export default Overlay;

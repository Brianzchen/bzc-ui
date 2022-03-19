// @flow
import * as React from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import useEsc from '../internal/hooks/useEsc';

import Paper from '../Paper';
import type { PaperT } from '../Paper';
import ClickAwayListener from '../ClickAwayListener';
import type { RefObjT, ThemeT } from '../types';

type Props = {
  ...PaperT,
  /** renders the drawer's opened width */
  width?: number | string,
  /** set the top offset */
  offsetTop?: number | string,
  /** set the bottom offset */
  offsetBottom?: number | string,
  /** anchors the drawer and specifies which side it will open from */
  anchor?: 'left' | 'right',
  /** check if the drawer is open */
  open?: boolean,
  /**
   * triggers when user clicks outside of the drawer
   */
  onClose?: (...args: Array<any>) => any,
  /**
   * elements outside the child that you don't want triggering
   * the onClickAway function if it's clicked
   */
  exclusions?: Array<HTMLElement | null>,
  ...
};

/**
 * Drawers can be toggled open or closed, the drawer can be closed by clicking away from the object
 */
const Drawer: React$AbstractComponent<Props, HTMLElement> = React.forwardRef<Props, HTMLElement>(({
  children = null,
  style = {},
  width,
  offsetTop = 0,
  offsetBottom = 0,
  anchor = 'left',
  open = true,
  onClose,
  exclusions,
  ...otherProps
}: Props, ref: RefObjT) => {
  const containerRef = React.useRef();
  const activeRef = ref || containerRef;

  useEsc(open, onClose);

  React.useEffect(() => {
    const { current } = activeRef;
    if (open && current instanceof HTMLElement) {
      disableBodyScroll(current);
    }

    return () => {
      if (open && current instanceof HTMLElement) {
        enableBodyScroll(current);
      }
    };
  }, [open]);

  const openAnimation = {
    '0%': {
      transform: (anchor === 'left' ? 'translateX(-100%)' : 'translateX(100%)'),
    },
    '100%': {
      transform: 'translateX(0)',
    },
  };

  const animationBaseStyles = {
    animationDuration: '0.2s',
    animationTimingFunction: 'ease-out',
    animationIterationCount: 1,
  };

  const styles = {
    paper: (theme: ThemeT, styler) => styler(style, theme, {
      width: width ?? 320 * theme.scale,
      top: offsetTop,
      bottom: offsetBottom,
      display: 'block',
      overflow: 'auto',
      position: 'fixed',
      background: theme.colors.monoInverse(),
      zIndex: theme.elevations.drawer,
      left: anchor === 'left' ? 0 : 'auto',
      right: anchor === 'left' ? 'auto' : 0,
      animationName: openAnimation,
      ...animationBaseStyles,
    }),
  };

  return open && (
    <ClickAwayListener
      onClickAway={onClose}
      exclusions={exclusions}
    >
      <Paper
        {...otherProps}
        ref={activeRef}
        style={styles.paper}
        elevation="modal"
      >
        {children}
      </Paper>
    </ClickAwayListener>
  );
});

Drawer.displayName = 'Drawer';

export default Drawer;

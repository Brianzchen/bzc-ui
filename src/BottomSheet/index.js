// @flow
import * as React from 'react';

import useEsc from '../internal/hooks/useEsc';

import Box from '../Box';
import Overlay from '../Overlay';
import Paper from '../Paper';
import type { PaperT } from '../Paper';
import styler from '../styler';
import useTheme from '../useTheme';
import type { StyleT } from '../types';

import Header from './Header';

type Props = {
  ...PaperT,
  /**
   * content to render in the component
   */
  children?: React.Node,
  /**
   * the title to render
   */
  title?: React.Node,
  /**
   * render the title left or center aligned
   */
  titleAlignment?: 'center' | 'left',
  /**
   * whether it should render
   */
  open?: boolean,
  /**
   * function to call to close the component
   */
  onClose?: () => void,
  /**
   * overrides styling for root element
   */
  style?: StyleT,
  /**
   * overrides styling for overlay element
   */
  overlayStyle?: StyleT,
  /**
   * overrides styling for title element
   */
  titleStyle?: StyleT,
  /**
   * overrides styling for body element
   */
  bodyStyle?: StyleT,
  ...
};

const BottomSheet: React$AbstractComponent<Props, HTMLElement> = React.forwardRef<Props, HTMLElement>(({
  children = null,
  title = null,
  titleAlignment = 'center',
  open = false,
  onClose,
  overlayStyle = {},
  titleStyle = {},
  bodyStyle = {},
  style = {},
  hideElm,
  ...otherProps
}: Props, ref) => {
  const theme = useTheme();

  useEsc(open, onClose);

  const containerKeyframe = {
    '0%': {
      maxHeight: 0,
    },
    '100%': {
      // This is not so great because makes the animation take longer than the actual content
      // If the content is small the animation will be much quicker than 1s
      // But if the content is maxed out, it will be 1s exactly.
      maxHeight: `calc(100% - ${theme.spacing(9)}px)`,
    },
  };

  const styles = {
    container: styler(style, theme, {
      position: 'fixed',
      bottom: 0,
      right: 0,
      left: 0,
      display: 'flex',
      flexDirection: 'column',
      animationName: [containerKeyframe],
      animationDuration: '1s',
      animationIterationCount: 1,
      animationFillMode: 'forwards',
      padding: theme.spacing(4),
      borderTopRightRadius: theme.corner(3),
      borderTopLeftRadius: theme.corner(3),
    }),
    body: styler(bodyStyle, theme, {
      flex: 1,
      overflow: 'auto',
    }),
  };

  return open && (
    <Overlay
      data-testid="sf-bottom-sheet-overlay"
      style={overlayStyle}
      onClick={onClose}
      hideElm={hideElm}
    >
      <Paper
        {...otherProps}
        ref={ref}
        style={styles.container}
        elevation="modal"
      >
        <Header
          title={title}
          alignment={titleAlignment}
          titleStyle={titleStyle}
          onClose={onClose}
        />
        <Box
          data-testid="sf-bottom-sheet-body"
          style={styles.body}
        >
          {children}
        </Box>
      </Paper>
    </Overlay>
  );
});

BottomSheet.displayName = 'BottomSheet';

export default BottomSheet;

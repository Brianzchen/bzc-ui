// @flow
import * as React from 'react';

import useComponentTestId from '../internal/hooks/useComponentTestId';

import Overlay, { mobileLowerPadding } from '../Overlay';
import Notification from '../Notification';
import Paper, { type PaperT } from '../Paper';
import Stack from '../Stack';
import styler from '../styler';
import useTheme from '../useTheme';
import type { NotificationVariantT, RefObjT, StyleT } from '../types';

import Header from './Header';

const getBodyMaxHeight = (headerHeight: number, paddingHeight: number) => (
  window.innerHeight - headerHeight - paddingHeight
);

export type ModalT = {
  ...PaperT,
  /** title for the modal, omitting this will hide the title bar */
  title?: string,
  /** whether or not the modal should be shown or hidden */
  open?: boolean,
  /**
   * callback function called usually tied to setting state to close
   * the modal, trigger when background or close button in title is clicked
   */
  onClose?: (...args: Array<any>) => void,
  /** determine the size of the modal and how to react responsively */
  variant?: 'message' | 'form',
  /** specifies the height of the header */
  headerHeight?: number,
  /** overrides mobile styling for root modal element */
  mobileStyle?: StyleT,
  /** overrides styling for the body content, the white space */
  bodyStyle?: StyleT,
  /** overrides styling for the background element */
  backgroundStyle?: StyleT,
  /** overrides styling for the header element */
  headerStyle?: StyleT,
  /** The text to be applies the notification above the header and also enables it */
  notificationText?: React.Node,
  /** Defines the variant of notification such as error state */
  notificationVariant?: NotificationVariantT,
  /** overrides styling for the notification if also enabled */
  notificationStyle?: StyleT,
  bodyStackSpacing?: string | number,
  ...
};

/**
 * A general purpose popup with many configurations available.
 */
const Modal: React$AbstractComponent<ModalT, HTMLElement> = React.forwardRef<ModalT, HTMLElement>(({
  children = null,
  title = '',
  open: propsOpen,
  onClose,
  variant = 'form',
  headerHeight: hHeight = 74,
  style = {},
  mobileStyle = {},
  bodyStyle = {},
  backgroundStyle = {},
  headerStyle = {},
  notificationText,
  notificationVariant = 'note',
  notificationStyle = {},
  hideElm,
  bodyStackSpacing,
  ...otherProps
}: ModalT, ref: RefObjT) => {
  const containerRef = React.useRef();
  const activeRef = ref || containerRef;
  const theme = useTheme();
  const compTestId = useComponentTestId('Modal');

  const open = typeof propsOpen === 'undefined' ? true : propsOpen;

  const isLarge = variant === 'form';
  const headerHeight = hHeight * theme.scale;

  const [mouseDownEle, setMouseDownEle] = React.useState<EventTarget | void>();
  const [mouseUpEle, setMouseUpEle] = React.useState<EventTarget | void>();
  const [bodyMaxHeight, setBodyMaxHeight] = React.useState(
    getBodyMaxHeight(
      title ? headerHeight : 0,
      isLarge ? 0 : theme.spacing(4) * 2,
    ),
  );

  // Define first focused element
  const getFocusableElements = (curr: HTMLElement) => (
    // $FlowFixMe[method-unbinding]
    Array.prototype.slice.call(curr.querySelectorAll(
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]',
    ))
  );

  // Adjust the height of modal as screen size changes
  React.useEffect(() => {
    const recalculateBodyMaxHeight = () => {
      setBodyMaxHeight(getBodyMaxHeight(
        title ? headerHeight : 0,
        isLarge ? 0 : theme.spacing(4) * 2,
      ));
    };

    window.addEventListener('resize', recalculateBodyMaxHeight);

    return () => {
      window.removeEventListener('resize', recalculateBodyMaxHeight);
    };
  });

  // Accessibility focus when user open and closes the modal
  React.useEffect(() => {
    // Element to return focus after closing modal
    const focusedElBeforeOpen = document.activeElement;

    const { current } = activeRef;

    if (current instanceof HTMLElement && open) {
      const focusableEls = getFocusableElements(current);
      const firstFocusedEl = title && onClose
        ? focusableEls[1] || focusableEls[0]
        : focusableEls[0];

      if (firstFocusedEl) {
        firstFocusedEl.focus();
      }
    }

    return () => {
      if (open) {
        focusedElBeforeOpen && focusedElBeforeOpen.focus();
      }
    };
  }, [open]);

  // Track keyboard handlers
  React.useEffect(() => {
    // Prevent tabbing out of modal
    let handleKeyDown;

    if (activeRef.current instanceof HTMLElement && open) {
      const focusableEls = getFocusableElements(activeRef.current);

      // Prevent tabbing out of modal
      handleKeyDown = (event: KeyboardEvent) => {
        const tabKey = 9;
        const escKey = 27;

        switch (event.keyCode) {
          case tabKey: {
            if (focusableEls.length === 0) {
              event.preventDefault();
              break;
            }

            const firstEl = focusableEls[0];
            if (focusableEls.length === 1) {
              event.preventDefault();
              firstEl.focus();
              break;
            }

            const lastEl = focusableEls[focusableEls.length - 1];

            if (event.shiftKey) {
              if (document.activeElement === firstEl) {
                event.preventDefault();
                lastEl.focus();
              }
            } else if (document.activeElement === lastEl) {
              event.preventDefault();
              firstEl.focus();
            }
            break;
          }
          case escKey:
            onClose && onClose();
            break;
          default:
            break;
        }
      };
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (open && handleKeyDown) {
        document.removeEventListener('keydown', handleKeyDown);
      }
    };
  });

  // Track element that is interacted with during mousedown and mouseup
  React.useEffect(() => {
    const trackMouseDown: MouseEventListener = (event) => {
      setMouseDownEle(event.target);
    };

    const trackMouseUp: MouseEventListener = (event) => {
      setMouseUpEle(event.target);
    };

    if (open) {
      window.addEventListener('mousedown', trackMouseDown);
      window.addEventListener('mouseup', trackMouseUp);
    }

    return () => {
      window.removeEventListener('mousedown', trackMouseDown);
      window.removeEventListener('mouseup', trackMouseUp);
    };
  });

  const handleClose = (isOverlay: boolean = false) => (
    event: SyntheticEvent<HTMLButtonElement>,
  ) => {
    // Only close if user is confidently clicking on a close element
    // test note: Cannot reliably test mouse events with jest so we remove this check during testing
    if ((isOverlay ? (event.target === mouseDownEle && event.target === mouseUpEle) : true)
        || process.env.NODE_ENV === 'test') {
      onClose && onClose(event);
    }
  };

  const bodyPadding = `${theme.spacing(5)}px`;
  const mediaMobile = `@media (max-width: ${theme.mobileWidth}px)`;

  const backgroundKeyframe = {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  };

  const containerKeyframe = {
    '0%': {
      transform: 'scale(0.8)',
    },
  };

  const animationBaseStyles = {
    animationDuration: '0.1s',
    animationIterationCount: 1,
  };

  const styles = {
    background: styler(backgroundStyle, theme, {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      ...isLarge
        ? {
          [mediaMobile]: {
            ':st-min(sm)': {
              flexDirection: 'column',
            },
          },
        }
        : {
          flexDirection: 'column',
          padding: `${theme.spacing(4)}px ${theme.spacing(4)}px calc(${theme.spacing(4)}px + ${mobileLowerPadding}) ${theme.spacing(4)}px`,
        },
      animationName: [backgroundKeyframe],
      ...animationBaseStyles,
      [mediaMobile]: {
        ...isLarge
          ? {
            alignItems: 'normal',
          }
          : {},
      },
    }),
    container: styler(style, theme, {
      backgroundColor: theme.colors.monoInverse(),
      maxHeight: '100%',
      lineHeight: 1.4,
      width: isLarge ? `${520 * theme.scale}px` : `${375 * theme.scale}px`,
      maxWidth: '100%',
      borderRadius: theme.corner(2),
      animationName: [containerKeyframe],
      ...animationBaseStyles,
      [mediaMobile]: {
        ...styler(mobileStyle, theme, {
          ...isLarge
            ? {
              top: 0,
              left: 0,
              paddingBottom: mobileLowerPadding,
              maxHeight: `calc(100% + ${mobileLowerPadding})`,
              height: `calc(100% + ${mobileLowerPadding})`,
              width: '100%',
              borderRadius: theme.corner(0),
            }
            : {},
        }),
      },
    }),
    body: styler(bodyStyle, theme, {
      position: 'relative',
      fontSize: theme.fonts.body.px,
      fontWeight: theme.fonts.body.style,
      lineHeight: theme.fonts.body.leading,
      padding: `${title ? `${theme.spacing(3)}px` : bodyPadding} ${bodyPadding} ${bodyPadding}`,
      maxHeight: `${bodyMaxHeight}px`,
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      [mediaMobile]: {
        ...isLarge
          ? {
            height: `${bodyMaxHeight}px`,
          }
          : {},
      },
    }),
    notification: styler(notificationStyle, theme, {
      margin: `${theme.spacing(3)}px ${theme.spacing(5)}px`,
    }),
  };

  return open && (
    <Overlay
      data-testid={compTestId('overlay')}
      style={styles.background}
      onClick={handleClose(true)}
      hideElm={hideElm}
    >
      <Paper
        {...otherProps}
        ref={activeRef}
        role="dialog"
        aria-labelledby="st-modal-title"
        style={styles.container}
      >
        {
          title
          && (
            <Header
              height={headerHeight}
              compTestId={compTestId}
              onClose={onClose ? handleClose() : undefined}
              style={headerStyle}
            >
              {title}
            </Header>
          )
        }
        {
          notificationText
          && (
            <Notification
              data-testid={compTestId('notification')}
              variant={notificationVariant}
              style={styles.notification}
            >
              {notificationText}
            </Notification>
          )
        }
        <Stack
          style={styles.body}
          space={bodyStackSpacing}
        >
          {children}
        </Stack>
      </Paper>
    </Overlay>
  );
});

Modal.displayName = 'Modal';

export default Modal;

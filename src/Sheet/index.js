// @flow
import * as React from 'react';

import usePositioning from '../internal/hooks/usePositioning';

import ClickAwayListener from '../ClickAwayListener';
import Paper from '../Paper';
import type { PaperT } from '../Paper';
import styler from '../styler';
import useTheme from '../useTheme';
import type { RefObjT } from '../types';

import Child from './Child';
import type { RenderT } from './Child';

type DirectionT = {|
  vertical: 'top' | 'bottom',
  horizontal: 'left' | 'right',
  [key: string]: any,
|};

export type SheetT = {
  ...PaperT,
  /**
   * Accepts a render func to render, that expects a React Node to be returned.
   * (onClose: Function, attachRef: RefObjT, sheetRef: RefObjT) => React.Node
   */
  children?: RenderT,
  /**
   * Function to be called when the user presses esc key
   * or outside of the sheet while it's rendered
  */
  onClose?: (...args: Array<any>) => any,
  /**
   * React reference of the element to attach to.
   * onClose will not trigger when the ref element is clicked
   */
  attachRef: RefObjT,
  /**
   * A useful function if you want to track the direction
   * the sheet is facing relative to the attach element.
   * Will be called any time the direction changes.
   * ({ vertical: 'top' | 'bottom', horizontal: 'left' | 'right' }) => void
   */
  onDirectionChange?: (DirectionT) => void,
  /**
   * elements outside the sheet that you don't want triggering
   * the onClose function if it's clicked
   */
   exclusions?: Array<HTMLElement | null>,
  ...
};

/**
 * An elevated element that hooks to another element with a reference.
 *
 * Will automatically position itself based on element positioning and screen real estate.
 */
const Sheet: React$AbstractComponent<SheetT, HTMLElement> = React.forwardRef(({
  children,
  style = {},
  onClose,
  attachRef,
  onDirectionChange,
  exclusions = [],
  ...otherProps
}: SheetT, ref) => {
  const internalRef = React.useRef();
  const activeRef = ref || internalRef;

  const theme = useTheme();

  const [verticalValue, setVerticalValue] = React.useState();
  const [horizontalValue, setHorizontalValue] = React.useState();
  const [direction, setDirection] = React.useState<DirectionT>({});

  const attachedPadding = theme.spacing(1);

  const posDefined = (
    typeof verticalValue !== 'undefined'
    && typeof horizontalValue !== 'undefined'
  );

  // define direction of sheet depending on where it is positioned
  // as well any any other size dependant criteria
  usePositioning(() => {
    requestAnimationFrame(() => {
      if (!(activeRef.current instanceof HTMLElement)) return;

      const sheetSpecs: ClientRect | void = activeRef.current.getBoundingClientRect();
      const attachedSpecs: ClientRect | void = attachRef.current?.getBoundingClientRect();

      if (sheetSpecs && attachedSpecs) {
        const posSheetTop = attachedSpecs.top - attachedPadding - sheetSpecs.height;
        const posSheetBottom = attachedSpecs.bottom + attachedPadding + sheetSpecs.height;
        const posSheetRight = attachedSpecs.left + sheetSpecs.width;

        const newDirection: DirectionT = {};

        // if the sheet will extend beyond the bottom of the screen
        // render sheet above the attached element
        if (window.innerHeight < posSheetBottom && posSheetTop > 0) {
          setVerticalValue(attachedSpecs.top - attachedPadding - sheetSpecs.height);
          newDirection.vertical = 'top';
        } else {
          setVerticalValue(attachedSpecs.bottom + attachedPadding);
          newDirection.vertical = 'bottom';
        }

        // if the sheet will extend beyond the right of the screen
        // render sheet flush right of the attached element
        if (window.innerWidth < posSheetRight) {
          setHorizontalValue(attachedSpecs.right - sheetSpecs.width);
          newDirection.horizontal = 'left';
        } else {
          setHorizontalValue(attachedSpecs.left);
          newDirection.horizontal = 'right';
        }

        if (newDirection.vertical !== direction.vertical
            || newDirection.horizontal !== direction.horizontal) {
          setDirection(newDirection);
        }
      }
    });
  });

  // send the direction back to parent if necessary
  React.useEffect(() => {
    if (direction.vertical && direction.horizontal) {
      onDirectionChange && onDirectionChange(direction);
    }
  }, [direction]);

  // listen for esc and trigger onClose
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const escKey = 27;

      switch (event.keyCode) {
        case escKey:
          onClose && onClose();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const styles = {
    sheet: styler(style, theme, {
      position: 'fixed',
      top: verticalValue,
      left: horizontalValue,
      visibility: posDefined ? 'initial' : 'hidden',
      borderRadius: theme.corner(2),
      overflow: 'hidden',
      zIndex: theme.elevations.sheet,
    }),
  };

  return (
    <ClickAwayListener
      onClickAway={onClose}
      exclusions={[attachRef.current, ...exclusions]}
    >
      <Paper
        {...otherProps}
        ref={activeRef}
        elevation="dropdown"
        style={styles.sheet}
      >
        <Child
          render={children}
          onClose={onClose}
          sheetRef={ref}
          attachRef={attachRef}
        />
      </Paper>
    </ClickAwayListener>
  );
});

Sheet.displayName = 'Sheet';

export default Sheet;

// @flow
import * as React from 'react';

import type { RefObjT } from '../../types';

/**
 * Internal hook function that when attached to a element ref will determine
 * whether the element has keyboard focus or not.
 * And will fire a callback if passed in
 */
export default function useInternallyFocused(
  elementRef: RefObjT,
  setFocus?: (boolean, Event) => void,
  mouseDownRefs?: Array<RefObjT>,
): boolean {
  const [internalFocused, setInternalFocused] = React.useState(false);

  React.useEffect(() => {
    let mouseDown = false;
    let mouseUpCalled = false;

    const onMouseDown: EventListener = () => { mouseDown = true; };
    const onMouseUp: EventListener = () => { mouseDown = false; mouseUpCalled = true; };
    const onFocus: EventListener = (e) => {
      /**
       * This runs a check for whether the user has the mouse depressed which means
       * they are they are not using keyboard to focus
       * Or the mouse up has occurred meaning again the user has used the mouse to focus
       * instead of the keyboard. This scenario occurs on input + label inputs where
       * mouseup event fires before focus event.
       */
      if (!mouseDown && !mouseUpCalled) {
        setFocus && setFocus(true, e);
        setInternalFocused(true);
      }
      mouseUpCalled = false;
    };
    const onBlur: EventListener = (e) => {
      setFocus && setFocus(false, e);
      setInternalFocused(false);
      mouseUpCalled = false;
    };

    const addEventListener = (event, func) => {
      if (elementRef.current instanceof HTMLElement) {
        elementRef.current.addEventListener(event, func);
      }
      if (['mousedown', 'mouseup'].indexOf(event) > -1) {
        mouseDownRefs && mouseDownRefs.forEach((eleRef) => {
          if (eleRef.current instanceof HTMLElement) {
            eleRef.current.addEventListener(event, func);
          }
        });
      }
    };

    addEventListener('mousedown', onMouseDown);
    addEventListener('mouseup', onMouseUp);

    addEventListener('focus', onFocus);
    addEventListener('blur', onBlur);

    return () => {
      const removeEventListener = (event, func) => {
        if (elementRef.current instanceof HTMLElement) {
          elementRef.current.removeEventListener(event, func);
        }
        if (['mousedown', 'mouseup'].indexOf(event) > -1) {
          mouseDownRefs && mouseDownRefs.forEach((eleRef) => {
            if (eleRef.current instanceof HTMLElement) {
              eleRef.current.removeEventListener(event, func);
            }
          });
        }
      };

      removeEventListener('mousedown', onMouseDown);
      removeEventListener('mouseup', onMouseUp);

      removeEventListener('focus', onFocus);
      removeEventListener('blur', onBlur);
    };
  });

  return internalFocused;
}

// @flow
import * as React from 'react';

import useActiveRef from '../internal/hooks/useActiveRef';

type ClickAwayCallbackT = (event: MouseEvent | TouchEvent) => void;

const on = (
  element: Document,
  type: MouseEventTypes | TouchEventTypes,
  callback: ClickAwayCallbackT,
) => {
  // $FlowFixMe[method-unbinding]
  if (element.addEventListener) {
    element.addEventListener(type, callback);
  }
};

const off = (
  element: Document,
  type: MouseEventTypes | TouchEventTypes,
  callback: ClickAwayCallbackT,
) => {
  // $FlowFixMe[method-unbinding]
  if (element.removeEventListener) {
    element.removeEventListener(type, callback);
  }
};

// $FlowExpectedError[recursive-definition]
const isDescendant = (element: any, target: EventTarget) => {
  if (target !== null && target instanceof Node) {
    return element === target || isDescendant(element, target.parentNode);
  }
  return false;
};

const clickAwayEvents = ['mouseup', 'touchend'];
const bind = (callback: ClickAwayCallbackT) => (
  clickAwayEvents.forEach((event) => on(document, event, callback))
);
const unbind = (callback: ClickAwayCallbackT) => (
  clickAwayEvents.forEach((event) => off(document, event, callback))
);

export type ClickAwayListenerT = {|
  /**
   * The element tree you want to track if the user clicks outside this element
   */
  children: React.Element<any>,
  /**
   * The function to call if the user clicks and element outside the child
   */
  onClickAway?: (...args: Array<any>) => any,
  /**
   * Elements outside the child that you don't want triggering
   * the onClickAway function if it's clicked
   */
  exclusions?: Array<HTMLElement | null>,
|};

/**
 * Listen for click events that occur somewhere in the document,
 * outside of the element itself. For instance, if you need to hide a menu
 * when people click anywhere else on your page.
 */
const ClickAwayListener = ({
  children,
  onClickAway,
  exclusions = [],
}: ClickAwayListenerT): React.Node => {
  let activeRef = useActiveRef();

  React.useEffect(() => {
    if (!onClickAway) {
      return () => {};
    }

    let isCurrentlyMounted = true;

    const handleClickAway: ClickAwayCallbackT = (event) => {
      if (event.defaultPrevented) {
        return;
      }

      if (activeRef.current instanceof HTMLElement) {
        // IE11 support, which trigger the handleClickAway even after the unbind
        if (isCurrentlyMounted) {
          if (event.target instanceof Node && document.documentElement?.contains(event.target)
              && !isDescendant(activeRef.current, event.target)
              && exclusions.reduce((acc, cur) => {
                if (!acc || isDescendant(cur, event.target)) return false;
                return true;
              }, true)) {
            onClickAway && onClickAway(event);
          }
        }
      }
    };
    bind(handleClickAway);

    return () => {
      isCurrentlyMounted = false;
      unbind(handleClickAway);
    };
  });

  // $FlowFixMe[prop-missing]
  if (children.ref) {
    activeRef = children.ref;
    return children;
  }

  return React.cloneElement(children, {
    ref: activeRef,
  });
};

ClickAwayListener.displayName = 'ClickAwayListener';

export default ClickAwayListener;

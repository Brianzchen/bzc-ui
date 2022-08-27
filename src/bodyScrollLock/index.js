// @flow
// Adopted and modified solution from Bohdan Didukh (2017)
// https://stackoverflow.com/questions/41594997/ios-10-safari-prevent-scrolling-behind-a-fixed-overlay-and-maintain-scroll-posi

type BodyScrollOptionsT = {|
  reserveScrollBarGap?: boolean,
  allowTouchMove?: (el: any) => boolean,
|};

type LockT = {|
  targetElement: any,
  options: BodyScrollOptionsT,
|};

// Older browsers don't support event options, feature detect it.
let hasPassiveEvents = false;
if (typeof window !== 'undefined') {
  const passiveTestOptions = {
    get passive() {
      hasPassiveEvents = true;
      return undefined;
    },
  };
  window.addEventListener('testPassive', null, passiveTestOptions);
  window.removeEventListener('testPassive', null, passiveTestOptions);
}

const isIosDevice = typeof window !== 'undefined'
  && window.navigator
  && window.navigator.platform
  && (/iP(ad|hone|od)/.test(window.navigator.platform)
    || (window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1));

type HandleScrollEventT = TouchEvent;

let locks: Array<LockT> = [];
let documentListenerAdded: boolean = false;
let initialClientY: number = -1;
let previousBodyOverflowSetting: string | void;
let previousBodyPosition: {|
  position: string,
  top: string,
  left: string,
  height: string,
|} | void;
let previousBodyPaddingRight: string | void;

// returns true if `el` should be allowed to receive touchmove events.
const allowTouchMove = (el: EventTarget): boolean => locks.some((lock) => {
  if (lock.options.allowTouchMove && lock.options.allowTouchMove(el)) {
    return true;
  }

  return false;
});

const preventDefault = (rawEvent: HandleScrollEventT): boolean => {
  const e = rawEvent || window.event;

  // For the case whereby consumers adds a touchmove event listener to document.
  // Recall that we do document.addEventListener('touchmove', preventDefault, { passive: false })
  // in disableBodyScroll - so if we provide this opportunity to allowTouchMove, then
  // the touchmove event on document will break.
  if (allowTouchMove(e.target)) {
    return true;
  }

  // Do not prevent if the event has more than one touch (usually meaning this is a multi touch gesture like pinch to zoom).
  if (e.touches.length > 1) return true;

  // $FlowExpectedError[method-unbinding]
  if (e.preventDefault) e.preventDefault();

  return false;
};

const setOverflowHidden = (options?: BodyScrollOptionsT) => {
  // If previousBodyPaddingRight is already set, don't set it again.
  if (previousBodyPaddingRight === undefined) {
    const reserveScrollBarGap = !!options && options.reserveScrollBarGap === true;
    const scrollBarGap = window.innerWidth - (document.documentElement?.clientWidth ?? 0);

    if (reserveScrollBarGap && scrollBarGap > 0) {
      const computedBodyPaddingRight = parseInt(window.getComputedStyle(document.body).getPropertyValue('padding-right'), 10);
      if (document.body?.style) {
        previousBodyPaddingRight = document.body.style.paddingRight;
        document.body.style.paddingRight = `${computedBodyPaddingRight + scrollBarGap}px`;
      }
    }
  }

  // If previousBodyOverflowSetting is already set, don't set it again.
  if (previousBodyOverflowSetting === undefined && document.body?.style) {
    previousBodyOverflowSetting = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
};

const restoreOverflowSetting = () => {
  if (previousBodyPaddingRight !== undefined && document.body?.style) {
    document.body.style.paddingRight = previousBodyPaddingRight;

    // Restore previousBodyPaddingRight to undefined so setOverflowHidden knows it
    // can be set again.
    previousBodyPaddingRight = undefined;
  }

  if (previousBodyOverflowSetting !== undefined && document.body?.style) {
    document.body.style.overflow = previousBodyOverflowSetting;

    // Restore previousBodyOverflowSetting to undefined
    // so setOverflowHidden knows it can be set again.
    previousBodyOverflowSetting = undefined;
  }
};

const setPositionFixed = () => window.requestAnimationFrame(() => {
  // If previousBodyPosition is already set, don't set it again.
  if (previousBodyPosition === undefined
      && document.body?.style
      && document.documentElement?.style) {
    previousBodyPosition = {
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      height: document.documentElement.style.height,
    };

    // Update the dom inside an animation frame
    const { scrollY, scrollX } = window;
    document.body.style.position = 'fixed';
    document.body.style.top = `${-scrollY}px`;
    document.body.style.left = `${-scrollX}px`;
    document.documentElement.style.height = '100vh';
  }
});

const restorePositionSetting = () => {
  if (previousBodyPosition !== undefined && document.body?.style) {
    const { style } = document.body;
    // Convert the position from "px" to Int
    const y = -parseInt(style.top, 10);
    const x = -parseInt(style.left, 10);

    // Restore styles
    if (previousBodyPosition !== undefined
        && document.body?.style
        && document.documentElement?.style) {
      document.body.style.position = previousBodyPosition.position;
      document.body.style.top = previousBodyPosition.top;
      document.body.style.left = previousBodyPosition.left;
      document.documentElement.style.height = previousBodyPosition.height;
    }

    // Restore scroll
    window.scrollTo(x, y);

    previousBodyPosition = undefined;
  }
};

// https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#Problems_and_solutions
const isTargetElementTotallyScrolled = (
  targetElement: any,
): boolean => (
  targetElement
    ? targetElement.scrollHeight - targetElement.scrollTop <= targetElement.clientHeight
    : false
);

const handleScroll = (event: HandleScrollEventT, targetElement: any): boolean => {
  const clientY = event.targetTouches[0].clientY - initialClientY;

  if (allowTouchMove(event.target)) {
    return false;
  }

  if (targetElement && targetElement.scrollTop === 0 && clientY > 0) {
    // element is at the top of its scroll.
    return preventDefault(event);
  }

  if (isTargetElementTotallyScrolled(targetElement) && clientY < 0) {
    // element is at the bottom of its scroll.
    return preventDefault(event);
  }

  event.stopPropagation();
  return true;
};

const disableBodyScroll = (targetElement: any, options?: BodyScrollOptionsT): void => {
  // targetElement must be provided
  if (!targetElement) {
    // eslint-disable-next-line no-console
    console.error(
      'disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.',
    );
    return;
  }

  // disableBodyScroll must not have been called on this targetElement before
  if (locks.some((lock) => lock.targetElement === targetElement)) {
    return;
  }

  const lock = {
    targetElement,
    options: options || { ...null },
  };

  locks = [...locks, lock];

  if (isIosDevice) {
    setPositionFixed();
  } else {
    setOverflowHidden(options);
  }

  if (isIosDevice) {
    // eslint-disable-next-line no-param-reassign
    targetElement.ontouchstart = (event: HandleScrollEventT) => {
      if (event.targetTouches.length === 1) {
        // detect single touch.
        initialClientY = event.targetTouches[0].clientY;
      }
    };
    // eslint-disable-next-line no-param-reassign
    targetElement.ontouchmove = (event: HandleScrollEventT) => {
      if (event.targetTouches.length === 1) {
        // detect single touch.
        handleScroll(event, targetElement);
      }
    };

    if (!documentListenerAdded) {
      document.addEventListener('touchmove', preventDefault, hasPassiveEvents ? { passive: false } : undefined);
      documentListenerAdded = true;
    }
  }
};

const clearAllBodyScrollLocks = (): void => {
  if (isIosDevice) {
    // Clear all locks ontouchstart/ontouchmove handlers, and the references.
    locks.forEach((lock: LockT) => {
      // eslint-disable-next-line no-param-reassign
      lock.targetElement.ontouchstart = null;
      // eslint-disable-next-line no-param-reassign
      lock.targetElement.ontouchmove = null;
    });

    if (documentListenerAdded) {
      document.removeEventListener('touchmove', preventDefault, hasPassiveEvents ? { passive: false } : undefined);
      documentListenerAdded = false;
    }

    // Reset initial clientY.
    initialClientY = -1;
  }

  if (isIosDevice) {
    restorePositionSetting();
  } else {
    restoreOverflowSetting();
  }

  locks = [];
};

const enableBodyScroll = (targetElement: any): void => {
  if (!targetElement) {
    // eslint-disable-next-line no-console
    console.error(
      'enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.',
    );
    return;
  }

  locks = locks.filter((lock) => lock.targetElement !== targetElement);

  if (isIosDevice) {
    // eslint-disable-next-line no-param-reassign
    targetElement.ontouchstart = null;
    // eslint-disable-next-line no-param-reassign
    targetElement.ontouchmove = null;

    if (documentListenerAdded && locks.length === 0) {
      document.removeEventListener('touchmove', preventDefault, hasPassiveEvents ? { passive: false } : undefined);
      documentListenerAdded = false;
    }
  }

  if (isIosDevice) {
    restorePositionSetting();
  } else {
    restoreOverflowSetting();
  }
};

export default {
  disableBodyScroll,
  clearAllBodyScrollLocks,
  enableBodyScroll,
};

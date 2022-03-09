// @flow
import * as React from 'react';

type Props = {
  ...jsx$HTMLElement,
  /**
   * Function that will be called whenever the component enters the viewport.
   * Passes back a completed function param ((completed) => {}) that
   * should be called to reload the scroll trigger
   */
  onLoad?: (() => void) => void,
  ...
};

/**
 * An empty element that assists with incrementally adding content when
 * the user scrolls past a given point.
 *
 * Accepts an `onLoad` function that is called once the `ScrollLoadingListener`
 * enters the user's viewport.
 *
 * The function is passed a completion function as one of it's params that
 * should be called to let the `ScrollLoadingListener` know that it can send
 * another trigger.
 * This is necessary to prevent the `onLoad` function from being called
 * multiple times and is useful when the newly loaded content pushes the
 * `ScrollLoadingListener` further down the page.
 */
const ScrollLoadingListener: React$AbstractComponent<Props, HTMLElement> = React.forwardRef<Props, HTMLElement>(({
  onLoad,
  ...otherProps
}: Props, ref) => {
  const internalRef = React.useRef<HTMLElement | null>(null);
  const activeRef = ref || internalRef;

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const trackScrolling = () => {
      if (activeRef.current instanceof HTMLElement) {
        const { current } = activeRef;
        const viewPortBottom = current.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        if (viewPortBottom <= windowHeight
            && !loading) {
          setLoading(true);
          onLoad && onLoad(() => {
            setLoading(false);
          });
        }
      }
    };

    window.addEventListener('scroll', trackScrolling);
    trackScrolling();

    return () => {
      window.removeEventListener('scroll', trackScrolling);
    };
  });

  return (
    <div
      {...otherProps}
      ref={activeRef}
    />
  );
});

ScrollLoadingListener.displayName = 'ScrollLoadingListener';

export default ScrollLoadingListener;

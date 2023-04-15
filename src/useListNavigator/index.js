// @flow
import * as React from 'react';
import KeyCommander from 'key-commander';

const kc = new KeyCommander();

/**
 * Build keyboard navigation lists easily with a hook to listens to up and down arrow keys
 * and calls back telling the component what the currently selected index is
 */
export default (
  listLength: number,
  onEnter?: (currentIndex?: number) => void,
  onEsc?: () => void,
): {|
  currentIndex?: number,
  reset: (
  ) => void,
|} => {
  const initialState = undefined;
  const [currentIndex, setCurrentIndex] = React.useState(initialState);

  const reset = () => setCurrentIndex(initialState);

  React.useEffect(() => {
    const upId = kc.subscribe('ArrowUp', () => {
      // $FlowExpectedError[incompatible-call]
      setCurrentIndex((pCurrentIndex?: number) => {
        if (typeof pCurrentIndex === 'undefined'
            || pCurrentIndex === 0
            || pCurrentIndex > listLength - 1) {
          return listLength - 1;
        }
        return pCurrentIndex - 1;
      });
    }, { onRepeat: true });
    const downId = kc.subscribe('ArrowDown', () => {
      // $FlowExpectedError[incompatible-call]
      setCurrentIndex((pCurrentIndex) => {
        if (typeof pCurrentIndex === 'undefined' || pCurrentIndex >= listLength - 1) {
          return 0;
        }
        return pCurrentIndex + 1;
      });
    }, { onRepeat: true });
    const enterId = kc.subscribe('Enter', () => {
      onEnter && onEnter(currentIndex);
    });
    const escId = kc.subscribe('Escape', () => {
      onEsc && onEsc();
    });

    return () => {
      kc.unsub(upId);
      kc.unsub(downId);
      kc.unsub(enterId);
      kc.unsub(escId);
    };
  });

  React.useEffect(() => {
    if (currentIndex && currentIndex > listLength - 1) {
      setCurrentIndex(initialState);
    }
  }, [listLength]);

  return {
    currentIndex,
    reset,
  };
};

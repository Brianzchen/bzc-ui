// @flow
import * as React from 'react';

/**
 * Call a function when the user presses the `esc` key based on whether or not a condition is met
 *
 * @param {*} condition Whether or not he handler should call
 * @param {*} func The function to fire if condition is met
 */
export default function useEsc(condition: boolean, func?: () => void): void {
  React.useEffect(() => {
    let handleEsc;
    if (condition) {
      handleEsc = (event: KeyboardEvent) => {
        if (event.keyCode === 27) {
          func && func();
        }
      };
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      if (condition && handleEsc) {
        document.removeEventListener('keydown', handleEsc);
      }
    };
  });
}

// @flow
import * as React from 'react';

export default function usePositioning(func: () => void): void {
  React.useEffect(() => {
    window.addEventListener('resize', func);
    document.addEventListener('scroll', func, true);
    func();

    return () => {
      window.removeEventListener('resize', func);
      document.removeEventListener('scroll', func, true);
    };
  });
}

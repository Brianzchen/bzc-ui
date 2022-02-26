// @flow
import { useEffect } from 'react';

export default function useDeprecationWarning(value: string, condition?: boolean): void {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      if (typeof condition === 'undefined'
          || condition) {
        console.error(value);
      }
    }
  }, []);
}

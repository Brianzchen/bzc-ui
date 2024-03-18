// @flow
import * as React from 'react';

export default function useDeprecationWarning(value: string, condition?: boolean): void {
  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      if (typeof condition === 'undefined'
          || condition) {
        console.error(value);
      }
    }
  }, []);
}

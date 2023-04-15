// @flow
import type { ThemeT } from '../types';

import type { TypePropT } from './types';

export default (type: TypePropT, theme: ThemeT): {|
  ['sm' | 'md' | 'lg']: any,
|} => {
  if (typeof type === 'string') {
    return {
      sm: theme.fonts[type].mobile,
      md: undefined,
      lg: theme.fonts[type],
    };
  }

  const typeObj = {};
  const arr = Object.keys(type);
  for (let i = 0, len = arr.length; i < len; i++) {
    const key = arr[i];
    const font = theme.fonts[type[key]];
    if (key === 'sm' && font.mobile) {
      // $FlowFixMe[prop-missing]
      typeObj[key] = font.mobile;
    } else {
      // $FlowFixMe[prop-missing]
      typeObj[key] = font;
    }
  }
  // $FlowFixMe[prop-missing]
  if (!typeObj.lg) {
    // $FlowFixMe[prop-missing]
    if (typeObj.md) {
      typeObj.lg = typeObj.md;
      // $FlowFixMe[prop-missing]
    } else if (typeObj.sm) {
      typeObj.lg = typeObj.sm;
    }
  }
  return typeObj;
};

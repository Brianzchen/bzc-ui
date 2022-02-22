// @flow
import removePx from '../internal/removePx';

import type { FontsT } from '../types';

export default (fonts: FontsT, scale?: number = 1): any => (
  Object.keys(fonts).reduce((acc, cur) => {
    const font = { ...fonts[cur] };
    font.px *= scale;
    font.leading = `${removePx(font.leading) * scale}px`;
    const { mobile } = font;
    if (mobile) {
      mobile.px *= scale;
      mobile.leading = `${removePx(mobile.leading) * scale}px`;
    }
    font.mobile = mobile;
    acc[cur] = font;
    return acc;
  }, {})
);

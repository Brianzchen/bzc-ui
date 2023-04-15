// @flow
import Color from 'color';

import type { ColorsT } from '../types';
import hexToRgba from '../internal/hexToRgba';

export default (colors: $ObjMapConst<ColorsT, string>): ColorsT => {
  const colorFuncs = {};
  Object.keys(colors).forEach((key) => {
    // $FlowFixMe[prop-missing]
    colorFuncs[key] = (shade: number, opacity: number) => {
      let curColor = colors[key];

      if (shade && Math.sign(shade) === -1) {
        curColor = Color(curColor).lighten(Math.abs(shade)).hex();
      }
      if (shade && Math.sign(shade) === 1) {
        curColor = Color(curColor).darken(Math.abs(shade)).hex();
      }

      if (opacity) {
        curColor = hexToRgba(curColor, opacity);
      }

      return curColor;
    };
  });
  // $FlowExpectedError[prop-missing] issues in initially empty object
  return colorFuncs;
};

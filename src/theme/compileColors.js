// @flow
import Color from 'color';

import type { ColorT, ColorFuncT } from '../types';
import hexToRgba from '../internal/hexToRgba';

type ColorsT = {|
  [key: ColorT]: string,
|};

export default (colors: ColorsT): {| [id: string]: ColorFuncT |} => {
  const colorFuncs = {};
  Object.keys(colors).forEach((key) => {
    colorFuncs[key] = (shade?: number, opacity?: number): string => {
      const curColor = colors[key];

      if (shade && Math.sign(shade) === -1) {
        return Color(curColor).lighten(shade);
      }
      if (shade && Math.sign(shade) === 1) {
        return Color(curColor).darken(shade);
      }

      if (opacity) {
        return hexToRgba(curColor, opacity);
      }

      return curColor;
    };
  });
  return colorFuncs;
};

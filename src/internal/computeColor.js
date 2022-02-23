// @flow
import type { ThemeT } from '../types';

export default (color: string | void, theme: ThemeT): string => {
  if (typeof color === 'undefined') return 'inherit';

  if (/#[0-9A-Fa-f]{3,}/.test(color)) return color;

  if (color.indexOf('(') > -1
      && color.indexOf(')') > -1) {
    const [type, preShade] = color.split('(');
    const shade = preShade.substring(0, preShade.indexOf(')'));

    return theme.colors[type](shade);
  }

  if (theme.colors[color] instanceof Function) {
    return theme.colors[color]();
  }

  return 'inherit';
};

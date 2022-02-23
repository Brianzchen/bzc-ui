// @flow
import merge from 'deepmerge';

import type { StylerT } from '../types';

/**
 * A small function that allows you to create fully custom components
 * that mimic the enables the styling api of starfall.
 */
const styler: StylerT = (style, theme, target = {}) => {
  const compiledStyle = style instanceof Function
    ? style(theme, styler)
    : style;

  // Don't swap, the ordering here matter for code later
  const sizeList = [
    {
      key: 'sm',
      value: theme.mobileWidth,
    },
    {
      key: 'md',
      value: theme.tabletWidth,
    },
  ];

  const type = [
    {
      key: ':sf-min(',
      value: '@media (min-width: ',
      offset: 1,
    },
    {
      key: ':sf-max(',
      value: '@media (max-width: ',
      offset: 0,
    },
  ];

  // parse and apply starfall media shorthands
  const applyShorthands = (obj) => {
    const shortHandObject = { ...obj };
    for (let i = 0, len = type.length; i < len; i++) {
      // This reversal is necessary to ensure that one media query
      // does not override another
      const sizes = type[i].key === ':sf-min('
        ? sizeList
        : sizeList.slice().reverse();

      const { key: typeKey, value: typeValue, offset } = type[i];

      for (let j = 0, leng = sizes.length; j < leng; j++) {
        const { key: sizeKey, value: sizeValue } = sizes[j];

        const starfallMedia = `${typeKey}${sizeKey})`;
        const realMedia = `${typeValue}${sizeValue + offset}px)`;
        const mediaObj = shortHandObject[starfallMedia];

        if (typeof mediaObj !== 'undefined') {
          shortHandObject[realMedia] = {
            ...shortHandObject[realMedia],
            ...mediaObj,
          };
          delete shortHandObject[starfallMedia];
        }
      }
    }
    return shortHandObject;
  };

  return merge<{ [key: string]: any }, { [key: string]: any }>(
    applyShorthands(target),
    applyShorthands(compiledStyle),
  );
};

export default styler;

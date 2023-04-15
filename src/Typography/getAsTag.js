// @flow
import type { ThemeT } from '../types';

import type { TypePropT } from './types';

/**
 * Based on the font type that will be rendered, this function will pick the most
 * semantically appropriate HTML tag if there is one appropriate.
 * Otherwise default to the `as` supplied by the consumer.
 */
export default (type: TypePropT, as: any, theme: ThemeT): 'h1' | 'h2' | 'h3' | any => {
  const getTag = (fontType: string) => {
    switch (fontType) {
      case 'displayTitle1':
      case 'heading1':
        return 'h1';
      case 'displayTitle2':
      case 'heading2':
        return 'h2';
      case 'heading3':
        return 'h3';
      default:
        return as;
    }
  };

  if (typeof type === 'string') {
    return getTag(type);
  }
  const currWidth = window.innerWidth;
  if (type.sm && currWidth <= theme.mobileWidth) {
    return getTag(type.sm);
  }
  if (type.md && currWidth <= theme.tabletWidth) {
    return getTag(type.md);
  }
  return getTag(type.lg);
};

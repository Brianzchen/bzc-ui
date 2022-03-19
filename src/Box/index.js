// @flow
import * as React from 'react';
import { StyleSheet, css } from 'aphrodite';

import usePositioning from '../internal/hooks/usePositioning';
import computeColor from '../internal/computeColor';

import useTheme from '../useTheme';
import styler from '../styler';
import type { HiddenT, StyleT } from '../types';

export type BoxT = {
  ...jsx$HTMLElement,
  /** child element to render in the component */
  children?: React.Node,
  /** pass in an html semantic tag as a string or component to override the default rendered tag */
  as?: any,
  /** class passed into the root element */
  className?: string,
  /** overrides styling for root element */
  style?: StyleT,
  /** assign a color directly to the component's styling.
   * Accepts theme value `color` or `color(0.5)` as a string
   * or alternatively accepts a hexcode
   */
  color?: string,
  /** function that fires when the element is clicked if not disabled */
  onClick?: (event: SyntheticEvent<HTMLButtonElement>) => void,
  /** return the resulting computed style object of the element */
  getStyle?: (computedStyle: {
    [key: string]: any,
  }) => void,
   /**
   * takes a string, array of strings, or array tuple of numbers [number, number]
   * that define at what defined breakpoints hide
   * the component. This will unrender the component completely
   */
  hideElm?: HiddenT | Array<HiddenT | [number, number | void]> | false,
  /**
   * Whether the element and all it's children should be hidden from the UI when user
   * invokes the print command
   */
  printHide?: boolean,
  ...
};

/**
 * The Box component is the lowest level base components in starfall implementing
 * the theme engine and is a direct replacement for primitive element tags.
 */
const Box: React$AbstractComponent<BoxT, HTMLElement> = React.forwardRef<BoxT, HTMLElement>(({
  children = null,
  as: Element = 'div',
  className = '',
  style = {},
  color,
  getStyle,
  hideElm,
  printHide = false,
  ...otherProps
}: BoxT, ref) => {
  const theme = useTheme();

  const [hide, setHide] = React.useState(!!hideElm);
  const [previousComputedStyle, setPreviousComputedStyle] = React.useState();

  const styles = StyleSheet.create({
    container: styler(style, theme, {
      boxSizing: 'border-box',
      color: computeColor(color, theme),
      '@media print': {
        display: printHide ? 'none' : 'initial',
      },
    }),
  });

  const computedStyle = styles.container._definition;

  React.useEffect(() => {
    if (JSON.stringify(computedStyle) !== JSON.stringify(previousComputedStyle) && getStyle) {
      getStyle(computedStyle);
      setPreviousComputedStyle(computedStyle);
    }
  });

  usePositioning(() => {
    if (hideElm) {
      const shouldHideString = (size: HiddenT) => {
        const currWidth = window.innerWidth;
        if (size === 'sm' && currWidth <= theme.mobileWidth) {
          return true;
        }
        if (size === 'md' && currWidth > theme.mobileWidth && currWidth <= theme.tabletWidth) {
          return true;
        }
        if (size === 'lg' && currWidth > theme.tabletWidth) {
          return true;
        }
        return false;
      };
      const shouldHideNumber = (sizes) => {
        const currWidth = window.innerWidth;
        if (currWidth > sizes[0]) {
          if (!sizes[1]) return true;
          if (currWidth <= sizes[1]) return true;
        }
        return false;
      };

      const applyHide = (value: boolean) => {
        // Only set hide if not currently the same value to reduce rerenders
        value !== hide && setHide(value);
      };

      if (typeof hideElm === 'string') {
        const value = shouldHideString(hideElm);
        applyHide(value);
      } else if (Array.isArray(hideElm)) {
        const value = hideElm.reduce((acc, cur) => {
          if (acc) return acc;
          if (Array.isArray(cur)) {
            return shouldHideNumber(cur);
          }
          return shouldHideString(cur);
        }, false);
        applyHide(value);
      }
    } else if (hide) {
      // If for some reason hide was set to true but hideElm prop was removed, revert
      // hide back to false
      setHide(false);
    }
  });

  if (hide) return null;

  return (
    <Element
      {...otherProps}
      ref={ref}
      className={`${css(styles.container)} ${className}`}
    >
      {children}
    </Element>
  );
});

Box.displayName = 'Box';

export default Box;

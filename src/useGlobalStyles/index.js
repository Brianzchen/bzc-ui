// @flow
import * as React from 'react';
import { StyleSheet, css } from 'aphrodite';

import styler from '../styler';
import useTheme from '../useTheme';
import type { StyleT } from '../types';

type StylesT = {|
  [key: string]: StyleT,
|};

/**
 * Taking an object of style objects, will apply styles to globally defined css objects.
 *
 * Object of style objects that accept the same structure as typical style
 * objects in other components. Properties of `styles` can accept either an object or
 * function just like typical startown style props.
 *
 * Currently has minimal support of document.body, ids and first element of classes.
 * Styling will only apply to elements that are currently on the DOM, as new elements
 * are added, this hook does not listen to DOM changes.
 *
 * Also accepts a `condition` that if passed will only apply when `true`
 */
const useGlobalStyles = (styles: StylesT = {}, condition?: boolean): void => {
  const theme = useTheme();

  React.useEffect(() => {
    const getStyleName = (name: string) => {
      if (name.indexOf('#') === 0
          || name.indexOf('.') === 0) {
        return name.substring(1);
      }
      return name;
    };

    const getStyleElement = (originalName: string, strippedName: string) => {
      if (originalName.indexOf('#') === 0) {
        return document.getElementById(strippedName);
      }
      if (originalName.indexOf('.') === 0) {
        return document.getElementsByClassName(strippedName)[0];
      }
      if (originalName === 'body') {
        return document.body;
      }
      return null;
    };

    const classList = {};

    if (typeof condition === 'undefined' || condition) {
      const compiledStyles = Object.keys(styles).reduce((acc, cur) => {
        const style = styler(styles[cur], theme);
        const name = getStyleName(cur);
        // $FlowExpectedError[prop-missing]
        acc[`${name}`] = style;
        return acc;
      }, {});

      const GlobalStyles = StyleSheet.create(compiledStyles);

      Object.keys(styles).forEach((styleName) => {
        const name = getStyleName(styleName);
        const className = css(GlobalStyles[name]);

        const element = getStyleElement(styleName, name);

        if (element) {
          element.classList.add(className);
          // $FlowExpectedError[prop-missing]
          classList[styleName] = className;
        }
      });
    }

    return () => {
      Object.keys(styles).forEach((styleName) => {
        const name = getStyleName(styleName);
        const element = getStyleElement(styleName, name);
        if (element) {
          element.classList.remove(classList[styleName]);
        }
      });
    };
  }, [styles, condition]);
};

export default useGlobalStyles;

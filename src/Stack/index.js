// @flow
import * as React from 'react';

import compileSpace from '../internal/compileSpace';
import useComponentTestId from '../internal/hooks/useComponentTestId';

import Box from '../Box';
import type { BoxT } from '../Box';
import type { StyleT } from '../types';

export type StackT = {
  ...BoxT,
  /** space between each child element,
   * can accept px or percentages as a string.
   * Alternatively spacing from the theme engine
   * can be used in the following format,
   * "spacing([space])" as a string
   */
  space?: string | number,
  /** overrides styling for each child wrapper element */
  itemStyle?: StyleT,
  /** object of props that will be passed into
   * each child wrapper element
   */
  itemProps?: {
    ...
  },
  ...
};

/**
 * A layout component to easily stack multiple components together with even spacing.
 */
const Stack: React$AbstractComponent<StackT, HTMLElement> = React.forwardRef<StackT, HTMLElement>(({
  children = null,
  space,
  style = {},
  itemStyle = {},
  itemProps = {},
  ...otherProps
}: StackT, ref) => {
  const compTestId = useComponentTestId('Stack');

  const styles = {
    item: (firstEle) => (theme, styler) => styler(itemStyle, theme, {
      ...space && !firstEle
        ? {
          marginTop: compileSpace(space, theme.spacing),
        }
        : {},
    }),
  };

  return (
    <Box
      {...otherProps}
      ref={ref}
      style={style}
    >
      {React.Children.map(children, (obj, index) => {
        if (!obj) return null;

        const createItem = (child, firstEle) => (
          <Box
            {...itemProps}
            data-testid={compTestId('item')}
            style={styles.item(firstEle)}
          >
            {[child]}
          </Box>
        );

        if (obj.type === React.Fragment) {
          return React.Children.map(obj.props.children, (o, i) => (
            createItem(o, index === 0 && i === 0)
          ));
        }

        return createItem(obj, index === 0);
      })}
    </Box>
  );
});

Stack.displayName = 'Stack';

export default Stack;

// @flow
import * as React from 'react';

import compileSpace from '../internal/compileSpace';

import Box from '../Box';
import type { BoxT } from '../Box';
import styler from '../styler';
import useTheme from '../useTheme';
import type { StyleT } from '../types';
import useComponentTestId from '../internal/hooks/useComponentTestId';

type Props = {
  ...BoxT,
  /** elements to stack */
  children?: React.Node,
  /** space between each child element,
   * can accept px or percentages as a string.
   * Alternatively spacing from the theme engine
   * can be used in the following format,
   * "spacing([space])" as a string
   */
  space?: string | number,
  /** overrides styling for root element */
  style?: StyleT,
  /** overrides styling for each child wrapper element */
  itemStyle?: StyleT,
  /** object of props that will be passed into
   * each child wrapper element
   */
  itemProps?: { ... },
  /**
   * Enable if you want `Inline`'s `space` to influence the horizontal plane only.
   * This can also be used to solve an issue where if you render `Inline` on an element
   * that does not have any top padding it will force top padding onto that element
   */
  horizontalOnly?: boolean,
  ...
};

/**
 * A layout component to easily space out components inline. As the components wrap, the elements will also be spaced out vertically.
 */
const Inline: React$AbstractComponent<Props, HTMLElement> = React.forwardRef<Props, HTMLElement>(({
  children = null,
  space = 0,
  style = {},
  itemStyle = {},
  itemProps = {},
  horizontalOnly = false,
  ...otherProps
}: Props, ref) => {
  const theme = useTheme();
  const compTestId = useComponentTestId('Inline');
  const spacing = compileSpace(space, theme.spacing);

  const styles = {
    container: styler(style, theme, {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      margin: `${horizontalOnly ? 0 : `-${spacing}px`} 0 0 -${spacing}px`,
    }),
    item: styler(itemStyle, theme, {
      ...space
        ? {
          minWidth: 0,
          padding: `${horizontalOnly ? 0 : `${spacing}px`} 0 0 ${spacing}px`,
        }
        : {},
    }),
  };

  return (
    <Box
      {...otherProps}
      ref={ref}
      style={styles.container}
    >
      {React.Children.map(children, (obj) => {
        if (!obj) return null;

        const createItem = (child) => (
          <Box
            {...itemProps}
            data-testid={compTestId('item')}
            style={styles.item}
          >
            {[child]}
          </Box>
        );

        if (obj.type === React.Fragment) {
          return React.Children.map(obj.props.children, (o) => (
            createItem(o)
          ));
        }

        return createItem(obj);
      })}
    </Box>
  );
});

Inline.displayName = 'Inline';

export default Inline;

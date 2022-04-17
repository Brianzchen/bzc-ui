// @flow
import * as React from 'react';

import Box, { type BoxT } from '../Box';
import styler from '../styler';
import useTheme from '../useTheme';

type Props = {
  ...BoxT,
  ...
};

/**
 * Wrapper table component with predefined styling
 */
const Table: React$AbstractComponent<Props, HTMLElement> = React.forwardRef<Props, HTMLElement>(({
  children = null,
  style = {},
  ...otherProps
}: Props, ref): React.Node => {
  const theme = useTheme();

  const styles = {
    table: styler(style, theme, {
      fontSize: theme.fonts.body.px,
    }),
  };

  return (
    <Box
      {...otherProps}
      ref={ref}
      as="table"
      style={styles.table}
    >
      {children}
    </Box>
  );
});

Table.displayName = 'Table';

export default Table;

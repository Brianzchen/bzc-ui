// @flow
import * as React from 'react';

import Box, { type BoxT } from '../Box';
import styler from '../styler';
import useTheme from '../useTheme';
import type { StyleT } from '../types';

export type TableT = {
  ...BoxT,
  tableStyle?: StyleT,
  ...
};

/**
 * Wrapper table component with predefined styling
 */
const Table: React$AbstractComponent<TableT, HTMLElement> = React.forwardRef(({
  children = null,
  style = {},
  tableStyle = {},
  ...otherProps
}: TableT, ref): React.Node => {
  const theme = useTheme();

  const styles = {
    container: styler(style, theme, {
      overflow: 'auto',
    }),
    table: styler(tableStyle, theme, {
      fontSize: theme.fonts.body.px,
      borderCollapse: 'collapse',
      width: '100%',
    }),
  };

  return (
    <Box
      {...otherProps}
      ref={ref}
      style={styles.container}
    >
      <Box
        as="table"
        style={styles.table}
      >
        {children}
      </Box>
    </Box>
  );
});

Table.displayName = 'Table';

export default Table;

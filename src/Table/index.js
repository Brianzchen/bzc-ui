// @flow
import * as React from 'react';

import Box, { type BoxT } from '../Box';
import styler from '../styler';
import useTheme from '../useTheme';

export type TableT = {
  ...BoxT,
  ...
};

/**
 * Wrapper table component with predefined styling
 */
const Table: React$AbstractComponent<TableT, HTMLElement> = React.forwardRef(({
  children = null,
  style = {},
  ...otherProps
}: TableT, ref): React.Node => {
  const theme = useTheme();

  const styles = {
    table: styler(style, theme, {
      fontSize: theme.fonts.body.px,
      borderCollapse: 'collapse',
      width: '100%',
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

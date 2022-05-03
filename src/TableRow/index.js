// @flow
import * as React from 'react';

import Box, { type BoxT } from '../Box';
import styler from '../styler';
import useTheme from '../useTheme';

export type TableRowT = {
  ...BoxT,
  ...
};

/**
 * Styled table row
 */
const TableRow: React$AbstractComponent<TableRowT, HTMLElement> = React.forwardRef(({
  children = null,
  style = {},
  ...otherProps
}: TableRowT, ref): React.Node => {
  const theme = useTheme();

  const styles = {
    row: styler(style, theme, {
      borderBottom: `${theme.line(1)} solid ${theme.colors.monoMid()}`,
    }),
  };

  return (
    <Box
      {...otherProps}
      ref={ref}
      as="tr"
      style={styles.row}
    >
      {children}
    </Box>
  );
});

TableRow.displayName = 'TableRow';

export default TableRow;

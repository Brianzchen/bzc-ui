// @flow
import * as React from 'react';

import Box, { type BoxT } from '../Box';
import styler from '../styler';
import useTheme from '../useTheme';

export const TableRowContext: React$Context<void | 'th' | 'td'> = React.createContext();

export type TableRowT = {
  ...BoxT,
  variant?: 'th' | 'td',
  ...
};

/**
 * Styled table row
 */
const TableRow: React$AbstractComponent<TableRowT, HTMLElement> = React.forwardRef(({
  children = null,
  style = {},
  variant,
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
      <TableRowContext.Provider
        value={variant}
      >
        {children}
      </TableRowContext.Provider>
    </Box>
  );
});

TableRow.displayName = 'TableRow';

export default TableRow;

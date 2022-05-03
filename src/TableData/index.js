// @flow
import * as React from 'react';

import Box, { type BoxT } from '../Box';
import styler from '../styler';
import useTheme from '../useTheme';

export type TableDataT = {
  ...BoxT,
  /**
   * Whether to be rendered as a header or cell variant
   */
  variant?: 'th' | 'td',
  ...
};

/**
 * Styled table cell component
 */
const TableData: React$AbstractComponent<TableDataT, HTMLElement> = React.forwardRef(({
  children,
  variant = 'td',
  style = {},
  ...otherProps
}: TableDataT, ref): React.Node => {
  const theme = useTheme();

  const styles = {
    data: styler(style, theme, {
      textAlign: 'left',
      padding: theme.spacing(4),
    }),
  };

  return (
    <Box
      {...otherProps}
      ref={ref}
      as={variant}
      style={styles.data}
    >
      {children}
    </Box>
  );
});

TableData.displayName = 'TableData';

export default TableData;

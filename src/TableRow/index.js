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
 * Styled table row
 */
const TableRow: React$AbstractComponent<Props, HTMLElement> = React.forwardRef<Props, HTMLElement>(({
  children = null,
  style = {},
  ...otherProps
}: Props, ref): React.Node => {
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

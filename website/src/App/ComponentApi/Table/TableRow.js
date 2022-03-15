// @flow
import * as React from 'react';

import { Box, useTheme } from 'starfall';

type Props = {
  children?: React.Node,
  ...
};

const TableRow = ({
  children = null,
  ...otherProps
}: Props): React.Node => {
  const theme = useTheme();

  const styles = {
    row: {
      borderBottom: `${theme.line(1)} solid ${theme.colors.monoPrimary()}`,
    },
  };

  return (
    <Box
      {...otherProps}
      as="tr"
      style={styles.row}
    >
      {children}
    </Box>
  );
};

export default TableRow;

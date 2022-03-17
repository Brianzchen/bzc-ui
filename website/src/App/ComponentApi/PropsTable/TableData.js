// @flow
import * as React from 'react';

import { Box, useTheme } from 'starfall';

type Props = {
  children: React.Node,
  variant?: 'th' | 'td',
  ...
};

const TableData = ({
  children,
  variant = 'td',
  ...otherProps
}: Props): React.Node => {
  const theme = useTheme();

  const styles = {
    data: {
      textAlign: 'left',
      padding: theme.spacing(4),
    },
  };

  return (
    <Box
      {...otherProps}
      as={variant}
      style={styles.data}
    >
      {children}
    </Box>
  );
};

export default TableData;

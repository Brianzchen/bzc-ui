// @flow
import * as React from 'react';

import { Box, useTheme } from 'starfall';

type Props = {
  children?: React.Node,
  ...
};

const Table = ({
  children = null,
}: Props): React.Node => {
  const theme = useTheme();

  const styles = {
    table: {
      fontSize: theme.fonts.body.px,
    },
  };

  return (
    <Box
      as="table"
      style={styles.table}
    >
      {children}
    </Box>
  );
};

export default Table;

// @flow
import * as React from 'react';

import { Box } from 'starfall';

import TableRow from './TableRow';

const Table = (): React.Node => (
  <Box as="table">
    <Box as="thead">
      <TableRow>
        <Box as="th">
          test
        </Box>
        <Box as="th">
          test
        </Box>
        <Box as="th">
          test
        </Box>
      </TableRow>
    </Box>
  </Box>
);

export default Table;

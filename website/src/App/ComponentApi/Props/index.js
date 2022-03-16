// @flow
import * as React from 'react';

import { Box } from 'starfall';

import Table from './Table';
import TableRow from './TableRow';

const Props = (): React.Node => (
  <Table>
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
  </Table>
);

export default Props;

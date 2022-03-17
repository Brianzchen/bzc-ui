// @flow
import * as React from 'react';

import { Box, Checkbox } from 'starfall';

import Table from './Table';
import TableData from './TableData';
import TableRow from './TableRow';
import type { ComponentPropsT } from '..';

type Props = {|
  props: ComponentPropsT,
|};

const PropsTable = ({
  props,
}: Props): React.Node => (
  <Table>
    <Box as="thead">
      <TableRow>
        <TableData variant="th">
          Name
        </TableData>
        <TableData variant="th">
          Description
        </TableData>
        <TableData variant="th">
          Required
        </TableData>
      </TableRow>
    </Box>
    <Box as="tbody">
      {Object.keys(props).reverse().map((key) => {
        const prop = props[key];

        return (
          <TableRow key={key}>
            <TableData>
              {key}
            </TableData>
            <TableData>
              {prop.description}
            </TableData>
            <TableData>
              <Checkbox
                value={prop.required}
              />
            </TableData>
          </TableRow>
        );
      })}
    </Box>
  </Table>
);

export default PropsTable;

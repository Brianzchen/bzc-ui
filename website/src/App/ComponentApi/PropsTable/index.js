// @flow
import * as React from 'react';

import { Box, Checkbox } from 'starfall';

import Table from './Table';
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
        <Box as="th">
          Name
        </Box>
        <Box as="th">
          Description
        </Box>
        <Box as="th">
          Required
        </Box>
      </TableRow>
    </Box>
    <Box as="tbody">
      {Object.keys(props).reverse().map((key) => {
        const prop = props[key];

        return (
          <TableRow key={key}>
            <Box as="td">
              {key}
            </Box>
            <Box as="td">
              {prop.description}
            </Box>
            <Box as="td">
              <Checkbox
                value={prop.required}
              />
            </Box>
          </TableRow>
        );
      })}
    </Box>
  </Table>
);

export default PropsTable;

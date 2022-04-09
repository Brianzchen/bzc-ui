// @flow
import * as React from 'react';

import { Box } from 'startown';

import Table from './Table';
import TableData from './TableData';
import TableRow from './TableRow';
import getType from './getType';
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
          Type
        </TableData>
        <TableData variant="th">
          Default
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
              {prop.required ? '*' : null}
            </TableData>
            <TableData>
              {prop.description ?? ''}
            </TableData>
            <TableData>
              {getType(prop.flowType)}
            </TableData>
            <TableData>
              {prop.defaultValue?.value ?? null}
            </TableData>
          </TableRow>
        );
      })}
    </Box>
  </Table>
);

export default PropsTable;

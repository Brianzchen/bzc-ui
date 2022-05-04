// @flow
import * as React from 'react';

import {
  Table,
  TableRow,
  TableData,
} from 'startown';

export const Basic = (): React.Node => (
  <Table>
    <thead>
      <TableRow variant="th">
        <TableData>Company</TableData>
        <TableData>Contact</TableData>
        <TableData>Country</TableData>
      </TableRow>
    </thead>
    <tbody>
      <TableRow>
        <TableData>Alfreds Futterkiste</TableData>
        <TableData>Maria Anders</TableData>
        <TableData>Germany</TableData>
      </TableRow>
      <TableRow>
        <TableData>Centro comercial Moctezuma</TableData>
        <TableData>Francisco Chang</TableData>
        <TableData>Mexico</TableData>
      </TableRow>
      <TableRow>
        <TableData>Ernst Handel</TableData>
        <TableData>Roland Mendel</TableData>
        <TableData>Austria</TableData>
      </TableRow>
      <TableRow>
        <TableData>Island Trading</TableData>
        <TableData>Helen Bennett</TableData>
        <TableData>UK</TableData>
      </TableRow>
      <TableRow>
        <TableData>Laughing Bacchus Winecellars</TableData>
        <TableData>Yoshi Tannamuri</TableData>
        <TableData>Canada</TableData>
      </TableRow>
      <TableRow>
        <TableData>Magazzini Alimentari Riuniti</TableData>
        <TableData>Giovanni Rovelli</TableData>
        <TableData>Italy</TableData>
      </TableRow>
    </tbody>
  </Table>
);

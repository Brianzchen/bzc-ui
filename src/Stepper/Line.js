// @flow
import * as React from 'react';

import Box from '../Box';

import stepStates from './stepStates';

type Props = {|
  state: stepStates,
|};

const Line = ({
  state,
}: Props): React.Node => (
  <Box
    style={(theme) => ({
      flex: 1,
      height: theme.line(2),
      margin: `auto ${theme.spacing(1)}px`,
      backgroundColor: theme.colors[state !== stepStates.Unselected ? 'secondary' : 'monoTertiary'](),
    })}
  />
);

export default Line;

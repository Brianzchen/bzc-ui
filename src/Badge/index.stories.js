// @flow
import * as React from 'react';

import {
  Badge,
  Inline,
} from '..';

export const Basic = (): React.Node => (
  <Inline space="spacing(2)">
    <Badge>
      MPT
    </Badge>
    <Badge variant="number">
      1000
    </Badge>
    <Badge variant="number">
      5
    </Badge>
  </Inline>
);

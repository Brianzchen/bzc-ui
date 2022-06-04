// @flow
import * as React from 'react';

import {
  Stack,
  TextArea,
} from '..';

export const Basic = (): React.Node => (
  <Stack space="spacing(4)">
    <TextArea
      title="Basic"
    />
    <TextArea
      title="Disabled"
      disabled
    />
  </Stack>
);

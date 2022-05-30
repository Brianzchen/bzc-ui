// @flow
import * as React from 'react';

import {
  Checkbox,
  Stack,
} from '..';

export const Basic = (): React.Node => (
  <Stack
    space="spacing(4)"
  >
    <Checkbox
      value
    >
      checked
    </Checkbox>
    <Checkbox>
      unchecked
    </Checkbox>
    <Checkbox
      disabled
      value
    >
      disabled checked
    </Checkbox>
    <Checkbox
      disabled
    >
      disabled unchecked
    </Checkbox>
  </Stack>
);

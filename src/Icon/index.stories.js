// @flow
import * as React from 'react';

import {
  Icon,
  Inline,
  Stack,
} from '..';

export const Basic = (): React.Node => (
  <Stack space="spacing(4)">
    <Inline space="spacing(2)">
      Normal
      <Icon
        icon="microsoft-xbox"
        size={20}
      />
    </Inline>
    <Inline space="spacing(2)">
      With Button
      <Icon
        icon="microsoft-xbox"
        withButton
        size={20}
      />
    </Inline>
    <Inline space="spacing(2)">
      Disabled
      <Icon
        icon="microsoft-xbox"
        disabled
        withButton
        size={20}
      />
    </Inline>
  </Stack>
);

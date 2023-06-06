// @flow
import * as React from 'react';

import BaseButton from '.';

import {
  Box,
  Card,
  Stack,
  Typography,
} from '..';

export const Basic = (): React.Node => (
  <>
    <BaseButton
      onClick={() => console.info('clicked')}
    >
      Button
    </BaseButton>
    <BaseButton
      disabled
      onClick={() => console.info('clicked')}
    >
      Disabled Button
    </BaseButton>
  </>
);

export const DisabledInAForm = (): React.Node => (
  <form
    onClick={() => console.info('clicked')}
  >
    <BaseButton
      disabled
    >
      Button
    </BaseButton>
  </form>
);

export const Colors = (): React.Node => (
  <>
    <BaseButton color="connected">
      connected
    </BaseButton>
    <Box color="confident">
      <BaseButton>
        inherit confident
      </BaseButton>
    </Box>
  </>
);

export const Unstyled = (): React.Node => (
  <Stack space="spacing(4)">
    <>
      <Typography>
        Card wrapped in BaseButton
      </Typography>
      <BaseButton unstyled>
        <Card>
          {"I'm a card"}
        </Card>
      </BaseButton>
    </>
    <>
      <Typography>
        Card on its own
      </Typography>
      <Card>
        {"I'm a card"}
      </Card>
    </>
    <>
      <Typography>
        Card wrapped in a base styled BaseButton
      </Typography>
      <BaseButton>
        <Card>
          {"I'm a card"}
        </Card>
      </BaseButton>
    </>
  </Stack>
);

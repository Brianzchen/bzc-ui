// @flow
import * as React from 'react';

import {
  Card,
  Stack,
} from '..';

export const Basic = (): React.Node => (
  <Card
    variant="secondary"
    style={(theme) => ({
      margin: theme.spacing(2),
      padding: theme.spacing(2),
    })}
  >
    <Stack space="spacing(2)">
      <Card>
        A
      </Card>
      <Card>
        A
      </Card>
      <Card>
        A
      </Card>
    </Stack>
  </Card>
);

export const FirstElementIsFalsy = (): React.Node => (
  <Card
    variant="secondary"
    style={(theme) => ({
      margin: theme.spacing(2),
      padding: theme.spacing(2),
    })}
  >
    <Stack space="spacing(2)">
      {false}
      <Card>
        A
      </Card>
      <Card>
        A
      </Card>
    </Stack>
  </Card>
);

export const StackWithFragment = (): React.Node => (
  <Card
    variant="secondary"
    style={(theme) => ({
      margin: theme.spacing(2),
      padding: theme.spacing(2),
    })}
  >
    <Stack
      space="spacing(2)"
    >
      <Card>
        A
      </Card>
      {false}
      <>
        <Card>
          A
        </Card>
        <Card>
          A
        </Card>
      </>
      <Card>
        A
      </Card>
    </Stack>
  </Card>
);

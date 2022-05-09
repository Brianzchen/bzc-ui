// @flow
import * as React from 'react';

import {
  Card,
  Divider,
  LoadingSpinner,
  Typography,
} from '..';

export const Basic = (): React.Node => (
  <>
    <Typography>
      Default
    </Typography>
    <LoadingSpinner />
    <Divider
      top="spacing(2)"
      bottom="spacing(2)"
    />
    <Typography>
      32px size and white
    </Typography>
    <Card
      style={(theme) => ({
        display: 'inline-block',
        padding: theme.spacing(4),
        backgroundColor: theme.colors.secondary(),
      })}
    >
      <LoadingSpinner
        size="spacing(6)"
        color="monoInverse"
      />
    </Card>
  </>
);

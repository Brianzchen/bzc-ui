// @flow
import * as React from 'react';

import { Card, Button, useTheme } from '..';

export const TertiaryButtonOnInverseBackground = (): React.Node => {
  const theme = useTheme();

  return (
    <Card
      style={{
        padding: theme.spacing(4),
        backgroundColor: theme.colors.primary(),
      }}
    >
      <Button
        style={{
          display: 'inline-block',
          width: 'auto',
        }}
        variant="tertiary"
        tertiaryAlternateText
      >
        Button
      </Button>
      <Button
        style={{
          display: 'inline-block',
          width: 'auto',
        }}
        variant="destructive-tertiary"
        tertiaryAlternateText
      >
        Button
      </Button>
    </Card>
  );
};

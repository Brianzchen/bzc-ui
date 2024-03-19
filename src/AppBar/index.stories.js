// @flow
import * as React from 'react';

import {
  Button,
  Inline,
  Stack,
  Typography,
} from '..';

import * as types from '../types';

export const Basic = (): React.Node => (
  <Typography>
    AppBar is rendered above
  </Typography>
);

type Props = {|
  setAppBarNotification: (void | {|
    variant: types.NotificationVariantT,
    message: string,
  |}) => void,
|};

export const WithNotification = ({
  setAppBarNotification,
}: Props): React.Node => {
  const [variant, setVariant] = React.useState('note');

  React.useEffect(() => {
    setAppBarNotification({
      variant,
      message: 'This is a sample message',
    });

    return () => {
      setAppBarNotification();
    };
  }, [variant]);

  return (
    <Stack space="spacing(4)">
      <Typography>
        AppBar above is rendered with a notification
      </Typography>
      <Typography>
        Toggle below to show some variations
      </Typography>
      <Inline space="spacing(4)">
        <Button
          onClick={() => {
            setVariant('note');
          }}
        >
          Regular
        </Button>
        <Button
          onClick={() => {
            setVariant('error');
          }}
        >
          Error
        </Button>
      </Inline>
    </Stack>
  );
};

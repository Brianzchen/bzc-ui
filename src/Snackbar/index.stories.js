// @flow
import * as React from 'react';

import {
  Button,
  Inline,
  Snackbar,
} from '..';

export const Basic = (): React.Node => {
  const [notify, setNotify] = React.useState<void | 'left' | 'center' | 'right'>();

  return (
    <>
      <Inline
        space="spacing(2)"
        itemStyle={{
          flex: 1,
        }}
      >
        <Button
          onClick={() => {
            setNotify('left');
          }}
        >
          Notify left
        </Button>
        <Button
          onClick={() => {
            setNotify('center');
          }}
        >
          Notify center
        </Button>
        <Button
          onClick={() => {
            setNotify('right');
          }}
        >
          Notify right
        </Button>
      </Inline>
      {notify && (
        <Snackbar
          onClose={() => {
            setNotify();
          }}
          position={notify ?? 'left'}
        >
          You are notified!
        </Snackbar>
      )}
    </>
  );
};

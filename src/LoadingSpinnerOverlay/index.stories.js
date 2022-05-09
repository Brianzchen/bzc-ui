// @flow
import * as React from 'react';

import {
  Button,
  LoadingSpinnerOverlay,
} from '..';

export const Basic = (): React.Node => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    }
  }, [open]);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Open Loading Overlay
      </Button>
      {open && <LoadingSpinnerOverlay />}
    </>
  );
};

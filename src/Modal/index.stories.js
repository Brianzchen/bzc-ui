// @flow
import * as React from 'react';

import {
  Button,
  Modal,
} from 'bzc-ui';

export const Basic = (): React.Node => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Open
      </Button>
      <Modal
        title="Basic"
        onClose={() => {
          setOpen(false);
        }}
        open={open}
      >
        test
      </Modal>
    </>
  );
};

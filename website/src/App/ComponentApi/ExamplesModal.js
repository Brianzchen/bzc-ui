// @flow
import * as React from 'react';

import { Modal } from 'startown';

type Props = {|
  component: string,
  onClose: () => void,
|};

const ExamplesModal = ({
  component,
  onClose,
}: Props): React.Node => {
  console.log(component);

  return (
    <Modal
      title="Examples"
      onClose={onClose}
    >
      Test
    </Modal>
  );
};

export default ExamplesModal;

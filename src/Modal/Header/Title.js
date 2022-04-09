// @flow
import * as React from 'react';

import Box from '../../Box';

type Props = {|
  children: React.Node,
  compTestId: (string) => string,
|};

const Title = ({
  children,
  compTestId,
}: Props): React.Node => (
  <Box
    as="span"
    id="st-modal-title"
    data-testid={compTestId('title')}
  >
    {children}
  </Box>
);

export default Title;

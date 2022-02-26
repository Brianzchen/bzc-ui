// @flow
import * as React from 'react';

import Box from '../Box';
import Typography from '../Typography';
import type { ThemeT } from '../types';

type Props = {|
  metadata?: React.Node,
  errorMessage?: React.Node,
  marginLeft: number,
  compTestId: (string) => string,
|};

const ExtraDetails = ({
  metadata = null,
  errorMessage = null,
  marginLeft,
  compTestId,
}: Props): React.Node => {
  const styles = {
    extraInfo: {
      marginLeft,
    },
    metadata: (theme: ThemeT) => ({
      color: theme.colors.monoTertiary(),
    }),
    errorMessage: (theme: ThemeT) => ({
      color: theme.colors.error(),
    }),
  };

  return (
    <Typography
      data-testid={compTestId('extra-details')}
      type="description"
      style={styles.extraInfo}
    >
      <Box
        data-testid={compTestId('metadata')}
        style={styles.metadata}
      >
        {metadata}
      </Box>
      <Box
        data-testid={compTestId('error-message')}
        style={styles.errorMessage}
      >
        {errorMessage}
      </Box>
    </Typography>
  );
};

export default ExtraDetails;

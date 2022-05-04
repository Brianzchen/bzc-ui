// @flow
import * as React from 'react';

import {
  Box,
  Typography,
  Gap,
  useTheme,
} from 'startown';

type Props = {|
  title: React.Node,
  children: React.Node,
|};

const PageWrapper = ({
  title,
  children,
}: Props): React.Node => {
  const theme = useTheme();

  return (
    <Box
      style={{
        margin: theme.spacing(5),
        width: '100%',
        overflow: 'auto',
      }}
    >
      <Typography
        type="heading1"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {title}
      </Typography>
      <Gap height="spacing(5)" />
      {children}
    </Box>
  );
};

export default PageWrapper;

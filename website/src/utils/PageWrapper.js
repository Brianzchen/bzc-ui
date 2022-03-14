// @flow
import * as React from 'react';

import {
  Box,
  Typography,
  Gap,
  useTheme,
} from 'starfall';

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
      }}
    >
      <Typography type="heading1">
        {title}
      </Typography>
      <Gap height="spacing(5)" />
      {children}
    </Box>
  );
};

export default PageWrapper;

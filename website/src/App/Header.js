// @flow
import * as React from 'react';

import { AppBar, Icon, Typography } from 'starfall';

const Header = (): React.Node => (
  <AppBar>
    <Icon />
    <Typography type="heading1">
      starfall
    </Typography>
  </AppBar>
);

export default Header;

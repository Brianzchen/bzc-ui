// @flow
import * as React from 'react';

import pkgJson from 'pkgJson';

import { Anchor, AppBar, Icon } from 'starfall';

type Props = {|
  onMenuClick: () => void,
|};

const Header = ({
  onMenuClick,
}: Props): React.Node => (
  <AppBar
    style={{
      justifyContent: 'space-between',
    }}
  >
    <Icon
      id="menu-button"
      icon="menu"
      size={32}
      withButton
      onClick={onMenuClick}
    />
    <Anchor
      href={pkgJson.repository}
      newTab
    >
      <Icon icon="github" size={32} />
    </Anchor>
  </AppBar>
);

export default Header;

// @flow
import * as React from 'react';

import pkgJson from 'pkgJson';

import { Anchor, AppBar, Icon } from 'startown';

import { AppBarNotificationContext } from '../utils';

type Props = {|
  onMenuClick: () => void,
  setAppBarHeight: (newHeight: number) => void,
|};

const Header = ({
  onMenuClick,
  setAppBarHeight,
}: Props): React.Node => {
  const { value } = React.useContext(AppBarNotificationContext);

  return (
    <AppBar
      style={{
        justifyContent: 'space-between',
      }}
      notificationText={value?.message}
      notificationVariant={value?.variant}
      onHeightChange={setAppBarHeight}
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
};

export default Header;

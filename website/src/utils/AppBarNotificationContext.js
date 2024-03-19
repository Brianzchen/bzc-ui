// @flow
import * as React from 'react';

import type { NotificationVariantT } from 'bzc-ui/types';

export type AppBarNotificationT = void | {|
  variant: NotificationVariantT,
  message: string,
|};

export default (React.createContext<{|
  value: AppBarNotificationT,
  // eslint-disable-next-line ft-flow/space-after-type-colon
  setValue:(AppBarNotificationT) => void,
    |}>({
      value: undefined,
      setValue: () => {},
    }): React$Context<{|
  value: AppBarNotificationT,
  setValue: (AppBarNotificationT) => void,
|}>);

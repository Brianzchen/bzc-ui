// @flow
import * as React from 'react';

import { types } from 'bzc-ui';

export type AppBarNotificationT = void | {|
  variant: types.NotificationVariantT,
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

// @flow
import * as React from 'react';

import type { RefObjT } from '../../types';

export default (passedRef?: RefObjT): RefObjT => {
  const internalRef = React.useRef<HTMLElement | null>(null);

  return passedRef ?? internalRef;
};

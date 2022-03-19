// @flow
import * as React from 'react';

import type { FlowTypeT } from '..';

export default (flowType: FlowTypeT): React.Node => {
  if (flowType.name === 'literal') {
    return flowType.value;
  }
  if (flowType.name === 'signature') {
    return flowType.raw;
  }
  if (flowType.name === 'union') {
    return flowType.raw;
  }

  return flowType.name;
};

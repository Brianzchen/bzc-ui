// @flow
import removePx from '../internal/removePx';

import type { CornersT } from '../types';

export default (
  corner: { [key: CornersT]: string, ... },
  scale: number = 1,
): ((
  ...args: Array<any>
) => any) => (
  (space: CornersT): string => `${removePx(corner[space]) * scale}px`
);

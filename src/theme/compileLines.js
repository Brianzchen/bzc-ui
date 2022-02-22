// @flow
import removePx from '../internal/removePx';

import type { LinesT } from '../types';

export default (
  lines: { [key: LinesT]: string, ... },
  scale: number = 1,
): (
  ...args: Array<any>
) => any => (
  (space: LinesT): string => `${removePx(lines[space]) * scale}px`
);

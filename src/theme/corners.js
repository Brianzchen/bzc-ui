// @flow
import type { CornersMaybeT } from '../types';

export default ({
  [0]: '0px',
  [1]: '2px',
  [2]: '4px',
  [3]: '8px',
}: { [_key in keyof CornersMaybeT]: string });

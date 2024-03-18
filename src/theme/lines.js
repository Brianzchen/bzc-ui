// @flow
import type { LinesMaybeT } from '../types';

export default ({
  [1]: '1px',
  [2]: '2px',
  [3]: '4px',
}: { [_key in keyof LinesMaybeT]: string });

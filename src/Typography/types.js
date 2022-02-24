// @flow
import type { FontTypeT } from '../types';

export type TypePropT = FontTypeT | {|
  ['sm' | 'md' | 'lg']: FontTypeT,
|};

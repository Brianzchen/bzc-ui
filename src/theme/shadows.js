// @flow
import hexToRgba from '../internal/hexToRgba';

import type { ThemeT } from '../types';

export const modal = (theme: ThemeT): string => (
  `0 ${theme.spacing(2)}px ${theme.spacing(5)}px 0 ${hexToRgba(theme.colors.grey1(), 0.35)}`
);

export const dropdown = (theme: ThemeT): string => (
  `0 ${theme.spacing(1)}px ${theme.spacing(3)}px 0 ${hexToRgba(theme.colors.grey1(), 0.25)}`
);

export const card = (theme: ThemeT): string => (
  `0 ${theme.spacing(1) / 2}px ${theme.spacing(1)}px 0 ${hexToRgba(theme.colors.grey1(), 0.15)}`
);

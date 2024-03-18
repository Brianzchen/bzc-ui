// @flow
import * as React from 'react';

import type { ThemeT } from '../types';

import compileColors from './compileColors';
import compileLines from './compileLines';
import compileCorners from './compileCorners';
import compileSpacing from './compileSpacing';
import colors from './colors/default';
import corners from './corners';
import * as elevations from './elevations';
import * as fonts from './fonts';
import lines from './lines';
import * as shadows from './shadows';
import spacing from './spacing';
import tabletWidth from './tabletWidth';
import mobileWidth from './mobileWidth';

const theme = {
  colors: compileColors(colors),
  corner: compileCorners(corners),
  fonts,
  spacing: compileSpacing(spacing),
  line: compileLines(lines),
  shadows: {
    modal: '',
    dropdown: '',
    card: '',
  },
  elevations,
  tabletWidth,
  mobileWidth,
  focusEffect: true,
  scale: 1,
};

theme.shadows = {
  modal: shadows.modal(theme),
  dropdown: shadows.dropdown(theme),
  card: shadows.card(theme),
};

const Context: React$Context<ThemeT> = React.createContext<ThemeT>(theme);

export const {
  Provider,
  Consumer,
} = Context;

export default Context;

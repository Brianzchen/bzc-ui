// @flow
import * as React from 'react';

import defaultColors from '../theme/colors/default';
import defaultCorners from '../theme/corners';
import * as defaultElevations from '../theme/elevations';
import * as defaultFonts from '../theme/fonts';
import * as shadows from '../theme/shadows';
import defaultSpacing from '../theme/spacing';
import defaultLines from '../theme/lines';
import defaultTabletWidth from '../theme/tabletWidth';
import defaultMobileWidth from '../theme/mobileWidth';

import { Provider as ThemeProvider } from '../theme/themeContext';
import compileColors from '../theme/compileColors';
import compileCorners from '../theme/compileCorners';
import compileFonts from '../theme/compileFonts';
import compileLines from '../theme/compileLines';
import compileSpacing from '../theme/compileSpacing';

import type {
  CornersMaybeT,
  SpacingMaybeT,
  LinesMaybeT,
  FontsMaybeT,
  ElevationsMaybeT,
  ThemeT,
} from '../types';

type Props = {|
  /** child components to consume from the theme */
  children: React.Node,
  /** object of color properties to override the default values */
  colors?: {|
    primary?: string,
    secondary?: string,
    highlight?: string,
    error?: string,
    successBackground?: string,
    infoBackground?: string,
    warningBackground?: string,
    errorBackground?: string,
    grey1?: string,
    grey2?: string,
    grey3?: string,
    grey4?: string,
    grey5?: string,
    grey6?: string,
    grey7?: string,
  |},
  /** object of corner properties to override the default values */
  corners?: CornersMaybeT,
  /** object of spacing properties to override the default values */
  spacing?: SpacingMaybeT,
  /** object of line properties to override the default values */
  lines?: LinesMaybeT,
  /** object of font properties to override the default values */
  fonts?: FontsMaybeT,
  /** object of elevation properties to override the default values */
  elevations?: ElevationsMaybeT,
  /** value to override the default tablet (md) media breakpoint */
  tabletWidth?: number,
  /** value to override the default mobile (sm) media breakpoint */
  mobileWidth?: number,
  /** function that will return you the theme object any time it's changed */
  onThemeChange?: (...args: Array<any>) => any,
  /** whether keyboard focus effects should be enabled for all child components */
  focusEffect?: boolean,
  /**
   * override all `Anchor` components to render as the component passed in
   * instead of the default.
   * Accepts an html semantic tag as a string or component
   */
  anchorAs?: any,
  /**
   * A multiplier value to increase the scale of all starfall components,
   * spacing, and fonts by a given amount
   */
  scale?: number,
  /**
   * To configure different presets of color schemes such as default, dark mode, etc
   */
  // theme?: 'default',
|};

/**
 * Use the provider to override default values and apply changes across across starfall
 * components such as colors, scale and more.
 */
const Provider = (props: Props): React.Node => {
  const colors = {
    ...defaultColors,
    ...props.colors,
  };
  // $FlowExpectedError[incompatible-type]
  const corners = {
    ...defaultCorners,
    ...props.corners,
  };
  const fonts = {
    ...defaultFonts,
    ...props.fonts,
  };
  const spacing = {
    ...defaultSpacing,
    ...props.spacing,
  };
  // $FlowExpectedError[incompatible-type]
  const lines = {
    ...defaultLines,
    ...props.lines,
  };
  const elevations = {
    ...defaultElevations,
    ...props.elevations,
  };
  const tabletWidth = props.tabletWidth || defaultTabletWidth;
  const mobileWidth = props.mobileWidth || defaultMobileWidth;

  React.useEffect(() => {
    props.onThemeChange && props.onThemeChange({
      colors,
      corners,
      fonts,
      spacing,
      elevations,
      tabletWidth,
      mobileWidth,
      focusEffect: props.focusEffect ?? true,
    });
  }, [
    props.colors,
    props.corners,
    props.fonts,
    props.spacing,
    props.elevations,
    props.tabletWidth,
    props.mobileWidth,
    props.focusEffect,
  ]);

  const theme: ThemeT = {
    colors: compileColors(colors),
    corner: compileCorners(corners, props.scale ?? 1),
    fonts: compileFonts(fonts, props.scale ?? 1),
    spacing: compileSpacing(spacing, props.scale ?? 1),
    line: compileLines(lines, props.scale ?? 1),
    // $FlowExpectedError[incompatible-type]
    elevations,
    tabletWidth,
    mobileWidth,
    focusEffect: props.focusEffect || false,
    shadows: {
      modal: '',
      dropdown: '',
      card: '',
    },
    anchorAs: props.anchorAs,
    scale: props.scale ?? 1,
  };

  theme.shadows = {
    modal: shadows.modal(theme),
    dropdown: shadows.dropdown(theme),
    card: shadows.card(theme),
  };

  return (
    <ThemeProvider
      value={theme}
    >
      {props.children}
    </ThemeProvider>
  );
};

export default Provider;

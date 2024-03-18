// @flow
/* eslint-disable no-use-before-define */
import type { StyleObject } from 'aphrodite';

// Only types coming from this file should be exposed to consumers
// Once build is complete it can be imported as
// `import type { ColorFuncT } from 'bzc-ui';`

export type ColorFuncT = (shade?: number, opacity?: number) => string;

export type ColorsT = {|
  primary: ColorFuncT,
  secondary: ColorFuncT,
  highlight: ColorFuncT,
  error: ColorFuncT,
  successBackground: ColorFuncT,
  infoBackground: ColorFuncT,
  warningBackground: ColorFuncT,
  errorBackground: ColorFuncT,
  monoPrimary: ColorFuncT,
  monoSecondary: ColorFuncT,
  monoTertiary: ColorFuncT,
  monoMid: ColorFuncT,
  monoHighlight: ColorFuncT,
  monoLow: ColorFuncT,
  monoInverse: ColorFuncT,
|};

export type CornersT = 0 | 1 | 2 | 3;

export type CornerFuncT = (corner: CornersT) => string;

export type FontTypeT = (
  'displayTitle1' |
  'displayTitle2' |
  'heading1' |
  'heading2' |
  'heading3' |
  'button' |
  'body' |
  'label' |
  'smallButton' |
  'description' |
  'metadata'
);

export type FontValueT = {|
  px: number,
  leading: string,
  style: 100
    | 200
    | 300
    | 400
    | 500
    | 600
    | 700
    | 800
    | 900,
  mobile?: {|
    px: number,
    leading: string,
    style: 100
      | 200
      | 300
      | 400
      | 500
      | 600
      | 700
      | 800
      | 900,
  |},
|};

export type FontsT = {|
  displayTitle1: FontValueT,
  displayTitle2: FontValueT,
  heading1: FontValueT,
  heading2: FontValueT,
  heading3: FontValueT,
  button: FontValueT,
  body: FontValueT,
  label: FontValueT,
  smallButton: FontValueT,
  description: FontValueT,
  metadata: FontValueT,
  [string]: FontValueT,
|};

export type LinesT = 1 | 2 | 3;

export type LineFuncT = (line: LinesT) => string;

type ElevationsT = {|
  sheet: number,
  drawer: number,
  modal: number,
  hover: number,
|};

export type ShadowsT = {|
  modal: string,
  dropdown: string,
  card: string,
|};

export type SpacingT = (number) => number;

export type ThemeT = {
  colors: ColorsT,
  corner: CornerFuncT,
  fonts: FontsT,
  shadows: ShadowsT,
  spacing: SpacingT,
  line: LineFuncT,
  elevations: ElevationsT,
  mobileWidth: number,
  tabletWidth: number,
  focusEffect: boolean,
  scale: number,
  iconBase?: string,
  iconPrefix?: string,
  ...
};

export type CornersMaybeT = {|
  [key: CornersT]: string | void,
|};

export type SpacingMaybeT = {|
  '1'?: number,
  '2'?: number,
  '3'?: number,
  '4'?: number,
  '5'?: number,
  '6'?: number,
  '7'?: number,
  '8'?: number,
  '9'?: number,
  '10'?: number,
  '11'?: number,
  '12'?: number,
|};

export type LinesMaybeT = {|
  [key: LinesT]: string | void,
|};

export type FontsMaybeT = {|
  displayTitle1?: FontValueT,
  displayTitle2?: FontValueT,
  heading1?: FontValueT,
  heading2?: FontValueT,
  heading3?: FontValueT,
  button?: FontValueT,
  body?: FontValueT,
  label?: FontValueT,
  smallButton?: FontValueT,
  description?: FontValueT,
  metadata?: FontValueT,
|};

export type ElevationsMaybeT = { [_key in keyof ElevationsT]: number | void };

export type InputFormatT = 'credit-card';

export type HiddenT = 'sm' | 'md' | 'lg';

export type NotificationVariantT = 'success' | 'note' | 'warning' | 'error';

export type RefObjT = {|
  current: HTMLElement | null,
|} | any;

export type StyleObjT = $ReadOnly<{
  ...StyleObject,
  // bzc-ui internal --------
  ':sf-min(sm)'?: StyleObjT,
  ':sf-min(md)'?: StyleObjT,
  ':sf-max(sm)'?: StyleObjT,
  ':sf-max(md)'?: StyleObjT,
  ...
}>;

export type StylerT = (
  style: StyleT,
  theme: ThemeT,
  target?: StyleObjT
) => StyleObjT;

export type StyleT = StyleObjT | ((theme: ThemeT, styler: StylerT) => StyleObjT);

export type FormOnSubmitT = (
  event: any,
  values: {
    [key: string]: ?{|
      valid: false,
      error: false,
      value: '',
    |},
  }) => any;

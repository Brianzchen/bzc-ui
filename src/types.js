// @flow
/* eslint-disable no-use-before-define */
import type { FontFamily } from 'aphrodite';

// Only types coming from this file should be exposed to consumers
// Once build is complete it can be imported as
// `import type { ColorFuncT } from 'starfall';`

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
  MonoMid: ColorFuncT,
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

export type ElevationsMaybeT = $ObjMapConst<ElevationsT, number | void>;

export type InputFormatT = 'credit-card';

export type HiddenT = 'sm' | 'md' | 'lg';

export type NotificationT = 'success' | 'note' | 'warning' | 'error';

export type RefObjT = {|
  current: HTMLElement | null,
|} | any;

export type StyleObjT = {
  // Starfall internal --------
  ':sf-min(sm)'?: StyleObjT,
  ':sf-min(md)'?: StyleObjT,
  ':sf-max(sm)'?: StyleObjT,
  ':sf-max(md)'?: StyleObjT,
  // --------------------------
  '::-ms-clear'?: StyleObjT,
  '::-ms-expand'?: StyleObjT,
  '::-webkit-scrollbar'?: StyleObjT,
  ':active'?: StyleObjT,
  ':any-link'?: StyleObjT,
  ':checked'?: StyleObjT,
  ':default'?: StyleObjT,
  ':dir(rtl)'?: StyleObjT,
  ':dir(ltr)'?: StyleObjT,
  ':disabled'?: StyleObjT,
  ':empty'?: StyleObjT,
  ':enabled'?: StyleObjT,
  ':first'?: StyleObjT,
  ':first-child'?: StyleObjT,
  ':first-of-type'?: StyleObjT,
  ':fullscreen'?: StyleObjT,
  ':focus'?: StyleObjT,
  ':focus-within'?: StyleObjT,
  ':hover'?: StyleObjT,
  ':indeterminate'?: StyleObjT,
  ':in-range'?: StyleObjT,
  ':invalid'?: StyleObjT,
  ':lang(en)'?: StyleObjT,
  ':lang(fr)'?: StyleObjT,
  ':lang(de)'?: StyleObjT,
  ':lang(es)'?: StyleObjT,
  ':lang(ru)'?: StyleObjT,
  ':lang(zh)'?: StyleObjT,
  ':last-child'?: StyleObjT,
  ':last-of-type'?: StyleObjT,
  ':left'?: StyleObjT,
  ':link'?: StyleObjT,
  ':nth-child(even)'?: StyleObjT,
  ':nth-child(odd)'?: StyleObjT,
  ':nth-last-child(even)'?: StyleObjT,
  ':nth-last-child(odd)'?: StyleObjT,
  ':only-child'?: StyleObjT,
  ':only-of-type'?: StyleObjT,
  ':optional'?: StyleObjT,
  ':out-of-range'?: StyleObjT,
  ':placeholder-shown'?: StyleObjT,
  ':read-only'?: StyleObjT,
  ':read-write'?: StyleObjT,
  ':required'?: StyleObjT,
  ':right'?: StyleObjT,
  ':root'?: StyleObjT,
  ':scope'?: StyleObjT,
  ':target'?: StyleObjT,
  ':valid'?: StyleObjT,
  ':visited'?: StyleObjT,
  ':after'?: StyleObjT,
  '::after'?: StyleObjT,
  ':before'?: StyleObjT,
  '::before'?: StyleObjT,
  '::backdrop'?: StyleObjT,
  ':first-letter'?: StyleObjT,
  '::first-letter'?: StyleObjT,
  ':first-line'?: StyleObjT,
  '::first-line'?: StyleObjT,
  '::selection'?: StyleObjT,
  alignContent?: CSSWideKeyword
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'stretch',
  alignItems?: CSSWideKeyword
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'baseline'
    | 'stretch',
  alignSelf?: CSSWideKeyword
    | 'auto'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'baseline'
    | 'stretch',
  alignmentAdjust?: CSSWideKeyword | string | number,
  alignmentBaseline?: CSSWideKeyword
    | 'auto'
    | 'baseline'
    | 'before-edge'
    | 'text-before-edge'
    | 'middle'
    | 'central'
    | 'after-edge'
    | 'text-after-edge'
    | 'ideographic'
    | 'alphabetic'
    | 'hanging'
    | 'mathematical'
    | 'use-script',
  all?: string,
  animation?: string,
  animationDelay?: CSSWideKeyword | string | number,
  animationDirection?: CSSWideKeyword
    | 'normal'
    | 'reverse'
    | 'alternate'
    | 'alternate-reverse',
  animationDuration?: string,
  animationFillMode?: string,
  animationIterationCount?: CSSWideKeyword | 'infinite' | number,
  animationName?: { ... } | Array<{ ... }>,
  animationPlayState?: CSSWideKeyword | 'running' | 'paused',
  animationTimingFunction?: string,
  appearance?: CSSWideKeyword | 'auto' | 'none',
  backdropFilter?: string,
  webkitBackdropFilter?: string,
  backfaceVisibility?: CSSWideKeyword | 'visible' | 'hidden',
  background?: CSSWideKeyword | string,
  backgroundAttachment?: CSSWideKeyword | 'scroll' | 'fixed' | 'local',
  backgroundBlendMode?: CSSWideKeyword
    | 'normal'
    | 'multiply'
    | 'screen'
    | 'overlay'
    | 'darken'
    | 'lighten'
    | 'color-dodge'
    | 'color-burn'
    | 'hard-light'
    | 'soft-light'
    | 'difference'
    | 'exclusion'
    | 'hue'
    | 'saturation'
    | 'color'
    | 'luminosity',
  backgroundClip?: string,
  backgroundColor?: CSSWideKeyword | string,
  backgroundComposite?: CSSWideKeyword | string,
  backgroundImage?: CSSWideKeyword | string,
  backgroundOrigin?: CSSWideKeyword | 'border-box' | 'padding-box' | 'content-box',
  backgroundPosition?: CSSWideKeyword | string | number,
  backgroundPositionX?: string,
  backgroundPositionY?: string,
  backgroundRepeat?: CSSWideKeyword | string,
  backgroundSize?: string,
  blockSize?: string,
  border?: CSSWideKeyword | string | number,
  borderBlockEnd?: string,
  borderBlockEndColor?: string,
  borderBlockEndStyle?: string,
  borderBlockEndWidth?: string,
  borderBlockStart?: string,
  borderBlockStartColor?: string,
  borderBlockStartStyle?: string,
  borderBlockStartWidth?: string,
  borderBottom?: CSSWideKeyword | string | number,
  borderBottomColor?: CSSWideKeyword | string,
  borderBottomLeftRadius?: CSSWideKeyword | string | number,
  borderBottomRightRadius?: CSSWideKeyword | string | number,
  borderBottomStyle?: CSSWideKeyword
    | 'none'
    | 'hidden'
    | 'dotted'
    | 'dashed'
    | 'solid'
    | 'double'
    | 'groove'
    | 'ridge'
    | 'inset'
    | 'outset',
  borderBottomWidth?: CSSWideKeyword | string | number,
  borderCollapse?: CSSWideKeyword | 'collapse' | 'separate',
  borderColor?: CSSWideKeyword | string,
  borderCornerShape?: CSSWideKeyword | string,
  borderImage?: string,
  borderImageOutset?: string,
  borderImageRepeat?: string,
  borderImageSlice?: string,
  borderImageSource?: CSSWideKeyword | string | number,
  borderImageWidth?: CSSWideKeyword | string | number,
  borderInlineEnd?: string,
  borderInlineEndColor?: string,
  borderInlineEndStyle?: string,
  borderInlineEndWidth?: string,
  borderInlineStart?: string,
  borderInlineStartColor?: string,
  borderInlineStartStyle?: string,
  borderInlineStartWidth?: string,
  borderLeft?: CSSWideKeyword | string | number,
  borderLeftColor?: CSSWideKeyword | string,
  borderLeftStyle?: CSSWideKeyword
    | 'none'
    | 'hidden'
    | 'dotted'
    | 'dashed'
    | 'solid'
    | 'double'
    | 'groove'
    | 'ridge'
    | 'inset'
    | 'outset',
  borderLeftWidth?: CSSWideKeyword | string | number,
  borderRadius?: CSSWideKeyword | string | number,
  borderRight?: CSSWideKeyword | string | number,
  borderRightColor?: CSSWideKeyword | string,
  borderRightStyle?: CSSWideKeyword
    | 'none'
    | 'hidden'
    | 'dotted'
    | 'dashed'
    | 'solid'
    | 'double'
    | 'groove'
    | 'ridge'
    | 'inset'
    | 'outset',
  borderRightWidth?: CSSWideKeyword | string | number,
  borderSpacing?: CSSWideKeyword | string | number,
  borderStyle?: CSSWideKeyword
    | 'none'
    | 'hidden'
    | 'dotted'
    | 'dashed'
    | 'solid'
    | 'double'
    | 'groove'
    | 'ridge'
    | 'inset'
    | 'outset',
  borderTop?: CSSWideKeyword | string | number,
  borderTopColor?: CSSWideKeyword | string,
  borderTopLeftRadius?: CSSWideKeyword | string | number,
  borderTopRightRadius?: CSSWideKeyword | string | number,
  borderTopStyle?: CSSWideKeyword
    | 'none'
    | 'hidden'
    | 'dotted'
    | 'dashed'
    | 'solid'
    | 'double'
    | 'groove'
    | 'ridge'
    | 'inset'
    | 'outset',
  borderTopWidth?: CSSWideKeyword | string | number,
  borderWidth?: CSSWideKeyword | string | number,
  bottom?: CSSWideKeyword | string | number,
  boxDecorationBreak?: CSSWideKeyword | 'slice' | 'clone',
  boxShadow?: CSSWideKeyword | string | number,
  boxSizing?: CSSWideKeyword | 'content-box' | 'border-box',
  breakAfter?: CSSWideKeyword
    | 'auto'
    | 'avoid'
    | 'avoid-page'
    | 'page'
    | 'left'
    | 'right'
    | 'recto'
    | 'verso'
    | 'avoid-column'
    | 'column'
    | 'avoid-region'
    | 'region',
  breakBefore?: CSSWideKeyword
    | 'auto'
    | 'avoid'
    | 'avoid-page'
    | 'page'
    | 'left'
    | 'right'
    | 'recto'
    | 'verso'
    | 'avoid-column'
    | 'column'
    | 'avoid-region'
    | 'region',
  breakInside?: CSSWideKeyword
    | 'auto'
    | 'avoid'
    | 'avoid-page'
    | 'avoid-column'
    | 'avoid-region',
  captionSide?: string,
  clear?: CSSWideKeyword
    | 'none'
    | 'left'
    | 'right'
    | 'both'
    | 'inline-start'
    | 'inline-end',
  clip?: CSSWideKeyword | string,
  clipPath?: string,
  clipRule?: CSSWideKeyword | 'nonzero' | 'evenodd',
  color?: CSSWideKeyword | string,
  columns?: CSSWideKeyword | string | number,
  columnCount?: CSSWideKeyword | number | 'auto',
  columnFill?: CSSWideKeyword | 'auto' | 'balance',
  columnGap?: CSSWideKeyword | string,
  columnRule?: CSSWideKeyword | string | number,
  columnRuleColor?: CSSWideKeyword | string,
  columnRuleStyle?: string,
  columnRuleWidth?: CSSWideKeyword | string | number,
  columnSpan?: CSSWideKeyword | 'none' | 'all',
  columnWidth?: CSSWideKeyword | string | number,
  contain?: string,
  content?: string,
  counterIncrement?: CSSWideKeyword | string | number,
  counterReset?: CSSWideKeyword | string | number,
  cue?: CSSWideKeyword | string,
  cueAfter?: CSSWideKeyword | string,
  cursor?: CSSWideKeyword | string | number,
  direction?: CSSWideKeyword | 'ltr' | 'rtl',
  display?: | 'none'
    /** <display-outside> values. */
    | 'block'
    | 'inline'
    | 'run-in'
    /** <display-inside> values. */
    | 'flow'
    | 'flow-root'
    | 'table'
    | 'flex'
    | 'grid'
    | 'ruby'
    | 'subgrid'
    /** <display-outside> plus <display-inside> values */
    | 'block flow'
    | 'inline table'
    | 'flex run-in'
    /** <display-listitem> values */
    | 'list-item'
    | 'list-item block'
    | 'list-item inline'
    | 'list-item flow'
    | 'list-item flow-root'
    | 'list-item block flow'
    | 'list-item block flow-root'
    | 'flow list-item block'
    /** <display-internal> values. */
    | 'table-row-group'
    | 'table-header-group'
    | 'table-footer-group'
    | 'table-row'
    | 'table-cell'
    | 'table-column-group'
    | 'table-column'
    | 'table-caption'
    | 'ruby-base'
    | 'ruby-text'
    | 'ruby-base-container'
    | 'ruby-text-container'
    /** <display-box> values. */
    | 'contents'
    | 'none'
    /** <display-legacy> values. */
    | 'inline-block'
    | 'inline-list-item'
    | 'inline-table'
    | 'inline-flex'
    | 'inline-grid'
    /** <display-webkit> values. */
    | '-webkit-box'
    | '-webkit-inline-box'
    /** global values. */
    | CSSWideKeyword,
  emptyCells?: string,
  fill?: CSSWideKeyword | string,
  fillOpacity?: CSSWideKeyword | number,
  fillRule?: CSSWideKeyword | 'nonzero' | 'evenodd',
  filter?: CSSWideKeyword | string | number,
  flex?: CSSWideKeyword | number | string,
  flexBasis?: CSSWideKeyword | string | number,
  flexDirection?: CSSWideKeyword | 'row' | 'row-reverse' | 'column' | 'column-reverse',
  flexFlow?: CSSWideKeyword
    // flex direction
    | 'row'
    | 'row-reverse'
    | 'column'
    | 'column-reverse'
    // flex wrap
    | 'nowrap'
    | 'wrap'
    | 'wrap-reverse'
    // flex direction + flex wrap
    | 'row nowrap'
    | 'row wrap'
    | 'row wrap-reverse'
    | 'row-reverse nowrap'
    | 'row-reverse wrap'
    | 'row-reverse wrap-reverse'
    | 'column nowrap'
    | 'column wrap'
    | 'column wrap-reverse'
    | 'column-reverse nowrap'
    | 'column-reverse wrap'
    | 'column-reverse wrap-reverse'
    // flex direction + flex wrap (reverse order)
    | 'nowrap row'
    | 'wrap row'
    | 'wrap-reverse row'
    | 'nowrap row-reverse'
    | 'wrap row-reverse'
    | 'wrap-reverse row-reverse'
    | 'nowrap column'
    | 'wrap column'
    | 'wrap-reverse column'
    | 'nowrap column-reverse'
    | 'wrap column-reverse'
    | 'wrap-reverse column-reverse',
  flexGrow?: CSSWideKeyword | number,
  flexShrink?: CSSWideKeyword | number,
  flexWrap?: CSSWideKeyword | 'nowrap' | 'wrap' | 'wrap-reverse',
  float?: CSSWideKeyword | 'left' | 'right' | 'none' | 'inline-start' | 'inline-end',
  font?: CSSWideKeyword | string,
  fontFamily?: CSSWideKeyword | FontFamily | Array<FontFamily>,
  fontFeatureSettings?: string,
  fontKerning?: CSSWideKeyword | 'auto' | 'normal' | 'none',
  fontLanguageOverride?: string,
  fontSize?: CSSWideKeyword | string | number,
  fontSizeAdjust?: CSSWideKeyword | 'none' | number,
  fontStretch?: CSSWideKeyword
    | 'normal'
    | 'ultra-condensed'
    | 'extra-condensed'
    | 'condensed'
    | 'semi-condensed'
    | 'semi-expanded'
    | 'expanded'
    | 'extra-expanded'
    | 'ultra-expanded',
  fontStyle?: CSSWideKeyword | 'normal' | 'italic' | 'oblique',
  fontSynthesis?: CSSWideKeyword | string,
  fontVariant?: CSSWideKeyword | string | number,
  fontVariantAlternates?: CSSWideKeyword | string | number,
  fontVariantCaps?: string,
  fontVariantEastAsian?: string,
  fontVariantLigatures?: string,
  fontVariantNumeric?: string,
  fontVariantPosition?: string,
  fontWeight?: CSSWideKeyword
    | 'normal'
    | 'bold'
    | 'bolder'
    | 'lighter'
    | 100
    | 200
    | 300
    | 400
    | 500
    | 600
    | 700
    | 800
    | 900,
  grad?: string,
  grid?: string,
  gridArea?: CSSWideKeyword | string | number,
  gridAutoColumns?: string,
  gridAutoFlow?: string,
  gridAutoPosition?: string,
  gridAutoRows?: string,
  gridColumn?: CSSWideKeyword | string | number,
  gridColumnStart?: CSSWideKeyword | string | number,
  gridColumnEnd?: CSSWideKeyword | string | number,
  gridRow?: CSSWideKeyword | string | number,
  gridRowStart?: CSSWideKeyword | string | number,
  gridRowEnd?: CSSWideKeyword | string | number,
  gridRowPosition?: CSSWideKeyword | string | number,
  gridRowSpan?: CSSWideKeyword | number,
  gridTemplate?: string,
  gridTemplateAreas?: CSSWideKeyword | string,
  gridTemplateRows?: CSSWideKeyword | string | number,
  gridTemplateColumns?: CSSWideKeyword | string | number,
  height?: CSSWideKeyword | string | number,
  hyphens?: CSSWideKeyword | 'none' | 'manual' | 'auto',
  hyphenateLimitChars?: CSSWideKeyword | 'auto' | number,
  hyphenateLimitLines?: CSSWideKeyword | 'no-limit' | number,
  hyphenateLimitZone?: CSSWideKeyword | string | number,
  imageRendering?: string,
  imageResolution?: string,
  imageOrientation?: string,
  imeMode?: CSSWideKeyword | 'auto' | 'normal' | 'active' | 'inactive' | 'disabled',
  inherit?: string,
  initial?: string,
  inlineSize?: string,
  isolation?: string,
  justifyContent?: CSSWideKeyword
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly',
  layoutGrid?: CSSWideKeyword | string | number,
  layoutGridChar?: CSSWideKeyword | string | number,
  layoutGridLine?: CSSWideKeyword | string | number,
  layoutGridMode?: CSSWideKeyword | string | number,
  layoutGridType?: CSSWideKeyword | 'loose' | 'strict' | 'fixed',
  left?: CSSWideKeyword | string | number,
  letterSpacing?: CSSWideKeyword | string | number,
  lineBreak?: CSSWideKeyword | 'auto' | 'loose' | 'normal' | 'strict',
  lineClamp?: CSSWideKeyword | number,
  lineHeight?: CSSWideKeyword | string | number,
  listStyle?: CSSWideKeyword | string | number,
  listStyleImage?: CSSWideKeyword | string,
  listStylePosition?: CSSWideKeyword | 'inside' | 'outside',
  listStyleType?: CSSWideKeyword | string | number,
  margin?: CSSWideKeyword | string | number,
  marginBlockEnd?: string,
  marginBlockStart?: string,
  marginBottom?: CSSWideKeyword | string | number,
  marginInlineEnd?: string,
  marginInlineStart?: string,
  marginLeft?: CSSWideKeyword | string | number,
  marginRight?: CSSWideKeyword | string | number,
  marginTop?: CSSWideKeyword | string | number,
  marks?: string,
  marqueeDirection?: CSSWideKeyword | string,
  marqueeStyle?: CSSWideKeyword | string,
  mask?: CSSWideKeyword | string | number,
  maskBorder?: CSSWideKeyword | string | number,
  maskBorderRepeat?: CSSWideKeyword | string | number,
  maskBorderSlice?: CSSWideKeyword | string | number,
  maskBorderSource?: CSSWideKeyword | string | number,
  maskBorderWidth?: CSSWideKeyword | string | number,
  maskClip?: CSSWideKeyword | string | number,
  maskOrigin?: CSSWideKeyword | string | number,
  maskType?: string,
  maxBlockSize?: string,
  maxHeight?: CSSWideKeyword | string | number,
  maxInlineSize?: string,
  maxWidth?: CSSWideKeyword | string | number,
  minBlockSize?: string,
  minHeight?: CSSWideKeyword | string | number,
  minInlineSize?: string,
  minWidth?: CSSWideKeyword | string | number,
  mixBlendMode?: string,
  mozTransform?: string,
  mozTransformOrigin?: string,
  mozTransitionDelay?: string,
  mozTransitionDuration?: string,
  mozTransitionProperty?: string,
  mozTransitionTimingFunction?: string,
  objectFit?: string,
  objectPosition?: string,
  offsetBlockEnd?: string,
  offsetBlockStart?: string,
  offsetInlineEnd?: string,
  offsetInlineStart?: string,
  opacity?: CSSWideKeyword | number,
  order?: CSSWideKeyword | number,
  orphans?: CSSWideKeyword | number,
  outline?: CSSWideKeyword | string | number,
  outlineColor?: CSSWideKeyword | string | number,
  outlineOffset?: CSSWideKeyword | string | number,
  outlineStyle?: string,
  outlineWidth?: string | number,
  overflow?: CSSWideKeyword | 'auto' | 'hidden' | 'scroll' | 'visible',
  overflowStyle?: CSSWideKeyword
    | 'auto'
    | 'none'
    | 'scrollbar'
    | '-ms-autohiding-scrollbar',
  overflowWrap?: string,
  overflowX?: CSSWideKeyword | 'auto' | 'hidden' | 'scroll' | 'visible',
  overflowY?: CSSWideKeyword | 'auto' | 'hidden' | 'scroll' | 'visible',
  padding?: CSSWideKeyword | string | number,
  paddingBlockEnd?: string,
  paddingBlockStart?: string,
  paddingBottom?: CSSWideKeyword | string | number,
  paddingInlineEnd?: string,
  paddingInlineStart?: string,
  paddingLeft?: CSSWideKeyword | string | number,
  paddingRight?: CSSWideKeyword | string | number,
  paddingTop?: CSSWideKeyword | string | number,
  pageBreakAfter?: CSSWideKeyword | 'auto' | 'always' | 'avoid' | 'left' | 'right',
  pageBreakBefore?: CSSWideKeyword | 'auto' | 'always' | 'avoid' | 'left' | 'right',
  pageBreakInside?: CSSWideKeyword | 'auto' | 'avoid',
  pause?: CSSWideKeyword | string | number,
  pauseAfter?: CSSWideKeyword | string | number,
  pauseBefore?: CSSWideKeyword | string | number,
  perspective?: CSSWideKeyword | string | number,
  perspectiveOrigin?: CSSWideKeyword | string | number,
  pointerEvents?: CSSWideKeyword
    | 'auto'
    | 'none'
    | 'visiblePainted'
    | 'visibleFill'
    | 'visibleStroke'
    | 'visible'
    | 'painted'
    | 'fill'
    | 'stroke'
    | 'all',
  position?: CSSWideKeyword | 'static' | 'relative' | 'absolute' | 'sticky' | 'fixed',
  quotes?: CSSWideKeyword | string,
  rad?: string,
  regionFragment?: CSSWideKeyword | 'auto' | 'break',
  restAfter?: CSSWideKeyword | string | number,
  restBefore?: CSSWideKeyword | string | number,
  resize?: string,
  right?: CSSWideKeyword | string | number,
  rubyAlign?: CSSWideKeyword | 'start' | 'center' | 'space-between' | 'space-around',
  rubyMerge?: string,
  rubyPosition?: CSSWideKeyword | 'over' | 'under' | 'inter-character',
  scrollBehavior?: string,
  scrollSnapCoordinate?: string,
  scrollSnapDestination?: string,
  scrollSnapPointsX?: string,
  scrollSnapPointsY?: string,
  scrollSnapType?: string,
  shapeImageThreshold?: CSSWideKeyword | number,
  shapeInside?: CSSWideKeyword | string | number,
  shapeMargin?: CSSWideKeyword | string | number,
  shapeOutside?: CSSWideKeyword | string | number,
  speak?: CSSWideKeyword | string | number,
  speakAs?: CSSWideKeyword | string | number,
  strokeOpacity?: CSSWideKeyword | number,
  strokeWidth?: CSSWideKeyword | string | number,
  tableLayout?: CSSWideKeyword | 'auto' | 'fixed',
  tabSize?: CSSWideKeyword | string | number,
  textAlign?: CSSWideKeyword
    | 'start'
    | 'end'
    | 'left'
    | 'right'
    | 'center'
    | 'justify'
    | 'match-parent',
  textAlignLast?: CSSWideKeyword
    | 'auto'
    | 'start'
    | 'end'
    | 'left'
    | 'right'
    | 'center'
    | 'justify',
  textCombineUpright?: string,
  textDecoration?: CSSWideKeyword | string | number,
  textDecorationColor?: CSSWideKeyword | string,
  textDecorationLine?: CSSWideKeyword | string,
  textDecorationLineThrough?: CSSWideKeyword | string,
  textDecorationNone?: CSSWideKeyword | string,
  textDecorationOverline?: CSSWideKeyword | string,
  textDecorationSkip?: CSSWideKeyword | string,
  textDecorationStyle?: CSSWideKeyword | string,
  textDecorationUnderline?: CSSWideKeyword | string,
  textEmphasis?: CSSWideKeyword | string | number,
  textEmphasisColor?: CSSWideKeyword | string | number,
  textEmphasisStyle?: CSSWideKeyword | string,
  textHeight?: CSSWideKeyword | string | number,
  textIndent?: CSSWideKeyword | string | number,
  textJustifyTrim?: CSSWideKeyword
    | 'auto'
    | 'inter-word'
    | 'inter-ideograph'
    | 'inter-cluster'
    | 'distribute'
    | 'kashida'
    | 'trim',
  textKashidaSpace?: CSSWideKeyword | string | number,
  textLineThrough?: CSSWideKeyword | string,
  textLineThroughColor?: CSSWideKeyword | string | number,
  textLineThroughMode?: CSSWideKeyword | string | number,
  textLineThroughStyle?: CSSWideKeyword | string | number,
  textLineThroughWidth?: CSSWideKeyword | string | number,
  textOrientation?: string,
  textOverflow?: CSSWideKeyword | string | number,
  textOverline?: CSSWideKeyword | string | number,
  textOverlineColor?: CSSWideKeyword | string | number,
  textOverlineMode?: CSSWideKeyword | string | number,
  textOverlineStyle?: CSSWideKeyword | string | number,
  textOverlineWidth?: CSSWideKeyword | string | number,
  textRendering?: CSSWideKeyword
    | 'auto'
    | 'optimizeSpeed'
    | 'optimizeLegibility'
    | 'geometricPrecision',
  textShadow?: CSSWideKeyword | string | number,
  textTransform?: CSSWideKeyword
    | 'none'
    | 'capitalize'
    | 'uppercase'
    | 'lowercase'
    | 'full-width',
  top?: CSSWideKeyword | string | number,
  touchAction?: CSSWideKeyword | string,
  transform?: CSSWideKeyword | string | number,
  transformOrigin?: CSSWideKeyword | string | number,
  transformOriginZ?: CSSWideKeyword | string | number,
  transformStyle?: CSSWideKeyword | 'flat' | 'preserve-3d',
  transition?: CSSWideKeyword | string | number,
  transitionDelay?: CSSWideKeyword | string | number,
  transitionDuration?: CSSWideKeyword | string | number,
  transitionProperty?: CSSWideKeyword | string | number,
  transitionTimingFunction?: CSSWideKeyword | string | number,
  turn?: string,
  unicodeBidi?: CSSWideKeyword
    | 'normal'
    | 'embed'
    | 'isolate'
    | 'bidi-override'
    | 'isolate-override'
    | 'plaintext',
  unicodeRange?: CSSWideKeyword | string | number,
  userFocus?: CSSWideKeyword
    | 'ignore'
    | 'normal'
    | 'select-after'
    | 'select-before'
    | 'select-menu'
    | 'select-same'
    | 'select-all'
    | 'none',
  userInput?: CSSWideKeyword | 'none' | 'enabled' | 'disabled',
  userSelect?: string,
  verticalAlign?: CSSWideKeyword | string | number,
  visibility?: CSSWideKeyword | 'visible' | 'hidden' | 'collapse',
  voiceBalance?: CSSWideKeyword
    | number
    | 'left'
    | 'center'
    | 'right'
    | 'leftwards'
    | 'rightwards',
  voiceDuration?: CSSWideKeyword | string | number,
  voiceFamily?: CSSWideKeyword | string | number,
  voicePitch?: CSSWideKeyword | string | number,
  voiceRange?: CSSWideKeyword | string | number,
  voiceRate?: CSSWideKeyword | string | number,
  voiceStress?: CSSWideKeyword | string | number,
  voiceVolume?: CSSWideKeyword | string | number,
  webkitOverflowScrolling?: string,
  webkitTransform?: string,
  webkitTransformOrigin?: string,
  webkitTransitionDelay?: string,
  webkitTransitionDuration?: string,
  webkitTransitionProperty?: string,
  webkitTransitionTimingFunction?: string,
  whiteSpace?: CSSWideKeyword | 'normal' | 'pre' | 'nowrap' | 'pre-wrap' | 'pre-line',
  widows?: CSSWideKeyword | number,
  width?: CSSWideKeyword | string | number,
  willChange?: string,
  wordBreak?: CSSWideKeyword | 'normal' | 'break-all' | 'keep-all' | 'break-word',
  wordSpacing?: CSSWideKeyword | string | number,
  wordWrap?: CSSWideKeyword | 'normal' | 'break-word',
  wrapFlow?: CSSWideKeyword | 'auto' | 'both' | 'start' | 'end' | 'maximum' | 'clear',
  wrapMargin?: CSSWideKeyword | string | number,
  writingMode?: CSSWideKeyword
    | 'horizontal-tb'
    | 'vertical-rl'
    | 'vertical-lr'
    | 'sideways-rl'
    | 'sideways-lr',
  zIndex?: CSSWideKeyword | 'auto' | number,
  zoom?: CSSWideKeyword | string | number,
  [key: string]: string | number | { [key: string]: string | number, ... },
};

export type StylerT = (
  style: StyleT,
  theme: ThemeT,
  target?: StyleObjT
) => StyleObjT;

export type StyleT = StyleObjT | ((theme: ThemeT, styler: StylerT) => StyleObjT);

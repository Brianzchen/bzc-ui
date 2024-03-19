// @flow
/* eslint-disable no-use-before-define */
import type { StyleObject } from 'aphrodite';

export type { AccordionT } from './Accordion';
export type { AnchorT } from './Anchor';
export type { AppBarT } from './AppBar';
export type { BadgeT } from './Badge';
export type { BaseButtonT } from './BaseButton';
export type { BaseInputT } from './BaseInput';
export type { BaseSelectT } from './BaseSelect';
export type { BottomSheetT } from './BottomSheet';
export type { BoxT } from './Box';
export type { ButtonT } from './Button';
export type { CalendarT } from './Calendar';
export type { CardT } from './Card';
export type { CardButtonT } from './CardButton';
export type { CardTitleT } from './CardTitle';
export type { CheckboxT } from './Checkbox';
export type { CircleT } from './Circle';
export type { ClickAwayListenerT } from './ClickAwayListener';
export type { DelayT } from './Delay';
export type { DividerT } from './Divider';
export type { DraggableT } from './Draggable';
export type { DrawerT } from './Drawer';
export type { DropdownT } from './Dropdown';
export type { FileUploadT } from './FileUpload';
export type { FormT } from './Form';
export type { FormFieldContainerT } from './FormFieldContainer';
export type { FormSpyT } from './FormSpy';
export type { GapT } from './Gap';
export type { GroupedToggleButtonsT } from './GroupedToggleButtons';
export type { IconT } from './Icon';
export type { ImageT } from './Image';
export type { InlineT } from './Inline';
export type { InputT } from './Input';
export type { LinkT } from './Link';
export type { LinkButtonT } from './LinkButton';
export type { LoadingBlockT } from './LoadingBlock';
export type { LoadingSpinnerT } from './LoadingSpinner';
export type { LoadingSpinnerOverlayT } from './LoadingSpinnerOverlay';
export type { MarkdownT } from './Markdown';
export type { ModalT } from './Modal';
export type { NotificationT } from './Notification';
export type { OverlayT } from './Overlay';
export type { PaperT } from './Paper';
export type { ProviderT } from './Provider';
export type { RadioButtonT } from './RadioButton';
export type { ResponsiveT } from './Responsive';
export type { ScrollLoadingListenerT } from './ScrollLoadingListener';
export type { SelectT } from './Select';
export type { SheetT } from './Sheet';
export type { SnackbarT } from './Snackbar';
export type { StackT } from './Stack';
export type { StepBarT } from './StepBar';
export type { StepperT } from './Stepper';
export type { TableT } from './Table';
export type { TableDataT } from './TableData';
export type { TableRowT } from './TableRow';
export type { TabsT } from './Tabs';
export type { TextAreaT } from './TextArea';
export type { ToggleButtonT } from './ToggleButton';
export type { ToggleSwitchT } from './ToggleSwitch';
export type { TypographyT } from './Typography';

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

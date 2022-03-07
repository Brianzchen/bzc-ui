// @flow
import * as React from 'react';

import formFieldHeight from '../internal/formFieldHeight';
import formFieldBorderWidth from '../internal/formFieldBorderWidth';
import useComponentTestId from '../internal/hooks/useComponentTestId';

import Box from '../Box';
import type { BoxT } from '../Box';
import Typography from '../Typography';
import styler from '../styler';
import type { StyleT, ThemeT } from '../types';

type Props = {
  ...BoxT,
  /** child element inside the container */
  children?: React.Node,
  /** overrides styling for root element */
  style?: StyleT,
  /** overrides styling for inner element */
  innerStyle?: StyleT,
  /** overrides styling for the title element */
  titleStyle?: StyleT,
  /** overrides styling for the sub label element */
  subLabelStyle?: StyleT,
  /** indicate that the component should render it's error state */
  error?: boolean,
  /** indicate that the component should render it's error state and show an inline error */
  errorMessage?: React.Node,
  /** indicate that the component should render it's focused state */
  focused?: boolean,
  /** indicate that the component should render it's disabled state */
  disabled?: boolean,
  /** Gives user context about what the field they're filling in means */
  title?: React.Node,
  /**
   * id of the associated child field for accessibility
   */
  inputId?: string,
  /** optional string that updates the prefix of data-testid's across each element of the FormFieldContainer */
  prefixTestId?: string,
  /** Gives user extra information or context about how to fill in field */
  subLabel?: React.Node,
  /** Function to call when the root element is clicked
   * (event, { rootElement }) => void
   */
  onClick?: (
    event: SyntheticEvent<HTMLButtonElement>,
    {|
      rootElement: HTMLElement | null,
    |},
  ) => void,
  /**
   * Whether the field is intended to be optional to render
   * the appropriate UI
   */
  optional?: boolean,
  ...
};

const FormFieldContainer: React$AbstractComponent<Props, HTMLElement> = React.forwardRef<Props, HTMLElement>(({
  children = null,
  style = {},
  innerStyle = {},
  titleStyle = {},
  subLabelStyle = {},
  error = false,
  errorMessage = null,
  focused = false,
  disabled = false,
  title = null,
  inputId,
  prefixTestId = 'FormFieldContainer',
  subLabel = null,
  onClick,
  optional = false,
  ...otherProps
}: Props, ref) => {
  const internalRef = React.useRef();
  const activeRef = ref || internalRef;
  const compTestId = useComponentTestId(prefixTestId);

  const hasError = !!errorMessage || error;

  const handleClick = (e) => {
    if (activeRef.current instanceof HTMLElement && onClick) {
      onClick(
        e,
        {
          rootElement: activeRef.current,
        },
      );
    }
  };

  const getColor = () => {
    if (focused) return 'highlight';
    if (hasError) return 'error';
    return 'monoMid';
  };

  const styles = {
    container: (theme: ThemeT) => styler(style, theme, {
      borderRadius: theme.corner(2),
    }),
    innerWrapper: (theme: ThemeT) => styler(innerStyle, theme, {
      position: 'relative',
      height: (formFieldHeight * theme.scale) + (formFieldBorderWidth * 2),
      border: `${formFieldBorderWidth}px solid ${theme.colors[getColor()]()}`,
      borderRadius: theme.corner(2),
      padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`,
      margin: `0 0 ${subLabel || errorMessage ? `${theme.spacing(1)}px` : '0'}`,
      ...disabled
        ? {
          backgroundColor: theme.colors.monoLow(),
          borderColor: theme.colors.monoMid(),
        }
        : { ...null },
    }),
    title: (theme: ThemeT) => styler(titleStyle, theme, {
      margin: `auto auto ${theme.spacing(1)}px`,
    }),
    optionalLabel: (theme) => ({
      marginLeft: theme.spacing(1),
      fontSize: 'inherit',
    }),
    subLabel: (theme: ThemeT) => styler(subLabelStyle, theme, {
      color: theme.colors.monoPrimary(),
    }),
  };

  return (
    <Box
      {...otherProps}
      ref={activeRef}
      style={styles.container}
      onClick={handleClick}
      is-error={hasError.toString()}
    >
      {title && (
        <Typography
          data-testid={compTestId('title')}
          as="label"
          type="body"
          style={styles.title}
          htmlFor={inputId}
        >
          {title}
          {optional && (
            <Typography
              data-testid={compTestId('optional-label')}
              style={styles.optionalLabel}
              color="guiding"
              inline
            >
              {'(Optional)'}
            </Typography>
          )}
        </Typography>
      )}
      <Box
        style={styles.innerWrapper}
      >
        {children}
      </Box>
      {subLabel && !errorMessage && (
        <Typography
          data-testid={compTestId('sublabel')}
          style={styles.subLabel}
          type="description"
        >
          {subLabel}
        </Typography>
      )}
      {errorMessage && (
        <Typography
          data-testid={compTestId('error')}
          type="description"
          color="action"
        >
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
});

FormFieldContainer.displayName = 'FormFieldContainer';

export default FormFieldContainer;

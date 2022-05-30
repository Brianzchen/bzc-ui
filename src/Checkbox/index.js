// @flow
import * as React from 'react';

import useDeprecationWarning from '../internal/hooks/useDeprecationWarning';
import useInternallyFocused from '../internal/hooks/useInternallyFocused';
import useComponentTestId from '../internal/hooks/useComponentTestId';

import Box from '../Box';
import type { BoxT } from '../Box';
import styler from '../styler';
import useFormValues from '../useFormValues';
import useTheme from '../useTheme';
import type { StyleT } from '../types';

import Check from './Check';
import ExtraDetails from './ExtraDetails';
import Text from './Text';

export type CheckboxT = {
  ...BoxT,
  /**
   * unique identifier for the field, this is necessary
   * when used with the starfall `Form` component
   */
  name?: string,
  /** element to show next to checkbox */
  children?: React.Node,
  /** overrides styling for the element surrounding the checkbox and children element */
  clickableStyle?: StyleT,
  /** whether or not the checkbox is checked */
  value?: boolean,
  /** callback function fired whenever the clickable area is clicked */
  onChange?: (event: SyntheticEvent<HTMLButtonElement | HTMLElement>) => void,
  /**
   * callback trigger when the checkbox is touched (changed) for the first time.
   * Useful for tracking if messaging should display depending whether user has
   * first checked before having checkbox unchecked
   */
  onTouched?: (touched: boolean) => void,
  /** whether the state of the checkbox should be disabled and unclickable */
  disabled?: boolean,
  /** extra information for the user that sits under the checkbox */
  metadata?: React.Node,
  /** inline error message that sits under the checkbox and meta data */
  errorMessage?: React.Node,
  /**
   * switch the label text between regular and bold font.
   * When metadata is provided, the label will always be bold
   */
  variant?: 'regular' | 'bold',
  /**
   * prefix of all data-testid values for the component
   */
  prefixTestId?: string,
  ...
};

/**
 * Accessible checkbox component great as a form field, alternative to a `Switch`
 */
const Checkbox: React$AbstractComponent<CheckboxT, HTMLElement> = React.forwardRef<CheckboxT, HTMLElement>(({
  name = '',
  children = null,
  style = {},
  clickableStyle = {},
  value = false,
  onChange,
  onTouched,
  disabled = false,
  metadata = null,
  errorMessage = null,
  variant = 'regular',
  prefixTestId = 'Checkbox',
  ...otherProps
}: CheckboxT, ref) => {
  const inputRef = React.useRef();
  const labelRef = React.useRef();
  const theme = useTheme();
  const compTestId = useComponentTestId(prefixTestId);
  const { formWrapped, setFormValues } = useFormValues();

  const [touched, setTouched] = React.useState(false);

  useDeprecationWarning(
    'You should not use `Checkbox` with `name` outside of a <Form /> component',
    !formWrapped && !!name,
  );

  const inputFocused = useInternallyFocused(inputRef, undefined, [labelRef]);

  // register with form context on mount
  React.useEffect(() => {
    if (formWrapped) {
      name && setFormValues(
        name,
        {
          valid: !errorMessage,
          error: !!errorMessage,
          value,
        },
      );
    }
  }, [value, errorMessage]);

  const handleChange = (e) => {
    if (disabled) return;

    onChange && onChange(e);
    !touched && onTouched && onTouched(true);
    setTouched(true);
    formWrapped && name && setFormValues(
      name,
      {
        value: !value,
      },
    );
  };

  const boxLength = theme.spacing(5);
  const textMargin = theme.spacing(4);

  const styles = {
    container: styler(style, theme),
    clickableContainer: styler(clickableStyle, theme, {
      display: 'flex',
      alignItems: 'center',
      outline: 'none',
    }),
    input: {
      position: 'absolute',
      opacity: 0,
      cursor: 'pointer',
      height: 0,
      width: 0,
    },
  };

  return (
    <Box
      {...otherProps}
      ref={ref}
      style={styles.container}
      is-selected={value.toString()}
    >
      <Box
        ref={labelRef}
        as="label"
        data-testid={compTestId('clickable')}
        style={styles.clickableContainer}
      >
        <Box
          ref={inputRef}
          data-testid={compTestId('input')}
          as="input"
          type="checkbox"
          style={styles.input}
          value={value}
          onChange={handleChange}
          disabled={disabled}
        />
        <Check
          selected={value}
          length={boxLength}
          disabled={disabled}
          error={!!errorMessage}
          focused={inputFocused}
          compTestId={compTestId}
        />
        <Text
          disabled={disabled}
          marginLeft={textMargin}
          variant={variant}
          metadata={!!metadata}
        >
          {children}
        </Text>
      </Box>
      <ExtraDetails
        metadata={metadata}
        errorMessage={errorMessage}
        marginLeft={boxLength + textMargin}
        compTestId={compTestId}
      />
    </Box>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;

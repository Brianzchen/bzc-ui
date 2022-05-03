// @flow
import * as React from 'react';

import Chevron from '../internal/components/Chevron';
import useDeprecationWarning from '../internal/hooks/useDeprecationWarning';
import formFieldHeight from '../internal/formFieldHeight';
import toKebabCase from '../internal/toKebabCase';

import BaseSelect from '../BaseSelect';
import type { BaseSelectT } from '../BaseSelect';
import FormFieldContainer from '../FormFieldContainer';
import styler from '../styler';
import useFormValues from '../useFormValues';
import useTheme from '../useTheme';
import type { StyleT } from '../types';

export type SelectT = {
  ...BaseSelectT,
  /** unique identifier for the field, this is necessary
   * when used with the startown `Form` component
   */
  name?: string,
  /**
   * optional string that overrides the root level element `data-testid`
   */
  rootTestId?: string,
  /**
   * data-testid that will drill down to all parts of the
   * input including title, and subtext if input has these attributes
   */
  prefixTestId?: string,
  /**
   * the current selected value of the select.
   * Omitting this value will show error styling on the select box
  */
  value?: React.Node,
  /**
   * fires when a new value is triggered.
   */
  onChange?: (...args: Array<any>) => any,
  /** list of drop down options for the select */
  options?: Array<{
    value?: any,
    text?: React.Node,
    disabled?: boolean,
    ...
  }>,
  /**
   * an override that sends to the form context that
   * the field is valid
  */
  valid?: boolean,
  /** whether the select should render disabled and unusable */
  disabled?: boolean,
  /** overrides styling for the field container element */
  fieldStyle?: StyleT,
  /** overrides styling for select element */
  selectStyle?: StyleT,
  /** overrides styling for the title element */
  titleStyle?: StyleT,
  /** overrides styling for the sub label element */
  subLabelStyle?: StyleT,
  /** indicate that the component should render it's error state */
  error?: boolean,
  /** inline error message for the select that sits under the box */
  errorMessage?: React.Node,
  /**
   * Gives user context about what the field they're filling in means
   * **(Deprecated, use title instead)**
   */
  label?: React.Node,
  /** Gives user context about what the field they're filling in means */
  title?: React.Node,
  /** Gives user extra information or context about how to fill in field */
  subLabel?: React.Node,
  /** function to trigger when select element is focused */
  onFocus?: (...args: Array<any>) => any,
  /** function to trigger when select element is blurred */
  onBlur?: (...args: Array<any>) => any,
  /** Insert a renderable node to the left of the select box
   * inside the field container
  */
  prefixNode?: React.Node,
  ...
};

/**
 * A fully styled select field to handle all basic single selection needs.
 */
const Select: React$AbstractComponent<SelectT, HTMLElement> = React.forwardRef(({
  id,
  name = '',
  rootTestId,
  prefixTestId = 'Select',
  value,
  onChange,
  options = [],
  valid,
  disabled = false,
  style = {},
  fieldStyle = {},
  selectStyle = {},
  titleStyle = {},
  subLabelStyle = {},
  error = false,
  errorMessage = null,
  label = null,
  title = null,
  subLabel = null,
  onFocus,
  onBlur,
  prefixNode = null,
  ...otherProps
}: SelectT, ref) => {
  const theme = useTheme();
  const {
    setFormValues,
    formWrapped,
  } = useFormValues();

  useDeprecationWarning(
    'You should not use `Select` with `name` outside of a <Form /> component',
    !formWrapped && !!name,
  );

  const [focused, setFocused] = React.useState(false);

  const isError = (() => !!(error || errorMessage))();
  const isValid = (() => (typeof valid === 'undefined'
    ? !!value
    : valid) && !isError)();

  // register with form context on mount
  React.useEffect(() => {
    if (formWrapped) {
      name && setFormValues(
        name,
        {
          valid: isValid && !isError,
          error: isError,
          value,
        },
      );
    }
  }, [value, isValid, isError]);

  const handleChange = (e) => {
    onChange && onChange(e);
    const newValue = e.target.value;
    formWrapped && name && setFormValues(
      name,
      {
        value: newValue,
      },
    );
  };

  const inputId = typeof title === 'string' && !id ? `select-${toKebabCase(title)}` : id;

  const chevronSize = 4;
  const styles = {
    innerContainer: styler(fieldStyle, theme, {
      display: 'flex',
      alignItems: 'center',
      paddingTop: 0,
      paddingBottom: 0,
    }),
    select: styler(selectStyle, theme, {
      height: formFieldHeight * theme.scale,
      width: '100%',
      paddingRight: theme.spacing(chevronSize),
    }),
    chevron: {
      position: 'absolute',
      top: `calc(50% - ${theme.spacing(chevronSize) / 2}px)`,
      right: theme.spacing(chevronSize) / 2,
      height: theme.spacing(chevronSize),
      width: theme.spacing(chevronSize),
      opacity: disabled ? 0.5 : 1,
    },
  };

  return (
    <FormFieldContainer
      data-testid={rootTestId}
      prefixTestId={prefixTestId}
      ref={ref}
      style={style}
      innerStyle={styles.innerContainer}
      titleStyle={titleStyle}
      subLabelStyle={subLabelStyle}
      error={error}
      errorMessage={errorMessage}
      disabled={disabled}
      label={label}
      title={title}
      inputId={inputId}
      subLabel={subLabel}
      focused={focused}
    >
      {prefixNode}
      <BaseSelect
        {...otherProps}
        id={inputId}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        style={styles.select}
        onFocus={(e) => {
          setFocused(true);
          onFocus && onFocus(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur && onBlur(e);
        }}
      >
        {options.map(({ value: optionValue, text, ...others }) => (
          <option
            {...others}
            key={optionValue}
            value={optionValue}
          >
            {text || optionValue}
          </option>
        ))}
      </BaseSelect>
      <Chevron
        style={styles.chevron}
        color={theme.colors.monoTertiary()}
      />
    </FormFieldContainer>
  );
});

Select.displayName = 'Select';

export default Select;

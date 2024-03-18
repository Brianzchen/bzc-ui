// @flow
import * as React from 'react';

import useDeprecationWarning from '../internal/hooks/useDeprecationWarning';
import useInternallyFocused from '../internal/hooks/useInternallyFocused';
import useComponentTestId from '../internal/hooks/useComponentTestId';
import useActiveRef from '../internal/hooks/useActiveRef';

import Box from '../Box';
import BaseInput from '../BaseInput';
import type { BaseInputT } from '../BaseInput';
import type { ValueMaybeT } from '../Form/FormContext';
import Typography from '../Typography';
import styler from '../styler';
import useFormValues from '../useFormValues';
import useTheme from '../useTheme';
import type { StyleT } from '../types';

import Icon from './Icon';

export type RadioButtonT = {
  ...BaseInputT,
  /** the text that shows next to the radio button */
  children?: React.Node,
  /** unique identifier for the field, this is necessary
   * when used with the bzc-ui `Form` component
   */
  name?: string,
  /**
   * maps the id to the underlying label and input which allows clicking
   * on the text to select the radio button
   */
  id: string,
  /**
   * optional string that overrides the root level element `data-testid`
   */
  rootTestId?: string,
  /** whether or not radio button is selected */
  checked?: boolean,
  /**
   * used with the form context when wrapped in a bzc-ui `Form` component
   * to define the initial checked value of a radio button group
   */
  initialChecked?: boolean,
  /** function that will fire whenever user clicks the radio button/text */
  onChange?: (...args: Array<any>) => any,
  /** whether the state of the radio button should be disabled and not clickable */
  disabled?: boolean,
  /**
   * indicates to the user that the state is in error
   * by changing the main color of the radio icon
  */
  error?: boolean,
  /** overrides styling for root element */
  style?: StyleT,
  /** overrides styling for the radio icon */
  iconStyle?: StyleT,
  /** overrides styling for the hidden underlying radio input */
  inputStyle?: StyleT,
  /** overrides styling for the component wrapping the text next to the radio button icon */
  textStyle?: StyleT,
  /**
   * switch the label text between regular and bold font.
   */
  variant?: 'regular' | 'bold',
  /** optional string that updates the prefix of data-testid's across each element of the RadioButton */
  prefixTestId?: string,
  ...
};

/**
 * Used to render a set of radio buttons for single selection in a form.
 */
const RadioButton: React$AbstractComponent<RadioButtonT, HTMLElement> = React.forwardRef<RadioButtonT, HTMLElement>(({
  children = null,
  name = '',
  id,
  rootTestId,
  checked,
  initialChecked = false,
  onChange,
  disabled = false,
  error = false,
  style = {},
  iconStyle = {},
  inputStyle = {},
  textStyle = {},
  variant = 'regular',
  prefixTestId,
  ...otherProps
}: RadioButtonT, ref) => {
  const activeRef = useActiveRef(ref);
  const inputRef = React.useRef<?HTMLElement>();
  const theme = useTheme();
  const compTestId = useComponentTestId(prefixTestId ?? 'RadioButton');
  const { formWrapped, formValues, setFormValues } = useFormValues();

  useDeprecationWarning(
    'You should not use `RadioButton` with `name` outside of a <Form /> component',
    !formWrapped && !!name,
  );

  const focused = useInternallyFocused(inputRef, undefined, [activeRef]);

  // register with form context on mount
  React.useEffect(() => {
    if (formWrapped && name) {
      const valueSpread: ValueMaybeT = initialChecked && !formValues[name]?.value
        ? {
          value: id,
        }
        : { ...null };

      setFormValues(
        name,
        {
          valid: !error,
          error,
          ...valueSpread,
        },
      );
    } else if (initialChecked) {
      console.error('`initialChecked` should only be used in RadioButton when wrapped in a bzc-ui Form component');
    }
  }, [id, error]);

  const triggerChange = (
    e: SyntheticEvent<HTMLInputElement>,
    options: {|
      unformat: (v: string) => string,
    |},
  ): void => {
    onChange && onChange(
      e,
      {
        ...options,
        value: id,
      },
    );
    formWrapped && name && setFormValues(
      name,
      {
        value: id,
      },
    );
  };

  const height = 20 * theme.scale;
  const iconMargin = 8 * theme.scale;

  const styles = {
    container: styler(style, theme, {
      display: 'block',
      cursor: disabled ? 'default' : 'pointer',
    }),
    input: styler(inputStyle, theme, {
      position: 'absolute',
      opacity: 0,
      cursor: 'pointer',
    }),
    icon: styler(iconStyle, theme, {
      display: 'inline-block',
      position: 'relative',
      verticalAlign: 'top',
      marginRight: iconMargin,
      height,
    }),
    text: styler(textStyle, theme, {
      display: 'inline-block',
      width: `calc(100% - ${iconMargin + height}px)`,
      color: theme.colors.monoPrimary(),
    }),
  };

  return (
    <Box
      as="label"
      data-testid={rootTestId ?? compTestId('container')}
      ref={activeRef}
      style={styles.container}
      htmlFor={id}
    >
      <BaseInput
        {...otherProps}
        ref={inputRef}
        id={id}
        type="radio"
        checked={checked}
        onChange={triggerChange}
        disabled={disabled}
        value={id}
        style={styles.input}
      />
      <Icon
        compTestId={compTestId}
        style={styles.icon}
        checked={checked}
        height={height}
        error={error}
        disabled={disabled}
        focused={focused}
      />
      <Typography
        data-testid={compTestId('label')}
        style={styles.text}
        type={variant === 'bold' ? 'button' : 'body'}
      >
        {children}
      </Typography>
    </Box>
  );
});

RadioButton.displayName = 'RadioButton';

export default RadioButton;

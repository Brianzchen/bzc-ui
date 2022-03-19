// @flow
import * as React from 'react';

import useDeprecationWarning from '../internal/hooks/useDeprecationWarning';
import useComponentTestId from '../internal/hooks/useComponentTestId';
import inputUnformat from '../internal/inputUnformat';
import padZero from '../internal/padZero';
import toKebabCase from '../internal/toKebabCase';
import getOS from '../internal/getOS';

import BaseInput from '../BaseInput';
import type { BaseInputT, InputTypeT } from '../BaseInput';
import Calendar from '../Calendar';
import FormFieldContainer from '../FormFieldContainer';
import Sheet from '../Sheet';
import formFieldHeight from '../internal/formFieldHeight';
import getTime from '../internal/getTime';
import styler from '../styler';
import useTheme from '../useTheme';
import useFormValues from '../useFormValues';
import type { InputFormatT, StyleT, RefObjT } from '../types';

const calcCalendarDate = (value) => {
  if (typeof value === 'string' || typeof value === 'number') {
    return new Date(value);
  }
  return value;
};

type Props = {
  ...BaseInputT,
  /** unique identifier for the field, this is necessary
   * when used with the starfall `Form` component
   */
  name?: string,
  /**
   * optional string that overrides the root level element `data-testid`
   */
  rootTestId?: string,
  /**
   * prefix of all data-testid values for the component
   */
  prefixTestId?: string,
  /** overrides styling for the field container element */
  fieldStyle?: StyleT,
  /** overrides styling for the input element */
  inputStyle?: StyleT,
  /**
   * tells input whether the value passed in is valid or not.
   * Can be used to override the valid value being sent into the form context
  */
  validValue?: boolean,
  /** overrides styling for the title element */
  titleStyle?: StyleT,
  /** overrides styling for the sub label element */
  subLabelStyle?: StyleT,
  /** whether the input should render disabled and unusable */
  disabled?: boolean,
  /** indicate that the component should render it's error state */
  error?: boolean,
  /**
   * takes a function that is passed the current value that expects
   * a boolean returned to render errorMessage when focused or blurred.
   * (value, { unformat }) => boolean, you can find information about the unformat
   * function in the BaseInput documentation
   */
  errorFocused?: (
    any,
    {|
      unformat: (value: string) => string,
    |},
  ) => boolean,
  /**
   * takes a function that is passed the current value that expects
   * a boolean returned to render errorMessage only after initial blur.
   * (value, { unformat }) => boolean, you can find information about the unformat
   * function in the BaseInput documentation
   */
  errorBlurred?: (
    any,
    {|
      unformat: (value: string) => string,
    |},
  ) => boolean,
  /** error message to show which would also render error styling */
  errorMessage?: React.Node,
  /** Insert a renderable node to the left of the input box
   * inside the field container
  */
  prefixNode?: React.Node,
  /** Insert a renderable node to the right of the input box
   * inside the field container
  */
  suffixNode?: React.Node,
  /**
   * Gives user context about what the field they're filling in means
   * **(Deprecated, use title instead)**
   */
  label?: React.Node,
  /** Gives user context about what the field they're filling in means */
  title?: React.Node,
  /** Gives user extra information or context about how to fill in field */
  subLabel?: React.Node,
  /** function to trigger when input element is focused */
  onFocus?: (...args: Array<any>) => any,
  /** function to trigger when input element is blurred */
  onBlur?: (...args: Array<any>) => any,
  /**
   * a short hint to display in the input field before the user enters a value
   */
  placeholder?: string,
  /**
   * fires when a new value is triggered.
   * (event, { newValue?, formatNewValue? }) => {}
   */
  onChange?: (
    event: SyntheticEvent<HTMLInputElement | HTMLButtonElement>,
    {|
      unformat: (v: string) => string,
      newValue: any,
      formatNewValue: any,
    |},
  ) => any,
  /**
   * value of the input.
   * Date values are accepted in the format of `YYYY-MM-DD`
  */
  value?: any,
  /** the type values the input should accept so the input can render appropriately */
  type?: InputTypeT | 'calendar',
  /**
   * If you would like your value passed in auto formatted.
   * You will receive the value unformatted in the onChange handler
   */
  format?: InputFormatT,
  /**
   * accepts a function which is passed the date in Date object format
   * and expects an object to be returned which will be passed as props into each DateButton
  */
  dateButtonProps?: (...args: Array<any>) => any,
  /** specify maximum selectable date with valid Date object */
  maxDate?: Date,
  /** specify minimum selectable date with valid Date object */
  minDate?: Date,
  /** overrides styling for the root calendar element */
  calendarStyle?: StyleT,
  /**
   * Whether the field is intended to be optional to render
   * the appropriate UI and attributes
   */
  optional?: boolean,
  /**
   * React reference of the underlying input element
   */
  inputRef?: RefObjT,
  ...
};

/**
 * A fully styled input field to handle all basic input needs.
 */
const Input: React$AbstractComponent<Props, HTMLElement> = React.forwardRef<Props, HTMLElement>(({
  id,
  name = '',
  rootTestId,
  prefixTestId,
  style = {},
  fieldStyle = {},
  inputStyle = {},
  validValue,
  titleStyle = {},
  subLabelStyle = {},
  disabled = false,
  error = false,
  errorFocused,
  errorBlurred,
  errorMessage = null,
  prefixNode = null,
  suffixNode = null,
  label = null,
  title = null,
  subLabel = null,
  onFocus,
  onBlur,
  placeholder,
  onChange,
  value,
  type = 'text',
  format,
  dateButtonProps,
  maxDate,
  minDate,
  calendarStyle = {},
  optional = false,
  inputRef,
  ...otherProps
}: Props, ref) => {
  const internalRef = React.useRef();
  const activeRef = ref || internalRef;

  const theme = useTheme();
  const compTestId = useComponentTestId(prefixTestId ?? 'Input');
  const {
    setFormValues,
    formSubmitted,
    formWrapped,
  } = useFormValues();

  useDeprecationWarning(
    'You should not use `Input` with `name` outside of a <Form /> component',
    !formWrapped && !!name,
  );

  const [focused, setFocus] = React.useState(false);
  const [touched, setTouched] = React.useState(false);
  const [calendarOpen, setCalendarOpen] = React.useState(false);

  const isMobile = ['iOS', 'Android'].indexOf(getOS()) > -1;
  const isCalendar = type === 'calendar' && !isMobile;
  const unformat = (v) => inputUnformat(v, format);
  const isErrorFocused = errorFocused ? errorFocused(value, { unformat }) : undefined;
  const isErrorBlurred = errorBlurred ? errorBlurred(value, { unformat }) : undefined;

  const isValidField = (v) => (!!(typeof validValue !== 'undefined'
    ? validValue
    : (
      (errorFocused ? !errorFocused(v, { unformat }) : true)
      && (errorBlurred ? !errorBlurred(v, { unformat }) : true)
    )));
  const isErrorField = (v) => !!(
    error
    || (errorFocused && errorFocused(v, { unformat }))
    || (errorBlurred && errorBlurred(v, { unformat }))
    || (!errorFocused && !errorBlurred && errorMessage)
  );

  // register with form context on mount
  React.useEffect(() => {
    if (formWrapped) {
      const initialValue = value || '';
      name && setFormValues(
        name,
        {
          valid: isValidField(initialValue),
          error: isErrorField(initialValue),
          value: initialValue,
        },
      );
    }
  }, []);

  const handleContainerClick = (event, { rootElement }) => {
    if (rootElement) {
      const { childNodes } = rootElement;
      const inputNode = childNodes[0].childNodes[prefixNode ? 1 : 0];

      if (inputNode instanceof HTMLElement) {
        inputNode.focus();
      }
    }
  };

  const getFormattedDateString = (date) => {
    const time = getTime(date);

    return `${padZero(`${time.date}`, 2)}/${padZero(`${time.month}`, 2)}/${time.year}`;
  };

  const getValue = (currValue) => {
    if (isCalendar) {
      if (typeof currValue === 'string') {
        if (currValue === '') {
          return '';
        }
        return getFormattedDateString(new Date(currValue));
      }
    }
    return currValue;
  };

  const getType = (currType): InputTypeT => {
    if (currType === 'calendar') {
      if (!isMobile) {
        return 'text';
      }
      return 'date';
    }
    return currType;
  };

  const getErrorState = (): boolean => {
    if (typeof isErrorFocused === 'undefined'
        && typeof isErrorBlurred === 'undefined') {
      return error;
    }

    if ((focused || touched) && isErrorFocused) return true;
    if ((formSubmitted || touched) && isErrorBlurred) return true;
    return false;
  };

  const getErrorMessage = (): React.Node => {
    if (typeof isErrorFocused === 'undefined'
        && typeof isErrorBlurred === 'undefined') {
      return errorMessage;
    }

    if ((focused || touched) && isErrorFocused) return errorMessage;
    if ((formSubmitted || touched) && isErrorBlurred) return errorMessage;
    return null;
  };

  const errorState = getErrorState();
  const shownErrorMessage = getErrorMessage();

  React.useEffect(() => {
    setFormValues(
      name,
      {
        error: isErrorField(value),
        errorApplied: errorState || !!shownErrorMessage,
      },
    );
  }, [value, errorState, !!shownErrorMessage]);

  const inputId = typeof title === 'string' && !id ? `input-${toKebabCase(title)}` : id;

  const styles = {
    container: styler(style, theme),
    innerContainer: styler(fieldStyle, theme, {
      display: 'flex',
      alignItems: 'center',
    }),
    input: styler(inputStyle, theme, {
      flex: 1,
      height: formFieldHeight * theme.scale,
      width: '100%',
      fontSize: theme.fonts.body.px,
      fontWeight: theme.fonts.body.style,
      lineHeight: theme.fonts.body.leading,
      outline: 'none',
      border: 'none',
      backgroundColor: 'transparent',
      ...disabled
        ? {
          color: theme.colors.monoTertiary(),
        }
        : { ...null },
    }),
    calendarPopup: {
      padding: 0,
    },
    calendar: styler(calendarStyle, theme),
  };

  return (
    <>
      <FormFieldContainer
        data-testid={rootTestId}
        prefixTestId={prefixTestId}
        ref={activeRef}
        style={styles.container}
        innerStyle={styles.innerContainer}
        titleStyle={titleStyle}
        subLabelStyle={subLabelStyle}
        error={errorState}
        errorMessage={shownErrorMessage}
        focused={focused}
        disabled={disabled}
        onClick={handleContainerClick}
        label={label}
        title={title}
        inputId={inputId}
        subLabel={subLabel}
        optional={optional}
      >
        {prefixNode}
        <BaseInput
          {...otherProps}
          id={inputId}
          ref={inputRef}
          value={getValue(value)}
          onFocus={(e) => {
            onFocus && onFocus(e);
            setFocus(true);
          }}
          onBlur={(e) => {
            onBlur && onBlur(e);
            setTouched(true);
            setFocus(false);
          }}
          placeholder={type === 'calendar' && !placeholder
            ? 'DD/MM/YYYY'
            : placeholder}
          type={getType(type)}
          format={format}
          disabled={disabled}
          style={styles.input}
          aria-required={!optional}
          {...isCalendar
            ? {
              onClick: () => {
                setCalendarOpen(true);
              },
              readOnly: true,
            }
            : {
              onChange: (event, options) => {
                const newValue = event.currentTarget.value;

                const computedNewValue = onChange && onChange(
                  event,
                  {
                    ...options,
                    newValue,
                    formatNewValue: newValue,
                  },
                );
                formWrapped && name && setFormValues(
                  name,
                  {
                    valid: isValidField(newValue),
                    error: isErrorField(newValue),
                    value: computedNewValue ?? newValue,
                  },
                );
              },
            }}
        />
        {suffixNode}
      </FormFieldContainer>
      {isCalendar && calendarOpen && (
        <Sheet
          attachRef={activeRef}
          onClose={() => setCalendarOpen(false)}
          style={styles.calendarPopup}
        >
          {() => (
            <Calendar
              data-testid={compTestId('calendar')}
              style={styles.calendar}
              value={calcCalendarDate(value)}
              onChange={(event, ...args) => {
                event.stopPropagation();
                onChange && onChange(event, ...args);
                setTouched(true);
                formWrapped && name && setFormValues(
                  name,
                  {
                    valid: isValidField(args),
                    error: isErrorField(args),
                    value: args,
                  },
                );
                setCalendarOpen(false);
              }}
              dateButtonProps={dateButtonProps}
              maxDate={maxDate}
              minDate={minDate}
            />
          )}
        </Sheet>
      )}
    </>
  );
});

Input.displayName = 'Input';

export default Input;

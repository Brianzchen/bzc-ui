// @flow
import * as React from 'react';

import useActiveRef from '../internal/hooks/useActiveRef';
import inputUnformat from '../internal/inputUnformat';
import isOnlyNumbers from '../internal/isOnlyNumbers';

import Box from '../Box';
import type { BoxT } from '../Box';
import type { InputFormatT, ThemeT, StylerT } from '../types';

import findCharDifference from './findCharDifference';
import findReplacedDifference from './findReplacedDifference';
import parseFormat from './parseFormat';

export type InputTypeT =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'pure-number' // custom
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

const getBaseType = (type: InputTypeT): InputTypeT => {
  if (type === 'pure-number') return 'tel';
  return type;
};

export type BaseInputT = {
  ...BoxT,
  /** will prevent the input from being pre-populated by user settings in modern browsers */
  disableAutofill?: boolean,
  /** specifies that an input field is read-only */
  readOnly?: boolean,
  /** specifies the type of <input> element to display */
  type?: InputTypeT,
  /**
   * If you would like your value passed in auto formatted.
   * You will receive the value unformatted in the onChange handler
   */
  format?: InputFormatT,
  /**
   * value of the input.
   * Date values are accepted in the format of `YYYY-MM-DD`
  */
  value?: any,
  /**
   * fires when a new value is triggered.
   */
  onChange?: (
    event: SyntheticEvent<HTMLInputElement>,
    {|
      unformat: (v: string) => string,
    |},
  ) => void,
  ...
};

/**
 * A basic input element with all styles removed and support for bzc-ui's styling API.
 */
const BaseInput: React$AbstractComponent<BaseInputT, HTMLElement> = React.forwardRef<BaseInputT, HTMLElement>(({
  style = {},
  disableAutofill = false,
  as = 'input',
  readOnly,
  type = 'text',
  format,
  value,
  onChange,
  ...otherProps
}: BaseInputT, ref) => {
  const activeRef = useActiveRef(ref);
  const [internalReadOnly, setReadOnly] = React.useState(true);
  const [cursorPos, setCursorPos] = React.useState(-1);

  const baseType = getBaseType(type);
  const unformat = (v: mixed) => inputUnformat(v, format);

  // arbitrary timeout value so that the readonly attribute is
  // removed before the user focuses on the field,
  // but after the browser has attempted to autofill the field
  React.useEffect(() => {
    disableAutofill && setTimeout(() => {
      setReadOnly(false);
    }, 500);
  }, []);

  React.useLayoutEffect(() => {
    if (activeRef.current instanceof HTMLInputElement && cursorPos >= 0) {
      activeRef.current.selectionStart = cursorPos;
      activeRef.current.selectionEnd = cursorPos;
      setCursorPos(-1);
    }
  }, [cursorPos]);

  const handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const callOnChange = (e: SyntheticEvent<HTMLInputElement>, func?: (
      event: SyntheticEvent<HTMLInputElement>,
      {|
        unformat: (v: string) => string,
      |},
    ) => void) => {
      if (format === 'credit-card') {
        func && func(e, {
          unformat,
        });
        const inputEle = e.currentTarget;
        const inputValue = inputUnformat(inputEle.value, format);
        if (inputEle.selectionStart % 5 === 0 && inputEle.selectionStart !== 0) {
          if (inputValue.length >= (value?.length ?? 0)) {
            setCursorPos(inputEle.selectionStart + 1);
          } else {
            setCursorPos(inputEle.selectionStart - 1);
          }
        } else {
          setCursorPos(inputEle.selectionStart);
        }
      } else {
        func && func(e, {
          unformat,
        });
      }
    };

    if (type === 'pure-number' && typeof value !== 'undefined') {
      const prevValue = inputUnformat(value, format);
      const newValue = inputUnformat(event.currentTarget.value, format);
      // Determine if we are adding new values by checking
      // if the new value has more characters than the previous
      // and that the number of new characters added is equal to the difference
      // between the new value and previous.
      const charDiff = findCharDifference(prevValue, newValue);
      const isAdding = (
        newValue.length > prevValue.length
        && charDiff.length === newValue.length - prevValue.length
      );
      // If we are not adding but there are still more characters in new value
      // than previous value, we know that the user is replacing with more characters
      // and we need to find all characters that didn't used to exist in the previous value
      // and determine if those are valid characters to add.
      const replacedChars = !isAdding ? findReplacedDifference(prevValue, newValue) : ' ';

      const isReplacingWithMore = (
        !isAdding
        && newValue.length > prevValue.length
        && isOnlyNumbers(replacedChars)
      );

      // Otherwise we check if the user has replaced or removed characters.
      // We need to determine the characters missing and characters added
      // 1. If the new and previous values have the same number of chars
      // we know it's a replacement, and we need to find where the replacement occurred.
      // Because replacements happen with a paste or keystroke, all changes will be together
      // so we should parse each character until we find the difference, then continue parsing
      // until we find the character that matches.
      // We can then take the new values changed and validate if it contains non-numbers before firing onChange
      // 2. If the new value has less characters than the previous then it could be
      // either removal only, replacement with less than previous characters.
      const isRemovalOrLesserReplacement = (
        !isAdding
        && !isReplacingWithMore
        && newValue.length <= prevValue.length
        && isOnlyNumbers(replacedChars)
      );

      if ((isAdding && isOnlyNumbers(charDiff))
          || isReplacingWithMore
          || isRemovalOrLesserReplacement) {
        callOnChange(event, onChange);
      } else if (isAdding && !isOnlyNumbers(charDiff)) {
        // If we're trying to add invalid characters don't bounce the cursor back
        // to the end of the input
        const cursor = event.currentTarget.selectionStart;
        setCursorPos(cursor - charDiff.length);
      } else {
        const cursor = event.currentTarget.selectionStart;
        setCursorPos(cursor);
      }
    } else {
      callOnChange(event, onChange);
    }
  };

  const styles = {
    input: (theme: ThemeT, styler: StylerT) => styler(style, theme, {
      boxShadow: 'none',
      outline: 'none',
      '::-ms-clear': {
        display: 'none',
      },
    }),
  };

  return (
    <Box
      {...otherProps}
      as={as}
      ref={activeRef}
      type={baseType}
      value={parseFormat(value, format)}
      onChange={handleChange}
      {...disableAutofill && typeof readOnly === 'undefined'
        ? {
          readOnly: internalReadOnly,
        }
        : {
          readOnly,
        }}
      style={styles.input}
    />
  );
});

BaseInput.displayName = 'BaseInput';

export default BaseInput;

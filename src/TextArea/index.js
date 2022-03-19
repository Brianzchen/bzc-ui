// @flow
import * as React from 'react';

import useDeprecationWarning from '../internal/hooks/useDeprecationWarning';
import useComponentTestId from '../internal/hooks/useComponentTestId';
import formFieldBorderWidth from '../internal/formFieldBorderWidth';

import Box from '../Box';
import type { BoxT } from '../Box';
import Typography from '../Typography';
import styler from '../styler';
import useFormValues from '../useFormValues';
import useTheme from '../useTheme';
import type { StyleT } from '../types';

import Wrapped from './Wrapped';

type Props = {
  ...BoxT,
  /**
   * unique identifier for the field, this is necessary
   * when used with the starfall `Form` component
   */
  name?: string,
  /** overrides styling for the title element */
  titleStyle?: StyleT,
  /**
   * overrides styling for the textarea element,
   * opt to use style to override textarea styling
   * if not rendering any complimentary elements inside TextArea
   */
  textAreaStyle?: StyleT,
  /**
   * tell the textarea whether the value passed in is valid or not,
   * so that it can show valid styling
   * */
  validValue?: boolean,
  /** Gives user context about what the field they're filling in means */
  title?: React.Node,
  /** specifies the initial visible number of lines in a text area */
  rows?: number,
  cols?: number,
  /**
   * value of the textarea.
   */
  value?: any,
  /**
   * fires when a new value is triggered
   */
  onChange?: (event: SyntheticEvent<HTMLTextAreaElement>) => void,
  readOnly?: boolean,
  ...
};

/**
 * A fully styled multi line text field to handle longer input needs.
 */
const TextArea: React$AbstractComponent<Props, HTMLElement> = React.forwardRef<Props, HTMLElement>(({
  name,
  style = {},
  titleStyle = {},
  textAreaStyle = {},
  validValue = false,
  title = null,
  rows = 4,
  value,
  onChange,
  ...otherProps
}: Props, ref) => {
  const theme = useTheme();
  const compTestId = useComponentTestId('TextArea');
  const { formWrapped, setFormValues } = useFormValues();

  useDeprecationWarning(
    'You should not use `TextArea` with `name` outside of a <Form /> component',
    !formWrapped && !!name,
  );

  // register with form context on mount
  React.useEffect(() => {
    if (formWrapped) {
      name && setFormValues(
        name,
        {
          valid: validValue,
          value,
        },
      );
    }
  }, [value]);

  const handleChange = (e) => {
    onChange && onChange(e);
    formWrapped && name && setFormValues(
      name,
      {
        value: e.target.value,
      },
    );
  };

  const getColor = () => {
    if (validValue) return 'secondary';
    return 'monoMid';
  };

  const styles = {
    container: styler(style, theme),
    textArea: styler(textAreaStyle, theme, {
      display: 'block',
      width: '100%',
      resize: 'vertical',
      border: `${formFieldBorderWidth}px solid ${theme.colors[getColor()]()}`,
      borderRadius: theme.corner(2),
      padding: theme.spacing(2),
      fontSize: theme.fonts.body.px,
      ':focus': {
        outline: 'none',
        borderColor: theme.colors.highlight(),
      },
    }),
    title: styler(titleStyle, theme, {
      margin: `auto auto ${theme.spacing(1)}px`,
    }),
  };

  return (
    <Box
      ref={ref}
      style={styles.container}
    >
      {title && (
        <Typography
          data-testid={compTestId('title')}
          type="heading3"
          style={styles.title}
        >
          {title}
        </Typography>
      )}
      <Wrapped
        {...otherProps}
        style={styles.textArea}
        rows={rows}
        value={value}
        onChange={handleChange}
      />
    </Box>
  );
});

TextArea.displayName = 'TextArea';

export default TextArea;

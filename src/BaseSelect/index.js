// @flow
import React from 'react';

import Box from '../Box';
import type { BoxT } from '../Box';
import styler from '../styler';
import useTheme from '../useTheme';

export type BaseSelectT = {
  ...BoxT,
  /** whether the select should render disabled and unusable */
  disabled?: boolean,
  ...
};

/**
 * A basic select element with all styles removed and support starfall's styling api.
 */
const BaseSelect: React$AbstractComponent<BaseSelectT, HTMLElement> = React.forwardRef<BaseSelectT, HTMLElement>(({
  style = {},
  disabled = false,
  as = 'select',
  ...otherProps
}: BaseSelectT, ref) => {
  const theme = useTheme();

  const styles = {
    select: styler(style, theme, {
      fontSize: theme.fonts.body.px,
      fontWeight: theme.fonts.body.style,
      lineHeight: theme.fonts.body.leading,
      outline: 'none',
      border: 'none',
      backgroundColor: 'transparent',
      WebkitAppearance: 'none',
      MozApperance: 'none',
      appearance: 'none',
      cursor: disabled ? 'default' : 'pointer',
      '::-ms-expand': {
        display: 'none',
      },
      ...disabled
        ? {
          color: theme.colors.monoTertiary(),
        }
        : {
          color: theme.colors.monoPrimary(),
        },
    }),
  };

  return (
    <Box
      {...otherProps}
      ref={ref}
      as={as}
      style={styles.select}
      disabled={disabled}
    />
  );
});

BaseSelect.displayName = 'BaseSelect';

export default BaseSelect;

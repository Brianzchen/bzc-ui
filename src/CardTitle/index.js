// @flow
import * as React from 'react';

import Box from '../Box';
import type { BoxT } from '../Box';
import Typography from '../Typography';
import styler from '../styler';
import useTheme from '../useTheme';
import type { StyleT } from '../types';

type Props = {
  ...BoxT,
  /** child element inside the header */
  children?: React.Node,
  /** overrides styling for root element */
  style?: StyleT,
  ...
};

const CardTitle: React$AbstractComponent<Props, HTMLElement> = React.forwardRef<Props, HTMLElement>(({
  children = null,
  style = {},
  ...otherProps
}: Props, ref) => {
  const theme = useTheme();

  const styles = {
    container: styler(style, theme, {
      backgroundColor: theme.colors.monoLow(),
      padding: theme.spacing(4),
      wordBreak: 'break-all',
      borderBottom: `${theme.line(1)} solid ${theme.colors.monoHighlight()}`,
    }),
  };

  return (
    <Box
      {...otherProps}
      ref={ref}
      style={styles.container}
    >
      <Typography
        type="heading2"
      >
        {children}
      </Typography>
    </Box>
  );
});

CardTitle.displayName = 'CardTitle';

export default CardTitle;

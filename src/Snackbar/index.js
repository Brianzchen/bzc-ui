// @flow
import * as React from 'react';

import { containerStyles } from '../internal/popupFadeInStyles';
import useComponentTestId from '../internal/hooks/useComponentTestId';

import Card from '../Card';
import type { CardT } from '../Card';
import styler from '../styler';
import Typography, { type TypographyT } from '../Typography';
import useTheme from '../useTheme';

export type SnackbarT = {
  ...CardT,
  /**
   * Whether the snackbar should render or alternatively omitted
   * if you want to control the open state using a short circuit statement
   */
  open?: boolean,
  /**
   * Function that will set state of snackbar to closed
   */
  onClose: () => (void | Promise<void>),
  /**
   * Where you'd like the snackbar positioned
   */
  position?: 'left' | 'center' | 'right',
  /**
   * Time in milliseconds for how long the snackbar should appear for
   */
  timing?: number,
  /**
   * To pass props into the internal Typography component
   */
  typographyProps?: TypographyT,
  /**
   * optional string that updates the prefix of data-testid's across each element of the Snackbar
   */
  prefixTestId?: string,
  ...
};

/**
 * Snackbar's appear as a popup to notify the user of a successful action
 */
const Snackbar: React$AbstractComponent<SnackbarT, HTMLElement> = React.forwardRef<SnackbarT, HTMLElement>(({
  children = null,
  style = {},
  open = true,
  onClose,
  position = 'center',
  timing = 1000,
  typographyProps,
  prefixTestId,
  ...otherProps
}: SnackbarT, ref) => {
  const theme = useTheme();
  const compTestId = useComponentTestId(prefixTestId ?? 'Snackbar');

  React.useEffect(() => {
    if (open) {
      setTimeout(() => {
        onClose();
      }, timing);
    }
  }, [open]);

  const getPositioning = () => {
    switch (position) {
      case 'left':
        return {
          left: theme.spacing(8),
        };
      case 'center':
        return {
          left: '50%',
          transform: 'translate(-50%, 0)',
        };
      case 'right':
        return {
          right: theme.spacing(8),
        };
      default:
        return {};
    }
  };

  if (!open) return null;

  const styles = {
    container: () => styler(style, theme, {
      position: 'fixed',
      bottom: theme.spacing(4),
      ...getPositioning(),
      zIndex: theme.elevations.sheet,
      padding: theme.spacing(4),
      ...containerStyles,
    }),
  };

  return (
    <Card
      {...otherProps}
      ref={ref}
      style={styles.container}
    >
      <Typography
        {...typographyProps}
        data-testid={compTestId('text')}
      >
        {children}
      </Typography>
    </Card>
  );
});

Snackbar.displayName = 'Snackbar';

export default Snackbar;

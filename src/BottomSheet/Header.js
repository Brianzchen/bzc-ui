// @flow
import * as React from 'react';

import Close from '../internal/components/Close';
import useComponentTestId from '../internal/hooks/useComponentTestId';

import BaseButton from '../BaseButton';
import Box from '../Box';
import Typography from '../Typography';
import styler from '../styler';
import useTheme from '../useTheme';
import type { StyleT } from '../types';

type Props = {|
  title: React.Node,
  titleStyle: StyleT,
  alignment: 'center' | 'left',
  onClose?: () => void,
|};

const Header = ({
  title,
  titleStyle,
  alignment,
  onClose,
}: Props): React.Node => {
  const theme = useTheme();
  const compTestId = useComponentTestId('BottomSheet');

  const createTitleMargin = (): string => {
    const base = (left: number, right: number) => `0 ${right}px ${theme.spacing(4)}px ${left}px`;

    if (alignment === 'center') {
      return base(theme.spacing(5), theme.spacing(5));
    }
    return base(0, theme.spacing(5));
  };

  const styles = {
    container: {
      position: 'relative',
    },
    title: styler(titleStyle, theme, {
      textAlign: alignment,
      margin: createTitleMargin(),
    }),
    close: {
      position: 'absolute',
      top: 0,
      right: 0,
    },
  };

  return (
    <Box style={styles.container}>
      {title && (
        <Typography
          data-testid={compTestId('title')}
          style={styles.title}
          type="heading1"
        >
          {title}
        </Typography>
      )}
      {onClose && (
        <BaseButton
          data-testid={compTestId('close')}
          style={styles.close}
          onClick={onClose}
        >
          <Close
            size={theme.spacing(4)}
            color={theme.colors.monoTertiary()}
          />
        </BaseButton>
      )}
    </Box>
  );
};

export default Header;

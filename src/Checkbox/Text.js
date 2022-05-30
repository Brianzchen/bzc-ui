// @flow
import * as React from 'react';

import Typography from '../Typography';

type Props = {|
  children: React.Node,
  disabled: boolean,
  marginLeft: number,
  variant: 'regular' | 'bold',
  metadata: boolean,
|};

const Text = ({
  children,
  disabled,
  marginLeft,
  variant,
  metadata,
}: Props): React.Node => {
  const styles = {
    text: {
      flex: 1,
      marginLeft,
    },
  };

  return (
    <Typography
      type={variant === 'regular' && !metadata ? 'body' : 'button'}
      color={disabled ? 'monoTertiary' : 'monoPrimary'}
      style={styles.text}
    >
      {children}
    </Typography>
  );
};

export default Text;

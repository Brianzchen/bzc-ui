// @flow
import * as React from 'react';

import BaseButton from '../BaseButton';
import useTheme from '../useTheme';

type Props = {|
  compTestId: (string) => string,
  onClose: (event: SyntheticEvent<HTMLButtonElement>) => void,
  color?: string,
|};

const CloseButton = ({
  compTestId,
  onClose,
  color,
}: Props): React.Node => {
  const theme = useTheme();
  const size = 10 * theme.scale;

  const styles = {
    closeButton: {
      position: 'absolute',
      top: '50%',
      transform: 'translate(0, -50%)',
      right: theme.spacing(4),
      marginLeft: theme.spacing(1),
    },
  };

  return (
    <BaseButton
      data-testid={compTestId('close-button')}
      style={styles.closeButton}
      onClick={onClose}
    >
      <svg width={`${size}px`} height={`${size}px`} viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g id="Artboard" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <path
            d="M10,7.77777778 L17.7777778,-2.20268248e-13 L20,2.22222222 L12.2222222,10 L20,17.7777778 L17.7777778,20 L10,12.2222222 L2.22222222,20 L-2.16271445e-13,17.7777778 L7.77777778,10 L-2.16271445e-13,2.22222222 L2.22222222,-2.21156427e-13 L10,7.77777778 Z"
            id="Combined-Shape"
            fill={color}
            fillRule="nonzero"
          />
        </g>
      </svg>
    </BaseButton>
  );
};

export default CloseButton;

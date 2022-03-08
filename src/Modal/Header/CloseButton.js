// @flow
import * as React from 'react';

import BaseButton from '../../BaseButton';
import useTheme from '../../useTheme';

type Props = {|
  compTestId: (string) => string,
  onClose: (...args: Array<any>) => any,
|};

const CloseButton = ({
  compTestId,
  onClose,
}: Props): React.Node => {
  const theme = useTheme();

  const size = 16 * theme.scale;

  const styles = {
    closeButton: {
      position: 'absolute',
      top: theme.spacing(3),
      right: theme.spacing(3),
      height: `${size}px`,
      width: size,
      fontWeight: theme.fonts.body.style,
      userSelect: 'none',
    },
  };

  const color = theme.colors.monoTertiary();

  return (
    <BaseButton
      data-testid={compTestId('close-button')}
      style={styles.closeButton}
      onClick={onClose}
    >
      <svg
        width={`${size}px`}
        height={`${size}px`}
        viewBox="0 0 20 20"
      >
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

// @flow
import * as React from 'react';

import Chevron from '../internal/components/Chevron';
import { isIE } from '../internal/isIE';

import BaseButton from '../BaseButton';
import useTheme from '../useTheme';
import type { RefObjT } from '../types';

const scrollAmount = 100;

type Props = {
  tabContainerRef: RefObjT,
  scrollDirection: 'left' | 'right',
  disabled: boolean,
  ...
};

const ScrollButton = ({
  tabContainerRef,
  scrollDirection,
  disabled,
  ...otherProps
}: Props): React.Node => {
  const theme = useTheme();

  const isLeft = scrollDirection === 'left';

  const border = `${theme.line(1)} solid ${theme.colors.monoHighlight()}`;

  const styles = {
    button: {
      padding: `0 ${theme.spacing(2)}px`,
      fontSize: theme.spacing(5),
      ...isLeft
        ? {
          borderRight: border,
        }
        : {
          borderLeft: border,
        },
    },
    chevron: {
      width: theme.spacing(4),
    },
  };

  return (
    <BaseButton
      {...otherProps}
      style={styles.button}
      onClick={() => {
        const { current } = tabContainerRef;
        if (current) {
          const newValue = isLeft
            ? current.scrollLeft - scrollAmount
            : current.scrollLeft + scrollAmount;
          if (isIE) {
            current.scrollLeft = newValue;
          } else {
            current.scroll({
              left: newValue,
              behavior: 'smooth',
            });
          }
        }
      }}
      disabled={disabled}
    >
      <Chevron
        style={styles.chevron}
        direction={scrollDirection}
        color={disabled ? theme.colors.monoHighlight() : theme.colors.monoTertiary()}
      />
    </BaseButton>
  );
};

export default ScrollButton;

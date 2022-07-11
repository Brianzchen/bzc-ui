// @flow
import * as React from 'react';

import Tick from '../internal/components/Tick';

import Box from '../Box';
import useTheme from '../useTheme';

type Props = {|
  selected: boolean,
  length: number,
  disabled: boolean,
  error: boolean,
  focused: boolean,
  compTestId: (string) => string,
|};

const Check = ({
  selected,
  length,
  disabled,
  error,
  focused,
  compTestId,
}: Props): React.Node => {
  const theme = useTheme();

  const getColor = () => {
    if (selected || focused) return 'secondary';
    if (error && !selected) return 'error';
    return 'monoTertiary';
  };

  const styles = {
    container: {
      position: 'relative',
      zIndex: 10,
      display: 'flex',
    },
    button: {
      position: 'relative',
      display: 'inline-block',
      height: length,
      width: length,
      border: `${2 * theme.scale}px solid ${theme.colors[getColor()]()}`,
      borderRadius: theme.corner(2),
      backgroundColor: focused && !selected
        ? 'transparent'
        : theme.colors[selected ? 'secondary' : 'monoInverse'](),
      userSelect: 'none',
      ...disabled
        ? {
          backgroundColor: selected ? theme.colors.monoMid() : 'transparent',
          borderColor: selected ? 'transparent' : theme.colors.monoMid(),
        }
        : {
          cursor: 'pointer',
        },
    },
    tick: {
      position: 'absolute',
      top: `${3 * theme.scale}px`,
      left: `${2 * theme.scale}px`,
      zIndex: 1,
    },
    focused: {
      position: 'absolute',
      left: `${focused ? '-' : ''}50%`,
      top: `${focused ? '-' : ''}50%`,
      right: `${focused ? '-' : ''}50%`,
      bottom: `${focused ? '-' : ''}50%`,
      transition: 'all 0.2s linear',
      backgroundColor: theme.colors.secondary(-0.5),
      borderRadius: '100%',
      zIndex: -1,
    },
  };

  return (
    <Box style={styles.container}>
      <Box
        style={styles.button}
      >
        <Tick
          selected={selected}
          style={styles.tick}
        />
        {theme.focusEffect && (
          <Box
            data-testid={compTestId('focus-effect')}
            style={styles.focused}
          />
        )}
      </Box>
    </Box>
  );
};

export default Check;

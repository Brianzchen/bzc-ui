// @flow
import * as React from 'react';

import Box from '../Box';
import useTheme from '../useTheme';
import type { StyleT } from '../types';

type Props = {|
  compTestId: (string) => string,
  checked?: boolean,
  height: number,
  style: StyleT,
  error: boolean,
  disabled: boolean,
  focused: boolean,
|};

const Icon = ({
  compTestId,
  checked = false,
  height,
  style,
  error,
  disabled,
  focused,
}: Props): React.Node => {
  const theme = useTheme();

  const getColor = () => {
    if (disabled) return theme.colors.monoHighlight();

    if (checked || focused) return theme.colors.secondary();

    if (error) return theme.colors.error();

    return theme.colors.monoTertiary();
  };

  const color = getColor();

  const styles = {
    focused: {
      position: 'absolute',
      left: focused ? `-${theme.spacing(2)}px` : '50%',
      top: focused ? `-${theme.spacing(2)}px` : '50%',
      right: focused ? `-${theme.spacing(2)}px` : '50%',
      bottom: focused ? `-${theme.spacing(2)}px` : '50%',
      transition: 'all 0.2s linear',
      borderRadius: '100%',
      backgroundColor: theme.colors.secondary(-0.5),
    },
    icon: {
      position: 'relative',
      zIndex: 1,
    },
  };

  return (
    <Box
      data-testid={compTestId('icon')}
      style={style}
    >
      {theme.focusEffect && <Box data-testid={compTestId('focus-effect')} style={styles.focused} />}
      {
        checked
          ? (
            <Box
              as="svg"
              style={styles.icon}
              width={height}
              height={height}
              viewBox="0 0 20 20"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Web" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="2x" transform="translate(-2.000000, -2.000000)" fill={color}>
                  <g id="Material/Light/Radio-button-on">
                    <path d="M12,7 C9.2,7 7,9.2 7,12 C7,14.8 9.2,17 12,17 C14.8,17 17,14.8 17,12 C17,9.2 14.8,7 12,7 L12,7 Z M12,2 C6.5,2 2,6.5 2,12 C2,17.5 6.5,22 12,22 C17.5,22 22,17.5 22,12 C22,6.5 17.5,2 12,2 L12,2 Z M12,20 C7.6,20 4,16.4 4,12 C4,7.6 7.6,4 12,4 C16.4,4 20,7.6 20,12 C20,16.4 16.4,20 12,20 L12,20 Z" id="Shape" />
                  </g>
                </g>
              </g>
            </Box>
          )
          : (
            <Box
              as="svg"
              style={styles.icon}
              width={height}
              height={height}
              viewBox="0 0 20 20"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Web" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="2x" transform="translate(-42.000000, -2.000000)" fill={color}>
                  <g id="Material/Light/Radio-button-off" transform="translate(40.000000, 0.000000)">
                    <path d="M12,2 C6.5,2 2,6.5 2,12 C2,17.5 6.5,22 12,22 C17.5,22 22,17.5 22,12 C22,6.5 17.5,2 12,2 L12,2 Z M12,20 C7.6,20 4,16.4 4,12 C4,7.6 7.6,4 12,4 C16.4,4 20,7.6 20,12 C20,16.4 16.4,20 12,20 L12,20 Z" id="Shape" />
                  </g>
                </g>
              </g>
            </Box>
          )
        }
    </Box>
  );
};

export default Icon;

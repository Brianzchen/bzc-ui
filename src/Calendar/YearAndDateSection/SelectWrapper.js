// @flow
import * as React from 'react';

import useTheme from '../../useTheme';
import Box from '../../Box';
import Chevron from '../../internal/components/Chevron';
import BaseSelect from '../../BaseSelect';

type Props = {|
  children?: React.Node,
  left?: boolean,
  onChange: (event: SyntheticEvent<HTMLSelectElement>) => void,
  value: number,
  testid: string,
|};

const SelectWrapper = ({
  children = null,
  onChange,
  value,
  testid,
  left,
}: Props): React.Node => {
  const theme = useTheme();

  const styles = {
    selectWrapper: {
      display: 'inline-block',
      width: '50%',
      position: 'relative',
    },
    selectInnerWrapper: {
      position: 'relative',
    },
    select: {
      fontSize: theme.fonts.smallButton.px,
      border: `1px solid ${theme.colors.monoMid()}`,
      color: theme.colors.monoPrimary(),
      background: theme.colors.monoInverse(),
      padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
      width: '100%',
      borderRadius: theme.corner(2),
      ':focus': {
        borderColor: theme.colors.highlight(),
      },
    },
    selectLeft: {
      paddingRight: theme.spacing(1),
    },
    selectRight: {
      paddingLeft: theme.spacing(1),
    },
    chevron: {
      position: 'absolute',
      top: `calc(50% - ${theme.spacing(3) / 2}px)`,
      right: theme.spacing(3),
      height: theme.spacing(3),
      width: theme.spacing(3),
    },
  };

  return (
    <Box
      style={{
        ...styles.selectWrapper,
        ...(left
          ? styles.selectLeft
          : styles.selectRight
        ),
      }}
    >
      <Box
        style={styles.selectInnerWrapper}
      >
        <BaseSelect
          onChange={onChange}
          value={value}
          style={styles.select}
          data-testid={testid}
        >
          {children}
        </BaseSelect>
        <Chevron
          style={styles.chevron}
        />
      </Box>
    </Box>
  );
};

export default SelectWrapper;

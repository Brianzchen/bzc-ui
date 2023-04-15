// @flow
import * as React from 'react';

import Box from '../Box';
import Typography from '../Typography';
import Tick from '../internal/components/Tick';
import useComponentTestId from '../internal/hooks/useComponentTestId';
import type { ThemeT } from '../types';

import stepStates from './stepStates';

type Props = {|
  step: number,
  state: stepStates,
|};

const Step = ({
  step,
  state,
}: Props): React.Node => {
  const compTestId = useComponentTestId('Stepper');

  const styles = {
    container: (theme: ThemeT) => ({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: theme.spacing(5),
      width: theme.spacing(5),
      borderRadius: '100%',
      border: `${theme.line(2)} solid ${theme.colors[state === stepStates.Unselected ? 'monoMid' : 'secondary']()}`,
      userSelect: 'none',
      ...state === stepStates.Completed
        ? {
          backgroundColor: theme.colors.secondary(),
        }
        : { ...null },
    }),
    tick: {
      transform: 'scale(0.8)',
    },
  };

  return (
    <Box
      data-testid={compTestId('step')}
      style={styles.container}
    >
      {state === stepStates.Completed
        ? (
          <Tick
            data-testid={compTestId('tick')}
            style={styles.tick}
          />
        )
        : (
          <Typography
            data-testid={compTestId('step-label')}
            type="label"
            color={state === stepStates.Unselected ? 'monoTertiary' : 'secondary'}
          >
            {step}
          </Typography>
        )}
    </Box>
  );
};

export default Step;

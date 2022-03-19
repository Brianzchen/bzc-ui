// @flow
import React, { Fragment } from 'react';

import Box from '../Box';
import type { BoxT } from '../Box';

import Step from './Step';
import Line from './Line';
import range from './range';
import stepStates from './stepStates';

type Props = {
  ...BoxT,
  /** the currently active step */
  curr?: number,
  /** the total number of steps */
  steps?: number,
  ...
};

/**
 * A horizontal progression indicator with visible steps.
 * Best when used with a small number of steps.
 */
const Stepper: React$AbstractComponent<Props, HTMLElement> = React.forwardRef<Props, HTMLElement>(({
  curr = 0,
  steps = 0,
  style = {},
  ...otherProps
}: Props, ref) => {
  const styles = {
    container: (theme, styler) => styler(style, theme, {
      display: 'flex',
      alignItems: 'center',
    }),
  };

  return (
    <Box
      {...otherProps}
      ref={ref}
      style={styles.container}
    >
      {range(1, steps + 1).map((step) => {
        const getCurrentStep = () => {
          if (step < curr) return stepStates.Completed;
          if (step === curr) return stepStates.Selected;
          return stepStates.Unselected;
        };

        const currentStepStatus = getCurrentStep();

        return (
          <Fragment
            key={step}
          >
            {step !== 1 && (
              <Line
                state={currentStepStatus}
              />
            )}
            <Step
              step={step}
              state={currentStepStatus}
            />
          </Fragment>
        );
      })}
    </Box>
  );
});

Stepper.displayName = 'Stepper';

export default Stepper;

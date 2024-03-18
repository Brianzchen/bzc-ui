// @flow
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { datatype } from '@faker-js/faker';

import Step from './Step';
import stepStates from './stepStates';

describe('<Step />', () => {
  it('renders the tick if completed', () => {
    render(
      <Step
        step={datatype.number()}
        state={stepStates.Completed}
      />,
    );

    expect(screen.getByTestId('bzc-stepper-tick')).not.toBe(null);
  });

  it('renders the number when unselected', () => {
    const expectedStep = datatype.number();

    render(
      <Step
        step={expectedStep}
        state={stepStates.Unselected}
      />,
    );

    expect(screen.getByTestId('bzc-stepper-step').textContent).toBe(`${expectedStep}`);
  });

  it('renders the number when selected', () => {
    const expectedStep = datatype.number();

    render(
      <Step
        step={expectedStep}
        state={stepStates.Selected}
      />,
    );

    expect(screen.getByTestId('bzc-stepper-step').textContent).toBe(`${expectedStep}`);
  });
});

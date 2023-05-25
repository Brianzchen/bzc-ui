// @flow
import * as React from 'react';

import {
  Checkbox,
  Stack,
} from '..';

export const Basic = (): React.Node => (
  <Stack
    space="spacing(4)"
  >
    <Checkbox
      value
    >
      checked
    </Checkbox>
    <Checkbox>
      unchecked
    </Checkbox>
    <Checkbox
      disabled
      value
    >
      disabled checked
    </Checkbox>
    <Checkbox
      disabled
    >
      disabled unchecked
    </Checkbox>
  </Stack>
);

const CheckboxWrapper = ({
  children,
  value = false,
  ...otherProps
}: {
  children?: React.Node,
  value?: boolean,
  ...
}) => {
  const [internalValue, setInternalValue] = React.useState(value);

  return (
    <Checkbox
      {...otherProps}
      value={internalValue}
      onChange={() => {
        setInternalValue((pInternalValue) => !pInternalValue);
        console.info('clicked');
      }}
    >
      {children}
    </Checkbox>
  );
};

export const Interactable = (): React.Node => (
  <CheckboxWrapper>
    {"Click me, I'm interactive!"}
  </CheckboxWrapper>
);

export const OnGreyBackground = (): React.Node => (
  <Stack
    style={{
      backgroundColor: 'grey',
    }}
    space="spacing(4)"
  >
    <Checkbox />
    <Checkbox
      disabled
    />
    <Checkbox
      disabled
      value
    />
  </Stack>
);

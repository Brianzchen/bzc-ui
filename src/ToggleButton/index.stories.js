// @flow
import * as React from 'react';

import {
  Icon,
  Inline,
  Stack,
  ToggleButton,
} from '..';

const Comp = ({
  children,
}: {|
  children: React.Node,
|}) => {
  const [selected, setSelected] = React.useState(false);

  return (
    <ToggleButton
      onClick={() => { setSelected(!selected); }}
      selected={selected}
    >
      {children}
    </ToggleButton>
  );
};

export const Basic = (): React.Node => (
  <Stack space="spacing(4)">
    <Inline space="spacing(2)">
      <Comp>
        Toggle Button
      </Comp>
      <ToggleButton
        disabled
      >
        <div>
          Disabled Toggle
        </div>
      </ToggleButton>
      <ToggleButton
        selected
        disabled
      >
        Disabled Selected Toggle
      </ToggleButton>
    </Inline>
    <Comp>
      <Icon
        icon="magnify"
      />
    </Comp>
  </Stack>
);

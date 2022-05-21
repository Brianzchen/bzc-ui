// @flow
import * as React from 'react';
import { lorem } from '@faker-js/faker';

import CardButton from '.';

import {
  Card,
  CardTitle,
  Stack,
} from '..';

export const Basic = (): React.Node => (
  <Stack
    style={(theme) => ({
      padding: theme.spacing(4),
    })}
    space="spacing(4)"
  >
    <Card type="secondary">
      <CardTitle>
        {'CardButton as a button'}
      </CardTitle>
      Body
      <CardButton
        onClick={() => {
          console.info('CardButton clicked');
        }}
      >
        Click Me
      </CardButton>
    </Card>
    <Card>
      <CardTitle>
        {'CardButton as a link'}
      </CardTitle>
      Body
      <CardButton
        href="/components/CardButton/ComponentExample"
        newTab
      >
        Link Me
      </CardButton>
    </Card>
    <Card>
      <CardTitle>
        Handling text too long with multiline disabled
      </CardTitle>
      Body
      <CardButton>
        {lorem.paragraph()}
      </CardButton>
    </Card>
    <Card>
      <CardTitle>
        Without chevron
      </CardTitle>
      Body
      <CardButton chevron={false}>
        Click Me
      </CardButton>
    </Card>
    <Card>
      <CardTitle>
        Disabled
      </CardTitle>
      Body
      <CardButton disabled>
        Click Me
      </CardButton>
    </Card>
  </Stack>
);

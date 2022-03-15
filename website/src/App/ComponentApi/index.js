// @flow
import * as React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { PageWrapper } from 'utils';

import { Stack, Typography } from 'starfall';

import Table from './Table';

type ComponentT = {|
  composes: Array<string>,
  description: string,
  displayName: string,
  methods: Array<void>,
  props: {
    [key: string]: {|
      description: string,
      flowType: {|
        name: string,
        raw?: string,
      |},
      required: boolean,
    |},
  },
|};

const ComponentApi = (): React.Node => {
  const params = useParams();
  const [components, setComponents] = React.useState();
  const [currComponent, setCurrComponent] = React.useState<ComponentT | void>();

  React.useEffect(() => {
    axios.get('/components.json').then(({ data }) => {
      setComponents(data);
    });
  }, []);

  React.useEffect(() => {
    if (!components) return;

    const { component } = params;

    if (component) {
      setCurrComponent(components[`src/${component}/index.js`]);
    }
  }, [params.component, components]);

  if (!currComponent) return null;

  console.log(currComponent);

  return (
    <PageWrapper title={currComponent.displayName}>
      <Stack space="spacing(4)">
        <Typography>
          {currComponent.description}
        </Typography>
        <Table />
      </Stack>
    </PageWrapper>
  );
};

export default ComponentApi;

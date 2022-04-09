// @flow
import * as React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';

import { routes, PageWrapper } from 'utils';

import { Stack, Typography } from 'startown';

import PropsTable from './PropsTable';

export type FlowTypeT =
  | {|
    name: 'literal',
    value: string,
  |}
  | {|
    name: 'signature',
    raw: string,
    type: 'function',
  |}
  | {|
    name: 'union',
    raw: string,
  |}
  | {|
    name: 'string' | 'number' | 'boolean',
  |};

export type ComponentPropsT = {
  [key: string]: {|
    description?: string,
    flowType: FlowTypeT,
    required: boolean,
    defaultValue?: {|
      value: string,
      computed: boolean,
    |},
  |},
};

type ComponentT = {|
  composes: Array<string>,
  description: string,
  displayName: string,
  methods: Array<void>,
  props: ComponentPropsT,
|};

const ComponentApi = (): React.Node => {
  const params = useParams();
  const [components, setComponents] = React.useState<{ [key: string]: ComponentT } | void>();
  const [currComponent, setCurrComponent] = React.useState<ComponentT | void | null>();

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
    } else {
      setCurrComponent(null);
    }
  }, [params.component, components]);

  if (typeof currComponent === 'undefined' || !components) return null;

  if (currComponent === null) {
    return (
      <Navigate to={routes.home} replace />
    );
  }

  const findComposedProps = (comp): ComponentPropsT => ({
    ...comp.composes ? comp.composes.reduce((acc, cur) => {
      const compName = cur.substring(0, cur.length - 1);
      const composedComp = components[`src/${compName}/index.js`];

      if (!composedComp) return acc;

      return {
        ...acc,
        ...findComposedProps(composedComp),
      };
    }, ({}: ComponentPropsT)) : {},
    ...Object.keys(comp.props).filter((key) => (
      comp.props[key].description
    )).reduce((acc, cur) => ({
      ...acc,
      [cur]: comp.props[cur],
    }), ({}: ComponentPropsT)),
  });

  console.log(currComponent);

  return (
    <PageWrapper title={currComponent.displayName}>
      <Stack space="spacing(4)">
        <Typography>
          {currComponent.description.replace(/\n/g, ' ')}
        </Typography>
        <PropsTable
          props={findComposedProps(currComponent)}
        />
      </Stack>
    </PageWrapper>
  );
};

export default ComponentApi;

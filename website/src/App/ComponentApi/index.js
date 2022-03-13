// @flow
import * as React from 'react';
import { useParams } from 'react-router-dom';

const ComponentApi = (): React.Node => {
  const params = useParams();

  console.log(params.component);

  return null;
};

export default ComponentApi;

// @flow
import * as React from 'react';
import { useParams, Navigate } from 'react-router-dom';

import { routes, toKebabCase } from 'utils';

import sidePanelContent from './side-panel.json';

const Pages = (): React.Node => {
  const params = useParams();

  const page = sidePanelContent.find((o) => toKebabCase(o[0]) === params.currentPage);

  if (!page) {
    return (
      <Navigate to={routes.home} replace />
    );
  }

  return null;
};

export default Pages;

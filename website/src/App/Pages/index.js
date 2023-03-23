// @flow
import * as React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import axios from 'axios';

import { PageWrapper, routes, toKebabCase } from 'utils';

import {
  Markdown,
} from 'startown';

import sidePanelContent from './side-panel.json';

const Pages = (): React.Node => {
  const params = useParams();
  const [currentContent, setCurrentContent] = React.useState<string | void | null>();

  const page = sidePanelContent.find((o) => toKebabCase(o[0]) === params.currentPage);

  React.useEffect(() => {
    if (!page) {
      setCurrentContent(null);
      return;
    }

    axios.get<string>(`/pages/${page[1]}`).then(({ data }) => {
      if (data.startsWith('<!DOCTYPE html>')) {
        setCurrentContent(null);
        return;
      }
      setCurrentContent(data);
    }).catch(() => {
      setCurrentContent(null);
    });
  }, [params.currentPage]);

  if (typeof currentContent === 'undefined') {
    return null;
  }

  if (currentContent === null) {
    return (
      <Navigate to={routes.home} replace />
    );
  }

  return (
    <PageWrapper
      title={page[0]}
    >
      <Markdown
        space="spacing(4)"
        content={currentContent}
      />
    </PageWrapper>
  );
};

export default Pages;

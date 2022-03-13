// @flow
import * as React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import axios from 'axios';

import { routes, toKebabCase } from 'utils';

import {
  Box,
  Gap,
  Markdown,
  Typography,
  useTheme,
} from 'starfall';

import sidePanelContent from './side-panel.json';

const Pages = (): React.Node => {
  const theme = useTheme();
  const params = useParams();
  const [currentContent, setCurrentContent] = React.useState();

  const page = sidePanelContent.find((o) => toKebabCase(o[0]) === params.currentPage);

  React.useEffect(() => {
    if (!page) {
      setCurrentContent(null);
      return;
    }

    axios.get(`/pages/${page[1]}`).then(({ data }) => {
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
    <Box
      style={{
        margin: theme.spacing(5),
      }}
    >
      <Typography type="heading1">
        {page[0]}
      </Typography>
      <Gap height="spacing(5)" />
      <Markdown
        space="spacing(4)"
        content={currentContent}
      />
    </Box>
  );
};

export default Pages;

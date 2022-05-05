// @flow
import * as React from 'react';

import {
  Box,
  Tabs,
  Typography,
  useTheme,
} from 'startown';

import * as storyCache from './storyCache';

const splitStoryToSentence = (value: string) => (
  value.split('').map((o, i) => {
    if (o.toUpperCase() === o && i !== 0) {
      return ` ${o}`;
    }
    return o;
  }).join('')
);

type Props = {|
  component: string,
|};

const Examples = ({
  component,
}: Props): React.Node => {
  const theme = useTheme();

  const stories = storyCache[component];
  const storiesList = Object.keys(stories ?? {});

  const [story, setStory] = React.useState(storiesList[0]);

  if (!stories) {
    return (
      <Typography>
        Coming soon, no examples available
      </Typography>
    );
  }

  return (
    <Box>
      <Tabs
        tabs={Object.keys(stories).map((o, i) => ({
          value: o,
          children: splitStoryToSentence(o),
          onClick: () => {
            setStory(storiesList[i]);
          },
          selected: story === o,
        }))}
      />
      <Box
        style={{
          marginTop: theme.spacing(4),
        }}
      >
        {stories[story]()}
      </Box>
    </Box>
  );
};

export default Examples;
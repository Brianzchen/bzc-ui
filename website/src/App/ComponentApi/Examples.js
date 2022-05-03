// @flow
import * as React from 'react';

import {
  Box,
  Tabs,
  Typography,
} from 'startown';

import * as storyCache from './storyCache';

type Props = {|
  component: string,
|};

const Examples = ({
  component,
}: Props): React.Node => {
  const stories = storyCache[component];

  const [story, setStory] = React.useState(Object.keys(stories)[0]);

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
        tabs={Object.keys(stories).map((o) => ({
          value: o,
          onClick: () => {
            setStory(o);
          },
          selected: story === o,
        }))}
        onClick={(event, value) => {
          setStory(value);
        }}
      />
      {stories[story]()}
    </Box>
  );
};

export default Examples;

// @flow
import * as React from 'react';
import { useSearchParams } from 'react-router-dom';

import {
  Box,
  Tabs,
  Typography,
  useTheme,
} from 'bzc-ui';

import * as storyCache from './storyCache';
import { AppBarNotificationContext } from '../../utils';

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
  const { setValue } = React.useContext(AppBarNotificationContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const stories = storyCache[component];
  const storiesList = Object.keys(stories ?? {});

  const story = searchParams.get('story') ?? storiesList[0];

  if (!stories) {
    return (
      <Typography>
        Coming soon, no examples available
      </Typography>
    );
  }

  const Comp = stories[story];

  return (
    <Box>
      <Tabs
        tabs={Object.keys(stories).map((o, i) => ({
          value: o,
          children: splitStoryToSentence(o),
          onClick: () => {
            setSearchParams({
              story: storiesList[i],
            });
          },
          selected: story === o,
        }))}
      />
      <Box
        style={{
          marginTop: theme.spacing(4),
        }}
      >
        <Comp
          setAppBarNotification={setValue}
        />
      </Box>
    </Box>
  );
};

export default Examples;

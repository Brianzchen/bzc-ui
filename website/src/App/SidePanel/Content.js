// @flow
import * as React from 'react';
import {
  Link,
  generatePath,
  matchPath,
  useLocation,
} from 'react-router-dom';
import axios from 'axios';

import { routes } from 'utils';

import { Accordion, CardButton, useTheme } from 'startown';

import sidePanelContent from '../Pages/side-panel.json';

type Props = {|
  onClose?: () => void,
|};

const Content = ({
  onClose,
}: Props): React.Node => {
  const theme = useTheme();
  const location = useLocation();

  const [componentsOpen, setComponentsOpen] = React.useState(!!matchPath(
    routes.componentApi,
    location.pathname,
  ));
  const [components, setComponents] = React.useState();

  React.useEffect(() => {
    axios.get('/components.json').then(({ data }) => {
      setComponents(data);
    });
  }, []);

  return (
    <>
      <CardButton
        as={Link}
        to={routes.home}
        onClick={onClose}
        highlight={location.pathname === routes.home}
      >
        Home
      </CardButton>
      {sidePanelContent.map((o: [string, string]) => {
        const path = generatePath(routes.page, {
          currentPage: o[0].toLowerCase().replace(/ /g, '-'),
        });

        return (
          <CardButton
            key={o[1]}
            as={Link}
            to={path}
            onClick={onClose}
            highlight={location.pathname === path}
          >
            {o[0]}
          </CardButton>
        );
      })}
      <CardButton
        onClick={() => {
          setComponentsOpen((pComponentsOpen) => !pComponentsOpen);
        }}
      >
        Components
      </CardButton>
      <Accordion open={componentsOpen}>
        {components && Object.keys(components).map((key) => {
          const comp = components[key];
          const path = generatePath(routes.componentApi, {
            component: key.split('/')[1],
          });

          return (
            <CardButton
              key={comp.displayName}
              as={Link}
              to={path}
              onClick={onClose}
              style={{
                paddingLeft: theme.spacing(5),
              }}
              highlight={location.pathname === path || location.pathname === `${path}/example`}
            >
              {comp.displayName}
            </CardButton>
          );
        })}
      </Accordion>
    </>
  );
};

export default Content;

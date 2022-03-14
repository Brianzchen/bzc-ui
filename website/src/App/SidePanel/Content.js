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

import { Accordion, CardButton } from 'starfall';

import sidePanelContent from '../Pages/side-panel.json';

type Props = {|
  onClose?: () => void,
|};

const Content = ({
  onClose,
}: Props): React.Node => {
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
      >
        Home
      </CardButton>
      {sidePanelContent.map((o: [string, string]) => (
        <CardButton
          key={o[1]}
          as={Link}
          to={o[0].toLowerCase().replace(/ /g, '-')}
          onClick={onClose}
        >
          {o[0]}
        </CardButton>
      ))}
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
          return (
            <CardButton
              key={comp.displayName}
              as={Link}
              to={generatePath(routes.componentApi, {
                component: key.split('/')[1],
              })}
              onClick={onClose}
              style={(theme) => ({
                paddingLeft: theme.spacing(5),
              })}
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

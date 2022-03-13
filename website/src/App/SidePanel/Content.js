// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';

import { routes } from 'utils';

import { Accordion, CardButton } from 'starfall';

import sidePanelContent from '../Pages/side-panel.json';

type Props = {|
  onClose?: () => void,
|};

const Content = ({
  onClose,
}: Props): React.Node => {
  const [componentsOpen, setComponentsOpen] = React.useState(false);

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
        stuff
      </Accordion>
    </>
  );
};

export default Content;

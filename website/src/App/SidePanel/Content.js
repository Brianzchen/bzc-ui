// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';

import { routes } from 'utils';

import { CardButton } from 'starfall';

import sidePanelContent from '../Pages/side-panel.json';

type Props = {|
  onClose?: () => void,
|};

const Content = ({
  onClose,
}: Props): React.Node => (
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
  </>
);

export default Content;

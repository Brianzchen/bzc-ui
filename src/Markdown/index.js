// @flow
import * as React from 'react';

import useComponentTestId from '../internal/hooks/useComponentTestId';

import Typography from '../Typography';

type Props = {|
  /**
   * The content from a markdown file as a string
   */
  content?: string,
|};

/**
 * Takes a string of markdown content and renders
 * it as jsx using starfall components to match application styling
 */
const Markdown = ({
  content,
}: Props): React.Node => {
  const compTestId = useComponentTestId('Markdown');

  if (!content) return null;

  const lines = content.split('\n');

  return lines.map((o, i) => {
    /* eslint-disable react/no-array-index-key */
    if (o.startsWith('#')) {
      return (
        <Typography
          key={i}
          data-testid={compTestId('heading-1')}
          type="heading1"
        >
          {o.replace('# ', '')}
        </Typography>
      );
    }

    return (
      <Typography key={i}>
        {o}
      </Typography>
    );
    /* eslint-enable react/no-array-index-key */
  });
};

export default Markdown;

// @flow
import * as React from 'react';

import useComponentTestId from '../internal/hooks/useComponentTestId';

import Stack, { type StackT } from '../Stack';
import Typography from '../Typography';

type Props = {
  ...StackT,
  /**
   * The content from a markdown file as a string
   */
  content?: string,
  ...
};

/**
 * Takes a string of markdown content and renders
 * it as jsx using startown components to match application styling
 */
const Markdown: React$AbstractComponent<Props, HTMLElement> = React.forwardRef<Props, HTMLElement>(({
  content,
  ...otherProps
}: Props, ref): React.Node => {
  const compTestId = useComponentTestId('Markdown');

  if (!content) return null;

  const lines = content.split('\n');

  return (
    <Stack
      {...otherProps}
      ref={ref}
    >
      {lines.map((o, i) => {
        /* eslint-disable react/no-array-index-key */
        if (o.startsWith('###')) {
          return (
            <Typography
              key={i}
              data-testid={compTestId('heading-3')}
              type="heading3"
            >
              {o.replace('### ', '')}
            </Typography>
          );
        }
        if (o.startsWith('##')) {
          return (
            <Typography
              key={i}
              data-testid={compTestId('heading-2')}
              type="heading2"
            >
              {o.replace('## ', '')}
            </Typography>
          );
        }
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
      })}
    </Stack>
  );
});

Markdown.displayName = 'Markdown';

export default Markdown;

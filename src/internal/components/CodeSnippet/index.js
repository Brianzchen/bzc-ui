// @flow
import * as React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';

import stringParser from './stringParser';

type Props = {
  children: string,
  ...
};

const CodeSnippet = ({
  children = '',
  ...otherProps
}: Props): React.Node => (
  <SyntaxHighlighter
    {...otherProps}
    language="javascript"
  >
    {stringParser(children)}
  </SyntaxHighlighter>
);

export default CodeSnippet;

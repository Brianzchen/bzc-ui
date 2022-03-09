// @flow
import * as React from 'react';

import Box from '../Box';

type Props = {
  ...
};

const Wrapped = React.forwardRef<Props, HTMLElement>(({
  ...otherProps
}: Props, ref) => (
  <Box
    {...otherProps}
    ref={ref}
    as="textarea"
  />
));

Wrapped.displayName = 'WrappedTextArea';

export default (Wrapped: React$AbstractComponent<Props, HTMLElement>);

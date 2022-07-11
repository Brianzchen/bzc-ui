// @flow
import * as React from 'react';

import Box from '../Box';

type Props = {
  optional: boolean,
  ...
};

const Wrapped = React.forwardRef<Props, HTMLElement>(({
  optional,
  ...otherProps
}: Props, ref) => (
  <Box
    {...otherProps}
    ref={ref}
    as="textarea"
    aria-required={!optional}
  />
));

Wrapped.displayName = 'WrappedTextArea';

export default (Wrapped: React$AbstractComponent<Props, HTMLElement>);

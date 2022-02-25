// @flow
import * as React from 'react';

import Box from '../../Box';
import useTheme from '../../useTheme';

type Props = {
  children?: React.Node,
  className?: string,
  icon?: string,
  ...
};

const BaseIcon = React.forwardRef<Props, HTMLElement>(({
  children = null,
  className = '',
  icon = '',
  ...otherProps
}: Props, ref) => {
  const theme = useTheme();

  return (
    <Box
      {...otherProps}
      ref={ref}
      as="i"
      className={`${icon ? `${theme.iconPrefix ?? 'icon-'}${icon}` : ''} ${className}`}
    >
      {children}
    </Box>
  );
});

BaseIcon.displayName = 'BaseIcon';

export default (BaseIcon: React$AbstractComponent<Props, HTMLElement>);

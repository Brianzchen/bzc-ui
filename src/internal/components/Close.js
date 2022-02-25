// @flow
import * as React from 'react';

import Box from '../../Box';
import type { StyleT } from '../../types';

type Props = {|
  size: number,
  color: string,
  style?: StyleT,
|};

const Close = ({
  size,
  color,
  style,
}: Props): React.Node => (
  <Box
    as="svg"
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 20 20"
    version="1.1"
    style={style}
  >
    <g id="Artboard" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <path
        d="M10,7.77777778 L17.7777778,-2.20268248e-13 L20,2.22222222 L12.2222222,10 L20,17.7777778 L17.7777778,20 L10,12.2222222 L2.22222222,20 L-2.16271445e-13,17.7777778 L7.77777778,10 L-2.16271445e-13,2.22222222 L2.22222222,-2.21156427e-13 L10,7.77777778 Z"
        id="Combined-Shape"
        fill={color}
        fillRule="nonzero"
      />
    </g>
  </Box>
);

export default Close;

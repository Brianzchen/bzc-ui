// @flow
import * as React from 'react';

import Box from '../../Box';
import useTheme from '../../useTheme';
import type { StyleT } from '../../types';

type Props = {|
  selected?: boolean,
  style?: StyleT,
|};

const Tick = ({
  selected = true,
  style = {},
}: Props): React.Node => {
  const theme = useTheme();

  return (
    <Box
      as="svg"
      style={style}
      width={`${16 * theme.scale}px`}
      height={`${13 * theme.scale}px`}
      viewBox="0 0 16 13"
      version="1.1"
    >
      <g id="tick" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          id="Group-7-Copy"
          fill={selected ? theme.colors.monoInverse() : 'transparent'}
          fillRule="nonzero"
        >
          <g id="T-ATM-Icon-Tick-[Green]-WEB-Copy-6">
            <path d="M14.8785831,1.13524228 L14.8785831,1.13524228 C15.5011426,1.76547697 15.503995,2.77829401 14.8849953,3.41202538 L6.2310636,12.2719132 C5.84515841,12.6670026 5.21203721,12.6744479 4.81694781,12.2885427 C4.81274718,12.2844397 4.80858276,12.2802998 4.80445505,12.2761235 L1.12139152,8.54966444 C0.49990227,7.92085253 0.499765813,6.90913302 1.12108542,6.28015348 L1.12108542,6.28015348 C1.73292852,5.66076727 2.73103708,5.65465238 3.35042329,6.26649548 C3.35486628,6.27088436 3.35928315,6.27529961 3.36367367,6.27974099 L5.51303053,8.45399579 L12.6430844,1.14244152 C13.246979,0.523174402 14.2385474,0.510712488 14.8578145,1.11460705 C14.8648015,1.1214206 14.8717247,1.12829931 14.8785831,1.13524228 Z" id="tick" />
          </g>
        </g>
      </g>
    </Box>
  );
};

export default Tick;

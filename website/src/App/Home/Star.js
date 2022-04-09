// @flow
import * as React from 'react';

import { Box, useTheme } from 'startown';

type Props = {|
  left?: number,
  top?: number,
  lineLength?: number,
|};

const Star = ({
  left,
  top,
  lineLength,
}: Props): React.Node => {
  const theme = useTheme();
  const size = 24 * theme.scale;

  const colorAnimation = {
    '0%': {
      opacity: 0.5,
    },
    '50%': {
      opacity: 1,
    },
    '100%': {
      opacity: 0.45,
    },
  };

  return (
    <Box
      style={{
        position: 'absolute',
        left,
        top,
        animationName: [colorAnimation],
        animationDuration: '2s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear',
      }}
    >
      {lineLength && (
        <Box
          style={{
            backgroundColor: theme.colors.monoInverse(),
            position: 'absolute',
            left: `calc(50% - ${theme.scale}px)`,
            bottom: `calc(100% - ${size + (7 * theme.scale)}px)`,
            width: theme.scale,
            height: lineLength * theme.scale,
          }}
        />
      )}
      <Box
        as="svg"
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 476.000000 476.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          transform="translate(0.000000,476.000000) scale(0.100000,-0.100000)"
          fill={theme.colors.monoInverse()}
          stroke="none"
        >
          <path d="M2238 4163 l-38 -4 0 -751 0 -752 -85 125 c-46 68 -107 151 -135 184
    -76 88 -389 560 -397 596 -3 17 -12 33 -19 36 -14 5 -172 -43 -188 -57 -21
    -20 35 -125 188 -353 88 -133 190 -279 226 -325 150 -192 260 -356 247 -368
    -11 -11 -439 84 -572 127 -148 47 -546 195 -742 275 -73 29 -147 55 -164 56
    l-32 3 -27 -98 -27 -97 26 -7 c14 -3 62 -21 106 -40 178 -76 753 -286 872
    -318 71 -19 200 -50 287 -68 l160 -33 -35 -26 c-19 -14 -81 -56 -139 -94 -85
    -55 -139 -101 -285 -249 -151 -153 -195 -192 -275 -240 -52 -32 -141 -88 -197
    -125 -56 -37 -122 -76 -147 -85 -25 -10 -46 -21 -46 -26 0 -13 61 -173 69
    -181 10 -11 137 52 248 125 54 35 145 93 203 130 89 55 132 93 277 240 149
    152 188 186 300 259 71 47 166 117 211 157 44 39 83 71 86 71 3 0 6 -129 6
    -287 0 -303 -15 -517 -50 -737 -33 -206 -50 -458 -34 -500 5 -13 25 -16 110
    -16 l105 0 -7 74 c-7 80 6 241 36 431 34 213 42 324 49 615 l6 284 86 -84
    c102 -100 126 -136 191 -290 93 -215 123 -264 211 -343 44 -40 135 -126 201
    -192 134 -133 229 -206 314 -241 94 -39 92 -40 92 81 l0 105 -37 19 c-51 26
    -131 94 -233 199 -47 48 -122 120 -167 160 -89 78 -96 91 -193 314 -55 128
    -101 202 -178 288 -59 65 -61 69 -35 65 15 -3 144 -14 287 -26 338 -27 697
    -24 881 9 66 12 210 31 320 42 110 11 218 26 241 32 l41 11 -19 86 c-28 128
    -25 122 -56 110 -14 -5 -127 -21 -251 -34 -125 -13 -282 -33 -351 -45 -188
    -30 -464 -27 -905 10 -192 16 -361 30 -375 30 l-25 0 25 20 c14 10 75 38 135
    61 222 84 268 114 469 302 99 94 208 193 241 220 128 107 494 375 498 364 5
    -16 142 90 207 161 30 32 62 61 70 64 13 4 12 15 -4 84 -26 115 -25 114 -49
    114 -36 0 -104 -39 -143 -83 -21 -23 -77 -69 -125 -102 -150 -104 -550 -409
    -639 -487 -47 -42 -147 -135 -224 -207 -147 -140 -198 -172 -374 -235 -40 -14
    -86 -33 -102 -41 l-30 -16 0 766 0 765 -67 -2 c-38 -1 -85 -3 -105 -5z"
          />
        </g>
      </Box>
    </Box>
  );
};

export default Star;

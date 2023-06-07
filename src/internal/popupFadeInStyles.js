// @flow
export const containerKeyframe = {
  '0%': {
    transform: 'scale(0.8)',
  },
};

export const animationBaseStyles = {
  animationDuration: '0.1s',
  animationIterationCount: 1,
};

export const containerStyles = {
  animationName: [containerKeyframe],
  ...animationBaseStyles,
};

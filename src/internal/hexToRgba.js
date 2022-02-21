// @flow
import hexRgb from 'hex-to-rgb';

export default (hex: string, alpha: string | number): string => {
  const rgb = hexRgb(hex);

  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
};

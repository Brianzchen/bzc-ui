// @flow
import toKebabCase from './toKebabCase';

/**
 * Create a standardized testid format
 */
export default (componentName: string, suffix: string | number): string => {
  const componentKebab = componentName.split('').map((o, i) => {
    if (o.toUpperCase() === o) {
      if (i === 0) {
        return o.toLowerCase();
      }
      return `-${o.toLowerCase()}`;
    }
    return o;
  }).join('');
  return `st-${componentKebab}-${toKebabCase(`${suffix}`)}`;
};

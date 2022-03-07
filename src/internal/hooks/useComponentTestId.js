// @flow
import componentTestId from '../componentTestId';

export default (componentName: string): ((string | number) => string) => (suffix) => (
  componentTestId(componentName, suffix)
);

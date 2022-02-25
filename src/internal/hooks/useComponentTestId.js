// @flow
import componentTestId from '../componentTestId';

export default (componentName: string): ((string) => string) => (suffix) => (
  componentTestId(componentName, suffix)
);

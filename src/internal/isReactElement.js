// @flow
import * as React from 'react';

/**
 * A type safe function to validate if a child is a React component. Matches the functionality of `React.isValidElement`
 */
export default (obj: React.Node, name?: string): obj is React.Element<any> => (
  // $FlowFixMe[incompatible-return] Need to type check that this is not iterable before it can type refine correctly
  !!obj
  && typeof obj !== 'boolean'
  && typeof obj !== 'string'
  && typeof obj !== 'number'
  && typeof obj === 'object'
  // $FlowFixMe[prop-missing] this current type refines it in JS to not iterable but flow doesn't understand this
  && !!obj.type
  && (name ? !!obj.type?.displayName && obj.type.displayName === name : !!obj.type)
);

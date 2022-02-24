// @flow
import * as React from 'react';

/**
 * A type safe function to validate if a child is a React component. Matches the functionality of `React.isValidElement`
 */
export default (obj: React.Node, name?: string): boolean %checks => (
  !!obj
  && typeof obj !== 'boolean'
  && typeof obj !== 'string'
  && typeof obj !== 'number'
  && typeof obj === 'object'
  && !!obj.type
  && (name ? !!obj.type?.displayName && obj.type.displayName === name : !!obj.type)
);

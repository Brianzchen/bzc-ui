// flow-typed signature: 52207ada33f6ba3ea64bf5e7c2ea5ef7
// flow-typed version: 4834b436ed/react/flow_>=v0.83.x

declare type React$AbstractComponentStatics = {
  displayName?: ?string,
  // This is only on function components, but trying to access name when
  // displayName is undefined is a common pattern.
  name?: ?string,
  propTypes?: {[string] : any, ...},
  [key: string]: any,
  ...
};

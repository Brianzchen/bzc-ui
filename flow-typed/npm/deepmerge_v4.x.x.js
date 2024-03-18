// flow-typed signature: 39e781d67070b74453f9e74895299915
// flow-typed version: 81fb5825ff/deepmerge_v4.x.x/flow_>=v0.201.x

declare module 'deepmerge' {
  declare type ArrayMergeOptions  = {|
    isMergeableObject: (value: { ... }) => boolean,
    cloneUnlessOtherwiseSpecified: (value: { ... }, options?: Options) =>  { ... },
  |};

  declare type Options = {|
    clone?: boolean,
    arrayMerge?: (destination: any[], source: any[], options: ArrayMergeOptions) => Array<any>,
    isMergeableObject?: (value: { ... }) => boolean,
    customMerge?: (key: string, options?: Options) => ((x: any, y: any) => any) | void,
  |};

  declare module.exports: {
    <A, B>(a: A, b: B, options?: Options): A & B,
    all<T>(objects: Array<Partial<T>>, options?: Options): T,
    ...
  };
}

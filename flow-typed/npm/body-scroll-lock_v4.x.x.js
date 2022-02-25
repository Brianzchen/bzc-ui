// flow-typed signature: 5bf3a62b37d1c35e79dc1c8c5128c971
// flow-typed version: baaea15351/body-scroll-lock_v4.x.x/flow_>=v0.83.x

declare module 'body-scroll-lock' {
  declare type BodyScrollOptions = {|
    reserveScrollBarGap?: boolean,
    allowTouchMove?: (el: any) => boolean,
  |}

  declare type BodyScrollLock = {|
    disableBodyScroll: (target: HTMLElement, options?: BodyScrollOptions) => void,
    enableBodyScroll: (target: HTMLElement) => void,
    clearAllBodyScrollLocks: () => void,
  |};

  declare module.exports: BodyScrollLock;
}

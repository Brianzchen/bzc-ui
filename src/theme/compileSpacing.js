// @flow
export default (spacing: { ... }, scale?: number = 1): (space: number) => number => (
  (space: number): number => {
    const s = spacing[space];
    if (!s) return 0;
    return s * scale;
  }
);

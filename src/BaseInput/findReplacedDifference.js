// @flow
export default (a: string, b: string): string => {
  let startIndex = -1;
  let endIndex = -1;

  // If `b` is longer or same as `a`, look for replaced characters
  if (a.length <= b.length) {
    for (let i = 0, len = b.length; i < len; i++) {
      if (a[i] !== b[i]) {
        startIndex = i;
        break;
      }
    }
    for (let i = 0, len = b.length; i < len; i++) {
      if (a[a.length - i] !== b[b.length - i]) {
        endIndex = b.length - i + 1;
        break;
      }
    }
    return b.substring(startIndex, endIndex);
  }

  // Otherwise `b` is less than `a` but there could still be replace chars
  // or simply removal of chars
  for (let i = 0, len = a.length; i < len; i++) {
    if (a[i] !== b[i]) {
      startIndex = i;
      break;
    }
  }

  // Once we find the `startIndex`, if it's the same as the length of `b`
  // then there is no replaced chars and user has only removed characters.
  // Return empty string
  if (b.length === startIndex) {
    return '';
  }

  // Otherwise we find the end index of the group of chars that were replaced
  for (let i = 0, len = a.length; i < len; i++) {
    if (a[a.length - i] !== b[b.length - i]) {
      endIndex = b.length - i + 1;
      break;
    }
  }
  return b.substring(startIndex, endIndex);
};

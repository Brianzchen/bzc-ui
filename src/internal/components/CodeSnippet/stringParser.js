// @flow
export default (string: string): string => {
  const firstChar = string.substring(0, 1);

  if (firstChar === '\n') {
    return string.substring(1);
  }

  return string;
};

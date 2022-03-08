// @flow
export default (): 'iOS' | 'Android' | string => {
  const { appVersion } = window.navigator;

  if (appVersion.indexOf('iPhone') > -1) return 'iOS';
  if (appVersion.indexOf('Android') > -1) return 'Android';

  return 'other';
};

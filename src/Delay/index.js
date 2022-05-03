// @flow
import * as React from 'react';

export type DelayT = {|
  /** children to be delayed */
  children?: React.Node,
  /** the timeout prior to the child mounting in milliseconds */
  timeout?: number,
|};

/**
 * Delay the initial render of a wrapped component
 */
const Delay = ({
  children = null,
  timeout = 200,
}: DelayT): React.Node => {
  const [render, setRender] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setRender(true);
    }, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!render) return null;

  return (
    // Disable so that parsers consider this func a react component
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {children}
    </>
  );
};

Delay.displayName = 'Delay';

export default Delay;

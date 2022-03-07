// @flow
import * as React from 'react';

import type { RefObjT } from '../types';

export type RenderT = ({|
  onClose: (...args: Array<any>) => any,
  attachRef: RefObjT,
  sheetRef: RefObjT,
|}) => React.Node;

type Props = {|
  render?: RenderT,
  onClose?: (...args: Array<any>) => any,
  attachRef: RefObjT,
  sheetRef: RefObjT,
|};

const Child = ({
  render,
  onClose = () => {},
  attachRef,
  sheetRef,
}: Props): React.Node => {
  if (!render) return null;

  return render({
    onClose,
    attachRef,
    sheetRef,
  });
};

export default (React.memo<Props>(Child): React$AbstractComponent<Props, mixed>);

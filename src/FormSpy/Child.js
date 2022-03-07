// @flow
import * as React from 'react';

import type { FormValuesT } from '../Form/FormContext';

type Props = {|
  render: (FormValuesT, boolean) => React.Node,
  formValues: FormValuesT,
  formSubmitted: boolean,
  subscribing: boolean,
|};

const Child = ({
  render,
  formValues,
  formSubmitted,
}: Props): React.Node => render(formValues, formSubmitted);

const areEqual = (prevProps: Props, nextProps: Props): boolean => {
  if (!nextProps.subscribing) return false;

  return JSON.stringify(prevProps.formValues) === JSON.stringify(nextProps.formValues);
};

export default (React.memo<Props>(Child, areEqual): React$AbstractComponent<Props, mixed>);

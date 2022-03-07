// @flow
import * as React from 'react';

import useFormValues from '../useFormValues';
import type { FormValuesT } from '../Form/FormContext';

import Child from './Child';

const useSubscribedValues = (subscribers: Array<string>): FormValuesT => {
  const { formValues } = useFormValues();

  if (subscribers.length === 0) return formValues;

  return Object.keys(formValues).filter((key) => (
    subscribers.indexOf(key) > -1
  )).reduce((acc, cur) => {
    acc[cur] = formValues[cur];
    return acc;
  }, {});
};

type Props = {|
  /**
   * Render props that will return the values held in the form context
   * (values, formSubmitted) => React.Node
   */
  children?: (values: FormValuesT, formSubmitted: boolean) => React.Node,
  /**
   * If defined the instance of FormSpy will only trigger rerenders
   * when the given keys have their properties changed
  */
  subscribers?: Array<string>,
|};

/**
 * A utility component used in conjunction with `Form` to access the values from the form context.
 */
const FormSpy = ({
  children,
  subscribers = [],
}: Props): React.Node => {
  const { formWrapped, formSubmitted } = useFormValues();
  const formValues = useSubscribedValues(subscribers);

  if (!children) return null;
  if (!formWrapped) {
    console.error('`FormSpy` must be a child of the starfall `Form` component');
    return null;
  }

  return (
    <Child
      render={children}
      formValues={formValues}
      formSubmitted={formSubmitted}
      subscribing={subscribers.length !== 0}
    />
  );
};

export default FormSpy;

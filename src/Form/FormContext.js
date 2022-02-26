// @flow
import * as React from 'react';

export type ValueT = {|
  valid: boolean,
  error: boolean,
  errorApplied?: boolean,
  value: any,
|} | void;

export type ValueMaybeT = {|
  valid?: boolean,
  error?: boolean,
  errorApplied?: boolean,
  value?: any,
|};

export type FormValuesT = {|
  [string]: ValueT,
|};

export type FormContextT = {|
  formValues: FormValuesT,
  setFormValues: (
    key: string,
    value: ValueMaybeT,
  ) => void,
  formSubmitted: boolean,
  formWrapped: boolean,
|};

const Context: React.Context<FormContextT> = React.createContext<FormContextT>({
  formValues: {},
  setFormValues: () => {},
  formSubmitted: false,
  formWrapped: false,
});

export const {
  Consumer,
  Provider,
} = Context;

export default Context;

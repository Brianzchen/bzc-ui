// @flow
import * as React from 'react';

import FormContext from '../Form/FormContext';
import type { FormContextT } from '../Form/FormContext';

/**
 * A React hook used in conjunction with the `Form` component to access and set values to the form context.
 */
export default function useFormValues(): FormContextT {
  const context = React.useContext(FormContext);

  return context;
}

// @flow
import * as React from 'react';

import Box from '../Box';
import type { BoxT } from '../Box';

import { Provider } from './FormContext';

export type FormT = {
  ...BoxT,
  /**
   * function to call when form is submitted.
   * (event, values) => void
   */
  onSubmit?: (
    event: any,
    values: {
      [key: string]: ?{|
        valid: false,
        error: false,
        value: '',
      |},
    }) => any,
  ...
};

/**
 * A component that wraps the html <form /> tag and create a form context
 * that can be used in conjunction with various components to track form state
 * across a feature or application.
 *
 * FormSpy and useFormValues are the two main ways to access the values inside
 * the form context.
 * These need to be nested within a Form component.
 */
const Form: React$AbstractComponent<FormT, HTMLElement> = React.forwardRef<FormT, HTMLElement>(({
  children = null,
  onSubmit,
  as = 'form',
  ...otherProps
}: FormT, ref) => {
  const [values, setValues] = React.useState({ ...null });
  const [, setSubmitted] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    onSubmit && onSubmit(e, values);
  };

  return (
    <Provider
      value={{
        formValues: values,
        setFormValues: (key, value) => {
          setValues((pValue) => ({
            ...pValue,
            [key]: {
              valid: false,
              error: false,
              value: '',
              ...pValue[key] || {},
              ...value,
            },
          }));
        },
        // Should come from `setSubmitted` when framework is ready
        formSubmitted: false,
        formWrapped: true,
      }}
    >
      <Box
        {...otherProps}
        ref={ref}
        as={as}
        onSubmit={handleSubmit}
      >
        {children}
      </Box>
    </Provider>
  );
});

Form.displayName = 'Form';

export default Form;

import React, {useContext, useEffect, useCallback} from 'react';
import debounce from 'lodash.debounce';

import {FormContext} from './formContext';

import AppTextInput from '../AppTextInput';
import ErrorMessage from './ErrorMessage';

function AppFormField({name, ...otherProps}) {
  const {
    errors,
    fieldTouched,
    formValue,
    setErrors,
    setFieldTouched,
    setFormValue,
    validationSchema,
  } = useContext(FormContext);

  useEffect(() => {
    checkValid(formValue[name]);
  }, [formValue[name]]);

  const handleBlur = name => {
    const newTouched = {};
    newTouched[name] = true;
    setFieldTouched({...fieldTouched, ...newTouched});
  };

  const handleChange = newText => {
    const newValue = {};
    newValue[name] = newText;
    setFormValue({
      ...formValue,
      ...newValue,
    });
  };

  const checkValid = useCallback(
    debounce(async value => {
      if (value) {
        const validateFunc = validationSchema[name];
        const {isValid, error} = await validateFunc(value);
        const newError = {};
        newError[name] = error;
        setErrors({...errors, ...newError});
      }
    }, 500),
  );

  return (
    <>
      <AppTextInput
        onBlur={() => handleBlur(name)}
        onChangeText={newText => handleChange(newText)}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={fieldTouched[name]} />
    </>
  );
}

export default AppFormField;

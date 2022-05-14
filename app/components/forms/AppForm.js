import React, {useState, useEffect} from 'react';
import {View} from 'react-native';

import {FormContext} from './formContext';

import SubmitButton from './SubmitButton';

function AppForm({
  initialValues,
  onSubmit,
  title = 'Submit',
  validationSchema = {},
  children,
}) {
  const [formValue, setFormValue] = useState({});
  const [fieldTouched, setFieldTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormValue(initialValues);

    let newTouched = {};
    let newErrors = {};
    Object.keys(initialValues).forEach(k => {
      newTouched[k] = false;
      newErrors[k] = null;
    });

    setFieldTouched({...fieldTouched, ...newTouched});
    setErrors({...errors, ...newErrors});
  }, []);

  return (
    <FormContext.Provider
      value={{
        errors,
        fieldTouched,
        formValue,
        setErrors,
        setFieldTouched,
        setFormValue,
        validationSchema,
      }}>
      <View>
        {children}
        <SubmitButton
          title={title}
          onSubmit={onSubmit}
          errors={errors}
          touched={fieldTouched}
          loading={loading}
          setLoading={setLoading}
        />
      </View>
    </FormContext.Provider>
  );
}

export default AppForm;

import React, {useContext, useEffect, useCallback, useState} from 'react';
import {StyleSheet} from 'react-native';
import debounce from 'lodash.debounce';

import {FormContext} from './formContext';
import colors from '../../config/colors';

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

  const [focused, setFocused] = useState(false);

  useEffect(() => {
    checkValid(formValue[name]);
  }, [formValue[name]]);

  const handleEndEditing = (e, name) => {
    if (e.nativeEvent.text) {
      const newTouched = {};
      newTouched[name] = true;
      setFieldTouched({...fieldTouched, ...newTouched});
    }
    setFocused(false);
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
        if (validateFunc) {
          const {isValid, error} = await validateFunc(value);
          const newError = {};
          newError[name] = error;
          setErrors({...errors, ...newError});
        }
      }
    }, 400),
  );

  return (
    <>
      <AppTextInput
        style={[
          styles.container,
          fieldTouched[name]
            ? errors[name]
              ? styles.error
              : styles.valid
            : null,
          focused && styles.focused,
        ]}
        onEndEditing={e => handleEndEditing(e, name)}
        onFocus={() => setFocused(true)}
        onChangeText={newText => handleChange(newText)}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={fieldTouched[name]} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  error: {
    borderColor: colors.danger,
    borderWidth: 1.5,
  },
  focused: {
    borderColor: colors.buttonFocused,
    borderWidth: 1.5,
  },
  valid: {
    borderColor: colors.primary,
    borderWidth: 1.5,
  },
});

export default AppFormField;

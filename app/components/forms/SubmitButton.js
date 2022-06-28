import React, {useEffect, useState, useContext} from 'react';

import {FormContext} from './formContext';

import AppButton from '../AppButton';

function SubmitButton({title, onSubmit, errors, touched}) {
  const [disabled, setDisabled] = useState(true);

  const {formValue} = useContext(FormContext);

  useEffect(() => {
    handleChange();
  }, [errors, touched]);

  const handleChange = () => {
    let isValid;

    isValid = Object.keys(errors).every(key => {
      return !errors[key] && touched[key];
    });

    setDisabled(!isValid);
  };

  return (
    <AppButton
      title={title}
      onPress={() => onSubmit(formValue)}
      disabled={disabled}
      color={disabled ? 'primaryDisabled' : 'primary'}
    />
  );
}

export default SubmitButton;

import React, {useEffect, useState, useContext} from 'react';
import { Dimensions } from 'react-native';

import {FormContext} from './formContext';

import Button from '../Button';
import colors from '../../config/colors';

const { height, width } = Dimensions.get('window');

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
    <Button 
      text={title.toUpperCase()}
      action={() => onSubmit(formValue)}
      disabled={disabled}
      textColor={'white'}
      textSize={18}
      style={{height: height*0.07, backgroundColor: disabled ? colors.primaryDisabled : colors.primary, borderRadius: '5%'}}
    />
  );
}

export default SubmitButton;

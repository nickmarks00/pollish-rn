import React from 'react';

import AppPicker from '../AppPicker';
import ErrorMessage from './ErrorMessage';

function AppFormPicker({items, name, placeholder, values}) {
  const setFieldValue = () => {
    console.log('set field value');
  };

  return (
    <>
      <AppPicker
        items={items}
        onSelectItem={item => setFieldValue(name, item)}
        placeholder={placeholder}
        selectedItem={values[name]}
      />
      <ErrorMessage error={errors[name]} visible={false} />
    </>
  );
}

export default AppFormPicker;

import React, {useState} from 'react';
import {Formik} from 'formik';

function AppForm({initialValues, onSubmit, validationSchema, children}) {
  const [formValue, setFormValue] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {() => <>{children}</>}
    </Formik>
  );
}

export default AppForm;

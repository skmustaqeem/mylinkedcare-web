import React from 'react';

// EXTERNAL LIBRARY
import { useField, useFormikContext } from 'formik';

const CheckBox = (props) => {

  const { name, label, onChange, ...rest } = props;
  const [field, meta] = useField(name);
  const { setFieldTouched, setFieldValue } = useFormikContext();

  const renderError = () => {
    return (
      meta.touched && meta.error ? (
        <div className="">{meta.error}</div>
      ) : null
    )
  }

  return (
    <div>
      <div className='flex gap-2'>
        <input
          id={name + '-id'}
          type="checkbox"
          className=""
          name={name}
          {...field}
          onChange={(e) => {
            if (onChange) {
              onChange({ target: { name, value: e.target.checked } });
            }
            setFieldTouched(name, true);
            setFieldValue(name, e.target.checked);
          }}
          checked={field.value ? true : false}
          {...rest}
        />
        <label htmlFor={name + '-id'}>{label}</label>
      </div>
      {renderError()}
    </div>
  );
}

export default CheckBox

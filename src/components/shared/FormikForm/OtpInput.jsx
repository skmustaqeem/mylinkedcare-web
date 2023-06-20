import React from 'react';
import ReactOtpInput from 'react-otp-input';

import { useField, useFormikContext } from 'formik';

const OtpInput = (props) => {
  const { name, label, onChange, numberOfDigits, ...rest } = props;
  const [field, meta] = useField(name);
  const { setFieldTouched, setFieldValue } = useFormikContext();


  const renderError = () => {
    return (
      meta.touched && meta.error ? (
        <div className={""}>{meta.error}</div>
      ) : null
    )
  }

  return (
    <div>
      {
        label && <label
          htmlFor={name + '-id'}
          className={""}
        >
          {label}
        </label>
      }
      <ReactOtpInput
        value={field.value}
        inputStyle="inputStyle"
        containerStyle="containerStyle"
        onChange={(val) => {
          if (onChange)
            onChange(val);
          setFieldTouched(name, true);
          setFieldValue(name, val);
        }}
        numInputs={numberOfDigits}
        renderSeparator={<span>&nbsp;</span>}
        renderInput={(props) => <input {...props} />}
      />
      {renderError()}
    </div>
  );

}

export default OtpInput
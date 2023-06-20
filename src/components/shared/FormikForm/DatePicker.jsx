

import React from "react";

import { useField, useFormikContext } from "formik";
import ReactDatePicker from "react-datepicker";

const DatePicker = (props) => {

  const { name, label, disabled, interval, startDate, endDate, dateFormat, onChange, ...rest } = props;
  const [field, meta] = useField(name);
  const { setFieldTouched, setFieldValue } = useFormikContext();

  const renderError = () => {
    return (
      meta.touched && meta.error ? (
        <div className="errors-msg">{meta.error}</div>
      ) : null
    )
  }

  return (
    <div>
      {
        label && <label
          htmlFor={name + '-id'}
          className=""
        >
          {label}
        </label>
      }
      <ReactDatePicker
        selected={field.value}
        {...field}
        onChange={(date) => {
          if (onChange)
            onChange(date);
          setFieldTouched(name, true);
          setFieldValue(name, date);
        }}
        className="form-control"
        dateFormat={dateFormat ? dateFormat : "dd/MM/yyyy"}
        disabled={disabled}
        autoComplete="off"
        {...rest}
      />
      {renderError()}
    </div>
  );
};

export default DatePicker;

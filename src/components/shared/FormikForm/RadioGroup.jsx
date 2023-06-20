import React from 'react';

// EXTERNAL LIBRARY
import { useField, useFormikContext } from 'formik';

const RadioGroup = (props) => {

  const { name, label, onChange, options, ...rest } = props;
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
      <div className='flex flex-wrap'>
        {options.map((option, index) => {
          return (
            <div className="flex gap-2 items-center" key={option.value + '-key-' + index} style={{minWidth:'100px'}}>
              <input
                id={option.value + '-id'}
                className=""
                {...field}
                value={option.value}
                checked={option.value === field.value}
                type={"radio"}
                onChange={(e) => {
                  if (onChange)
                    onChange(e);
                  setFieldTouched(name, true);
                  setFieldValue(name, e.target.value);
                }}
                {...rest}
              />
              <label htmlFor={option.value + '-id'} className=''>{option.label}</label>
            </div>)
        })}
      </div>
      {renderError()}
    </div>
  )
}

export default RadioGroup
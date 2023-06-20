import React from 'react';

// EXTERNAL LIBRARY
import { useField, useFormikContext } from 'formik';

import classNames from 'classnames';

const Input = (props) => {

    const { name, placeholder, label, type, onChange, ...rest } = props;
    const [field, meta] = useField(name);
    const { setFieldTouched, setFieldValue } = useFormikContext();

    const renderError = () => {
        return (
            meta.touched && meta.error ? (
                <div className={classNames("form-input", { 'errors-msg': meta.touched && meta.error })}>{meta.error}</div>
            ) : null
        )
    }

    return (
        <div>
            {
                label && <label
                    htmlFor={name + '-id'}
                    className={classNames("form-input", { 'label-error': meta.touched && meta.error })}
                >
                    {label}
                </label>
            }

            <input
                id={name + '-id'}
                className={classNames("form-input", { 'error': meta.touched && meta.error })}
                name={name}
                {...field}
                type={type ? type : "text"}
                autoComplete="off"
                placeholder={placeholder}
                onChange={(e) => {
                    if (onChange)
                        onChange(e);
                    setFieldTouched(name, true);
                    setFieldValue(name, e.target.value);
                }}
                {...rest}
            />
            {renderError()}
        </div>
    );
}

export default Input

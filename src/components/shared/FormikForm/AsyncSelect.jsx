import React from 'react';

// EXTERNAL LIBRARY
import { useField, useFormikContext } from 'formik';
import ReactAsyncSelect from 'react-select/async';;

import makeAnimated from "react-select/animated";

export const animatedComponents = makeAnimated();

const AsyncSelect = (props) => {

    const { name, label, onChange, options, ...rest } = props;
    const [field, meta] = useField(name);
    const { setFieldTouched, setFieldValue } = useFormikContext();

    const renderError = () => {
        return (
            meta.touched && meta.error ? (
                <div className="p-error errors-msg">{meta.error}</div>
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

            <ReactAsyncSelect
                id={name + '-id'}
                className=""
                name={name}
                components={animatedComponents}
                {...field}
                onChange={(val) => {
                    if (onChange)
                        onChange({ target: { value: val.value, name } });
                    setFieldTouched(name, true);
                    setFieldValue(name, val ? val : []);
                }}
                onMenuOpen={() => {
                    setFieldTouched(name, true);
                }}
                {...rest}
            />
            {renderError()}
        </div>
    );
}


export default AsyncSelect
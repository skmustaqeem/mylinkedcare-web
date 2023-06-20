import React, { useState } from 'react';

// EXTERNAL LIBRARY
import { useField, useFormikContext } from 'formik';

const convertNestedObjectToArray = (nestedObj) => Object.keys(nestedObj).map((key) => nestedObj[key]);

const KILO_BYTES_PER_BYTE = 1000;
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000;

const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

const FileUpload = (props) => {

  const { name, label, updateFilesCb, maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES, ...rest } = props;
  const [field, meta] = useField(name);
  const { setFieldTouched, setFieldValue } = useFormikContext();

  const [files, setFiles] = useState({});

  const renderError = () => {
    return (
      meta.touched && meta.error ? (
        <div className="errors-msg">{meta.error}</div>
      ) : null
    )
  }

  const handleNewFileUpload = (e) => {
    const { files: newFiles } = e.target;
    updateFilesCb(e.target.files[0]);

    if (newFiles.length) {
      let updatedFiles = addNewFiles(newFiles);
      setFiles(updatedFiles);
      callUpdateFilesCb(updatedFiles);
    }
    setFieldTouched(name, true);
    setFieldValue(name, e.target.value);
  };

  const callUpdateFilesCb = (files) => {
    const filesAsArray = convertNestedObjectToArray(files);
    // updateFilesCb(filesAsArray);
  };

  const addNewFiles = (newFiles) => {
    for (let file of newFiles) {
      if (file.size <= maxFileSizeInBytes) {
        if (!rest.multiple) {
          return { file };
        }
        files[file.name] = file;
      }
    }
    return { ...files };
  };

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
      <input
        type="file"
        id={name + '-id'}
        name={name}
        className="form-control"
        {...field}
        filename={field.value}
        {...rest}
        onChange={handleNewFileUpload}
      />
      {renderError()}
    </div>
  )
}

export default FileUpload
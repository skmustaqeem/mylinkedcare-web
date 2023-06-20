import { useState } from "react";

import { Formik } from "formik";
import * as Yup from 'yup';
import { toast } from "react-toastify";

import Modal from "../Modal";
import FormikForm from "../FormikForm";

import Constants from "@/utils/Constants";

const UploadDocument = ({ open, setOpen, id, docType }) => {
  const [file, setFile] = useState({})
  const initialValues = { date: "", category_code: "", file: "", notes: "" }
  const validationSchema = Yup.object().shape({
    date: Yup.date().required("Field Required"),
    category_code: Yup.object().nullable().required('Field Required'),
    file: Yup.mixed().required('File is required'),
  });
  const onSubmit = async (values) => {
    let formdata = new FormData();

    formdata.append("notes", values.notes);
    formdata.append("date", values.date);
    formdata.append("file", file);
    formdata.append("patient_id", id);
    formdata.append("category_code", values.category_code.value);

    const requestOptions = {
      method: 'POST',
      body: formdata,
    };

    const res = await fetch(Constants.API_ENDPOINTS.CREATE_DOCUMENT, requestOptions)
    const data = await res.json()
    if (data.status) {
      toast.success("Document Added Successfully")
      setOpen(false)
    }
  }

  const updateFilesCb = (data) => {
    setFile(data)
  }
  return (
    <>
      <Modal open={open} setOpen={setOpen}>
        <div className="fixed inset-0 z-1000 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="">
                  <div
                    className="modal-header -m-6 mb-5 flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                    <h5
                      className="text-xl font-medium leading-normal text-neutral-800"
                      id="exampleModalLabel">Upload Document</h5>
                    <button
                      type="button"
                      className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                      onClick={() => setOpen(false)}
                      aria-label="Close">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="h-6 w-6">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="modal-body relative overflow-y-auto">
                      <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        enableReinitialize
                        onSubmit={onSubmit}
                      >
                        {({ handleSubmit }) => {
                          return (
                            <form onSubmit={handleSubmit}>
                              <div className="mb-5">
                                <div className="grid grid-cols-1 gap-2">
                                  <FormikForm.Select label="Document Type" name="category_code" options={docType} />
                                  <FormikForm.DatePicker label="Date" name="date" />
                                  <FormikForm.Input label="Notes" name="notes" type="text" />
                                  <FormikForm.FileUpload label="Files" name="file" updateFilesCb={updateFilesCb} />
                                </div>
                              </div>
                              <div
                                className="flex gap-4 rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                                <button
                                  type="button"
                                  className="btn btn-secondary w-full"
                                  onClick={() => setOpen(false)}
                                >
                                  CANCEL
                                </button>
                                <button
                                  type="submit"
                                  className="btn btn-primary w-full"
                                >
                                  Add
                                </button>
                              </div>
                            </form>
                          );
                        }}
                      </Formik>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default UploadDocument
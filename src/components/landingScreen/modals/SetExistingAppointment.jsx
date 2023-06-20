"use client";
import React, { useState, useEffect } from 'react';
import Modal from '@/components/shared/Modal';
import Link from "next/link";
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormikForm from '@/components/shared/FormikForm';

export const initialValues = {
  first_name: '',
  last_name: '',
  email: '',
  selectdemo: '',
  multiselectdemo: '',
  datepickerdemo: '',
}

const countryOptions = [{
  "label": "+91",
  "value": "91"
}]

const relationship = [
  {
    "label": "Mother", "value": "Mother"
  },
  {
    "label": "Father", "value": "Father"
  }
]
const SetExistingAppointment = ({ open, setOpen }) => {
  return (
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
                    id="exampleModalLabel">Existing Patient Details</h5>
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
                    <FormItem />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="flex gap-4 rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
              <button
                type="button"
                className="btn btn-secondary w-full"
              >
                CANCEL
              </button>
              <button
                type="button"
                className="btn btn-primary w-full"
              >
                SAVE
              </button>
            </div>

          </div>
        </div>
      </div>
    </Modal>
  )
}



function FormItem() {
  const [initialState, setInitialState] = useState(initialValues);

  const validationSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(3, 'First Name must be between 3 and 30 characters.')
      .max(30, 'First Name must be between 3 and 30 characters.')
      .required('First Name Required'),
    last_name: Yup.string()
      .min(3, 'Last Name must be between 3 and 30 characters.')
      .max(30, 'Last Name must be between 3 and 30 characters.')
      .required('Last Name Required'),
    email: Yup.string()
      .min(3, 'last_name must be between 3 and 30 characters.')
      .max(30, 'last_name must be between 3 and 30 characters.')
      .required('Email Required'),
  });

  const onSubmit = async (values, helpers) => {
  };

  return (
    <>
     <Formik
      initialValues={initialState}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <h3 className="mb-2"><b>Patient details</b></h3>
            <div className="mb-5">
              <div className="grid grid-cols-1 gap-2">
                <label for="phoneNumber" class="form-label">Phone Number</label>
                <div className="form-phone">
                  <FormikForm.Select label="" name="mobile_prefix" options={countryOptions} />
                  <FormikForm.Input label="" name="mobile_phone" />
                </div>

                <div className='form-control'>
                  <FormikForm.Input label="Name" name="name" type="text" />
                </div>

                <div class=" mr-4 flex min-h-[1.5rem] mb-3">
                  <FormikForm.CheckBox label="Create a new family member" name="singlecheck" checked />
                </div>

                <div className="p-5 rounded-md shadow-sm mb-4" style={{ background: '#009EE010' }}>
                  <div className="flex items-center gap-5 justify-between mb-2" style={{ fontSize: '12px' }}>
                    <div>Shrinivas Sharma</div>
                    <div>Father</div>
                  </div>
                  <div className="flex items-center gap-5 justify-between" style={{ fontSize: '12px' }}>
                    <div>Shrinivas Sharma</div>
                    <div>Daughter</div>
                  </div>
                </div>
                <label for="phoneNumber" class="form-label">Phone Number</label>
                <div className="form-phone">
                  <FormikForm.Select label="" name="mobile_prefix" options={countryOptions} />
                  <FormikForm.Input label="" name="mobile_phone" />
                </div>

                <div className='form-control'>
                  <FormikForm.Input label="First Name" name="First Name" type="text" />
                </div>

                <div className='form-control'>
                  <FormikForm.Input label="Last Name" name="Last Name" type="text" />
                </div>

                <div className='form-control'>
                  <FormikForm.Select label="Relationship" name="Relationship" options={relationship} />
                </div>

                <div className='form-control'>
                  <FormikForm.Input label="Aadhar Card Number" name="Aadhar Card Number" type="text" />
                </div>

                <div className='form-control'>
                  <FormikForm.Input label="UHID Number" name="UHID Number" type="text" />
                </div>

                <div className='form-control'>
                  <FormikForm.DatePicker label="Birth Date " name="Birth Date" placeholder="DD/MMM/YYYY" />
                </div>

              </div>
            </div>
          </form>
        );
      }}
    </Formik>
    </>
  )
}



export default SetExistingAppointment
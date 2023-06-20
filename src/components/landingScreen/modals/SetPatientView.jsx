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


const SetPatentView = ({ open, setOpen }) => {
  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="fixed inset-0 z-1000 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-0 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="">
                <div
                  className="modal-header -m-6 mb-5 flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                  <h5
                    className="text-xl font-medium leading-normal text-neutral-800"
                    id="exampleModalLabel">Appoitment Details</h5>
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
                <div className="">
                  <div className="modal-body">
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
                onClick={() => setOpen(false)}>
                CANCEL
              </button>
              <button
                type="button"
                className="btn btn-primary w-full"
                onClick={() => setOpen(false)}>
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
    console.log(values, helpers, "onSubmit");
  };

  const location = [
    {
      "label": "Mumbai",
      "value": "Mumbai"
    },
    {
      "label": "Gujrat",
      "value": "Gujrat"
    }
  ]
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
              <h3 className="mb-2"><b>Patient Details</b></h3>
              <div className="bg-white rounded-xl mb-5 p-4 shadow-lg">
                <div className="flex gap-5 items-center">
                  <div className="rounded-full"><img src="./images/profile1.png" alt="Picture1" /></div>
                  <div>
                    <b><span>Rajat Sharma</span> | <span>Male</span> | <span>36 Y</span></b><br />
                    <small><span>AC570001</span> | <span>Purpose: Consultation</span></small>
                  </div>
                </div>
              </div>
              <h3 className="mb-2"><b>Appointment Details</b></h3>
              <div className="mb-5">
                <div className="grid grid-cols-2 gap-2">

                  <div className='form-control col-span-2'>
                    <FormikForm.DatePicker label="Date " name="Date" placeholder="DD/MMM/YYYY" />
                  </div>

                  <div className='form-control'>
                    <FormikForm.DatePicker label="From " name="From" placeholder="DD/MMM/YYYY" showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="h:mm aa" />
                  </div>

                  <div className='form-control'>
                    <FormikForm.DatePicker label="To " name="To" placeholder="DD/MMM/YYYY" showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="h:mm aa" />
                  </div>

                  <div className='form-control col-span-2 '>
                    <FormikForm.Select label="Clinic Location" name="Clinic_Location" options={location} />
                  </div>

                  <div className='form-control col-span-2 mb-3'>
                    <label for="password" className="form-label">Reason</label>
                    <div className="bg-white rounded-lg p-3 shadow-md">
                      <small>Visi | Visi | Visi | Visi</small>
                    </div>
                  </div>

                  <div className='form-control col-span-2 mt-3'>
                    <label for="password" className="form-label">Appointment Type</label>
                    <div className="flex gap-5">
                      <div className="appoinment-btn selected">
                        <div className="icon"><i class="ri-home-4-line text-lg"></i></div>
                        <div>Home</div>
                      </div>
                      <div className="appoinment-btn">
                        <div className="icon"><i class="ri-video-add-line text-lg"></i></div>
                        <div>Video</div>
                      </div>
                      <div className="appoinment-btn">
                        <div className="icon"><i class="ri-video-add-line text-lg"></i></div>
                        <div>Clinic</div>
                      </div>
                    </div>
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

export default SetPatentView
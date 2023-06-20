"use client";

import React, { useState } from 'react';

// EXTERNAL LIBRARIES
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

// COMPONENTS
import Modal from '@/components/shared/Modal';
import FormikForm from '@/components/shared/FormikForm';

// UTILS
import { CURRENT_USER, getCookie } from '@/utils/Helpers';
import ApiCall from '@/utils/Apicall';
import Constants from '@/utils/Constants';

export const initialValues = {
  systolic: '',
  diastolic: '',
  cardiac_frequency: '',
  temperature: '',
  respiratory_rate: '',
  pain: '',
  weight: '',
  height: '',
  bmi: ''
}

const SetVitals = ({ open, setOpen, data, saveCallback }) => {

  const [initialState, setInitialState] = useState(initialValues);
  const user = CURRENT_USER();

  const validationSchema = Yup.object().shape({
    systolic: Yup.string().required('Required'),
    diastolic: Yup.string().required('Required'),
    cardiac_frequency: Yup.string().required('Required'),
    temperature: Yup.string().required('Required'),
    respiratory_rate: Yup.string().required('Required'),
    pain: Yup.string().required('Required'),
    weight: Yup.string().required('Required'),
    height: Yup.string().required('Required'),
    bmi: Yup.string().required('Required')
  });

  const onSubmit = async (values, helpers) => {
    if (!user) return toast.error("Session Expired Loging Again")
    if (data.id) {
      let body = {
        ...values,
        appointment_id: data.id,
        medic_id: getCookie('medic_id'),
        patient_id: data.patientid,
        creator_id: user.user_id,
        creator_type: user.user_type,
      }

      const res = await ApiCall({
        url: Constants.API_ENDPOINTS.CREATE_VITALS,
        method: "POST",
        body
      })

      if (res.status) {
        toast.success("Vitals added successfully.");
        saveCallback();
      } else {
        toast.error("Technical issue please try again after sometime")
      }
    } else {
      toast.error("Technical issue please try again after sometime")
    }
    setOpen(false);
  };


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
                    id="exampleModalLabel">Patient Biometrics and Vitals</h5>
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
                  <Formik
                    initialValues={initialState}
                    validationSchema={validationSchema}
                    enableReinitialize
                    onSubmit={onSubmit}
                  >
                    {({ handleSubmit }) => {
                      return (
                        <form onSubmit={handleSubmit}>
                          <div className="" >
                            <h3 className="mb-2"><b>Patient Biometrics</b></h3>
                            <div className="bx-1 mb-5">
                              <div className="grid grid-cols-3 gap-2">
                                <div className='form-control'>
                                  <FormikForm.Input label="Weight" name="weight" placeholder="Enter your Weight" />
                                </div>
                                <div className='form-control'>
                                  <FormikForm.Input label="Height" name="height" placeholder="Enter your Height" />
                                </div>
                                <div className='form-control'>
                                  <FormikForm.Input label="BMI" name="bmi" placeholder="Enter your BMI" />
                                </div>
                              </div>
                            </div>

                            <h3 className="mb-2"><b>Patient Vitals</b></h3>
                            <div className="bx-1 mb-5">
                              <div className="grid grid-cols-3 gap-2">
                                <div className='form-control'>
                                  <FormikForm.Input label="Systolic" name="systolic" placeholder="Enter your Systolic" />
                                </div>
                                <div className='form-control'>
                                  <FormikForm.Input label="Diastolic" name="diastolic" placeholder="Enter your Diastolic" />
                                </div>
                                <div className='form-control'>
                                  <FormikForm.Input label="Heart rate" name="cardiac_frequency" placeholder="Enter your Heart rate" />
                                </div>
                                <div className='form-control'>
                                  <FormikForm.Input label="Temperature" name="temperature" placeholder="Enter your Temperature" />
                                </div>
                                <div className='form-control'>
                                  <FormikForm.Input label="Respiratory Rate" name="respiratory_rate" placeholder="Enter your Respiratory Rate" />
                                </div>
                                <div className='form-control'>
                                  <FormikForm.Input label="Pain Scale" name="pain" placeholder="Enter your Pain Scale" />
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
                              type="submit"
                              className="btn btn-primary w-full">
                              SAVE
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
    </Modal>
  )
}

export default SetVitals
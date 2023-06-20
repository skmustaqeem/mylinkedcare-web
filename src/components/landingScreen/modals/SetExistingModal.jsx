"use client";
import React, { useState } from 'react';
import Modal from '@/components/shared/Modal';
import SetExistingAppointment from "./SetExistingAppointment";
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormikForm from '@/components/shared/FormikForm';
import ApiCall from '@/utils/Apicall';
import Constants from '@/utils/Constants';
import AddAppointment from './AddAppointment';
import { toast } from 'react-toastify';

export const initialValues = {
  mobile_phone: '',
  mobile_prefix: {
    "label": "+91",
    "value": "91"
  },
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
const SetExistingModal = ({ open, setOpen }) => {
  const [existingAppointment, setExistingAppointment] = useState(false);
  const [pateintsList, setpateintsList] = useState([])
  const [selectedPateient, setSelectedPateient] = useState({})

  const addExisting = () => {
    if(selectedPateient.id){
      setExistingAppointment(true)
      setpateintsList([])
    }else{
      toast.error("Please select patient")
    }
    // alert("")
  }

  const [initialState, setInitialState] = useState(initialValues);

  const validationSchema = Yup.object().shape({
    mobile_phone: Yup.string().required('Mobile Phone Required'),
    mobile_prefix: Yup.object().nullable().required('Please select an option'),
  });

  const onSubmit = async (values, helpers) => {
    const res = await ApiCall({ url: Constants.API_ENDPOINTS.GET_PATIENT, body: { ...values, mobile_prefix: values.mobile_prefix.value },method: 'POST'})
    if(res.data.length > 0){
      setpateintsList(res.data)
    }
    else{
      setpateintsList([])
    }
  };

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
                      id="exampleModalLabel">Patient Details </h5>
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
                        initialValues={initialState}
                        validationSchema={validationSchema}
                        enableReinitialize
                        onSubmit={onSubmit}
                      >
                        {({ handleSubmit }) => {
                          return (
                            <form onSubmit={handleSubmit}>
                              <h3 className="mb-2"><b>Existing Patient Details</b></h3>
                              <div className="mb-5">
                                <div className="grid grid-cols-1 gap-2">
                                  <label for="phoneNumber" class="form-label">Phone Number</label>
                                  <div className="form-phone mb-4">
                                    <FormikForm.Select  name="mobile_prefix" options={countryOptions} isDisabled/>
                                    <div className='relative'>
                                    <FormikForm.Input name="mobile_phone" />
                                    <div className='absolute shadow-md w-full p-1'>
                                        {pateintsList.length != 0 && pateintsList.map((curr) => {
                                          return (
                                            <p className='text-sm font-extrabold text-gray-700 mb-2 hover:bg-slate-300 cursor-pointer' onClick={() => setSelectedPateient(curr)}>{curr.first_name} {curr.last_name}</p>
                                          )
                                        })}
                                    </div>
                                    </div>
                                    <button type='submit' className="btn btn-primary">Search</button>
                                  </div>
                                  <div className='form-control'>
                                    <label>Name</label>
                                    <div className="p-5 rounded-md shadow-sm mb-4">
                                      <div className="flex items-center gap-5 justify-between mb-2" style={{ fontSize: '12px' }}>
                                        {selectedPateient && <p className='text-sm font-extrabold text-gray-700'>{selectedPateient.first_name} {selectedPateient.last_name}</p>
                                       }
                                      </div>
                                    </div>
                                  </div>
                                  <div class=" mr-4 flex min-h-[1.5rem] mb-3">
                                    <FormikForm.CheckBox label="Create a new family member" name="singlecheck"/>
                                  </div>
                                </div>
                              </div>
                            </form>
                          );
                        }}
                      </Formik>
                    </div>
                  </div>
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
                  type="button"
                  className="btn btn-primary w-full"
                  onClick={() => addExisting()}
                >
                  NEXT
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      {existingAppointment  && <AddAppointment open={existingAppointment} setOpen={setExistingAppointment} patient={selectedPateient} />}
    </>
  )
}

export default SetExistingModal
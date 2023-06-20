import React, { useEffect, useState } from "react";
import Modal from '@/components/shared/Modal';
import SetExistingModal from "./SetExistingModal";
import AddPatient from "./AddPatient";

const SetAppointments = ({ open, setOpen }) => {

  const [existingModal, setExistingModal] = useState(false);
  const [addPatient, setAddPatient] = useState(false);

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
                      id="exampleModalLabel">Set Appointment</h5>
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
                    <div className="modal-body relative overflow-y-auto m-5 mb-0 text-center" data-te-modal-body-ref>
                      <h3 style={{ fontSize: '18px' }}>Are you a new patient or existing patient?</h3>
                    </div>

                  </div>
                </div>
              </div>
              <div
                className="flex gap-4 rounded-b-md border-t-0 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                <button
                  type="button"
                  className="btn btn-secondary w-full" onClick={() => setExistingModal(true)}>EXISTING</button>
                <button
                  type="button" className='btn btn-secondary w-full' onClick={() => setAddPatient(true)}>NEW</button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <SetExistingModal open={existingModal} setOpen={setExistingModal} />
      <AddPatient open={addPatient} setOpen={setAddPatient}/>
    </>
  )
}


export default SetAppointments
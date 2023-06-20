"use client";
import Modal from '@/components/shared/Modal';
import Constants from '@/utils/Constants';
import moment from 'moment';

const SetViewAvailibility = ({ open, setOpen, setAddAvailibility, editAvailibilityData, setEditAvailibilityData }) => {

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
                    id="exampleModalLabel">Availibility</h5>
                  <button
                    type="button"
                    className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                    onClick={() => { setOpen(false); setEditAvailibilityData(null); }}
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
                    <h3 className="mb-2">
                      <b>Availibility Details</b>
                    </h3>

                    <table width={"100%"}>
                      <tbody>
                        <tr>
                          <td className='font-bold w-[200px]'>Clinic:</td>
                          <td className=''>{editAvailibilityData?.clinic_name}</td>
                        </tr>
                        <tr>
                          <td className='font-bold w-[200px]'>Description:</td>
                          <td className=''>{editAvailibilityData?.title}</td>
                        </tr>
                        <tr>
                          <td className='font-bold w-[200px]'>Specialities:</td>
                          <td className=''>{editAvailibilityData?.specialities.map(spec => (<p>{spec}</p>))}</td>
                        </tr>
                      </tbody>
                    </table>

                    <h3 className="mb-2">
                      <b>Repitition</b>
                    </h3>

                    <table width={"100%"}>
                      <tbody>
                        <tr>
                          <td className='font-bold w-[200px]'>Repetition Start:</td>
                          <td className=''>{moment(editAvailibilityData?.start).format("DD-MM-yyyy") || '-'}</td>
                        </tr>
                        <tr>
                          <td className='font-bold w-[200px]'>Repetition End:</td>
                          <td className=''>{moment(editAvailibilityData?.end_repeat_date).format("DD-MM-yyyy") || '-'}</td>
                        </tr>
                        <tr>
                          <td className='font-bold w-[200px]'>Repeats:</td>
                          <td className=''>{editAvailibilityData?.weekdays.map(id => (<span>{Constants.WEEKDAYS_CONSTANTS[id.toString()]} </span>))}</td>
                        </tr>
                      </tbody>
                    </table>

                  </div>
                </div>
              </div>
            </div>
            <div
              className="flex gap-4 rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
              <button
                type="button"
                className="btn btn-secondary w-full"
                onClick={() => { setOpen(false); setEditAvailibilityData(null); }}
              >
                CLOSE
              </button>
              <button
                type="button"
                className="btn btn-primary w-full"
                onClick={() => { setAddAvailibility(true); setOpen(false); }}
              >
                EDIT
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default SetViewAvailibility
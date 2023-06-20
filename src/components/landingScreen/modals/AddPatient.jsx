import FormikForm from "@/components/shared/FormikForm";
import Modal from "@/components/shared/Modal"
import ApiCall from "@/utils/Apicall";
import Constants from "@/utils/Constants";
import { Formik } from "formik";
import { useState } from "react"
import * as Yup from 'yup';
import AddAppointment from "./AddAppointment";

const countryOptions = [{
    "label": "+91",
    "value": "91"
}]

export const initialValues = {
    first_name: '',
    last_name: '',
    mobile_phone: '',
    mobile_prefix: '',
    UHID_number: '',
    gender: '',
}
const gender = [
    { value: 'M', label: 'Male', },
    { value: 'F', label: 'Female', },
    { value: 'O', label: 'Other', }
]

const AddPatient = ({ open, setOpen }) => {
    const [patient, setPatient] = useState({})
    const [openAppointment, setOpenAppointment] = useState(false)
    const validationSchema = Yup.object().shape({
        first_name: Yup.string()
            .min(3, 'First Name must be between 3 and 30 characters.')
            .max(30, 'First Name must be between 3 and 30 characters.')
            .required('First Name Required'),
        last_name: Yup.string()
            .min(3, 'Last Name must be between 3 and 30 characters.')
            .max(30, 'Last Name must be between 3 and 30 characters.')
            .required('Last Name Required'),
        mobile_phone: Yup.string().required('Mobile Phone Required'),
        mobile_prefix: Yup.object().nullable().required('Please select an option'),
        UHID_number: Yup.string().required('UHID_number Required'),
        gender: Yup.string().required('gender Required'),
    });
    const onSubmit = async (values, helpers) => {
        const payload = { ...values, mobile_prefix: values.mobile_prefix.value }
        const res = await ApiCall({ url: Constants.API_ENDPOINTS.ADD_QUICK_PATIENT, body: payload,method: 'POST'})
        if (res.status){
            setPatient(res)
            setOpenAppointment(true)
        }else{
            helpers.setFieldError("mobile_phone", res.errormessage)
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
                                            id="exampleModalLabel">Add New Patient</h5>
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
                                                            <h3 className="mb-2"><b>Patient details</b></h3>
                                                            <div className="mb-5">
                                                                <div className="grid grid-cols-1 gap-2">
                                                                    <FormikForm.Input label="First Name" name="first_name" type="text" />

                                                                    <FormikForm.Input label="Last Name" name="last_name" type="text" />
                                                                    <label for="phoneNumber" class="form-label">Phone Number</label>
                                                                    <div className="form-phone">
                                                                        <FormikForm.Select name="mobile_prefix" options={countryOptions} />
                                                                        <FormikForm.Input   name="mobile_phone" />
                                                                    </div>
                                                                    <FormikForm.Input label="UHID Number" name="UHID_number" type="text" />
                                                                    <FormikForm.RadioGroup label="Gender" name="gender" options={gender} />
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
                </div>
            </Modal>
            {openAppointment  && <AddAppointment open={openAppointment} setOpen={setOpenAppointment} patient={patient} newAppointement={true}/> }
        </>
    )
}

export default AddPatient
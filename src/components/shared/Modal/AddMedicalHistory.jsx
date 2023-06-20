import FormikForm from "@/components/shared/FormikForm";
import Modal from "@/components/shared/Modal"
import ApiCall from "@/utils/Apicall";
import Constants from "@/utils/Constants";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from 'yup';


const AddMedicalHistory = ({ open, setOpen ,id}) => {
    const [pathologyCode, setPathologyCode] = useState([])
    const [since, setSince] = useState([])
    useEffect(() => {
        getPathologyCode()
        getSinceCode()
    }, [])
    
    const validationSchema = Yup.object().shape({
        pathology_code: Yup.object().nullable().required('Please select an option'),
        since: Yup.object().nullable().required('Please select an option'),
        notes: Yup.string().required('notes required'),
    });
    const initialValues = {
        pathology_code: "", since: "", notes: "",
    }

    const onSubmit = async (values) => {
        const payload = { ...values, patient_id: id }
        const res = await ApiCall({ url: Constants.API_ENDPOINTS.ADD_MEDICAL_HISTORY, body: payload, method: 'POST' })
        if (res.status) {
            toast.success("Medical History Added Successfully")
            setOpen(false)
        }
    };

    const getPathologyCode = async () => {
        try {
            const res = await ApiCall({ url: Constants.API_ENDPOINTS.GET_PATHOLOGY_CODE })
            if (res?.pathologyCode){
                setPathologyCode(res?.pathologyCode.map((curr) => {return {value:curr.code,label:curr.name}}))
            }
        } catch (error) {
            
        }
    }
    const getSinceCode = async () => {
        try {
            const res = await ApiCall({ url: Constants.API_ENDPOINTS.GET_SINCE_CODE })
            if (res?.allergysince) {
                setSince(res?.allergysince.map((curr) => { return { value: curr.code, label: curr.name } }))
            }
        } catch (error) {

        }
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
                                            id="exampleModalLabel">Add Medical History</h5>
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
                                                                    <FormikForm.Select label="Pathology Code" name="pathology_code" options={pathologyCode} />
                                                                    <FormikForm.Select label="Since" name="since" options={since} />
                                                                    <FormikForm.Input label="Notes" name="notes" type="text" />
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

export default AddMedicalHistory
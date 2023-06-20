import { useEffect, useState } from "react";
import Modal from "@/components/shared/Modal"
import * as Yup from 'yup';
import { Formik } from "formik";
import FormikForm from "@/components/shared/FormikForm";
import { getCookie, concateDateTime, replaceDoubleBraces, CURRENT_USER } from "@/utils/Helpers"
import ApiCall from "@/utils/Apicall";
import Constants from "@/utils/Constants";
import moment from "moment";
import { toast } from "react-toastify";

export const initialValues = {
    end_date: '',
    start_date: '',
    date: '',
    location_id: '',
    reason: '',
    appointment_type_id: '',
}

const validationSchema = Yup.object().shape({
    date: Yup.date().required('Date Required'),
    end_date: Yup.date().required('Required'),
    start_date: Yup.date().required('Required'),
    location_id: Yup.object().nullable().required('Required'),
    reason: Yup.object().nullable().required('Required'),
    appointment_type_id: Yup.object().nullable().required('Required'),
});

const AddAppointment = ({ open, setOpen, patient, newAppointement = false, saveCallback }) => {

    const [initialState, setInitialState] = useState(initialValues);
    const [location, setLocation] = useState([])
    const [resaon, setResaon] = useState([])
    const [patientInfo, setPatientInfo] = useState({})
    const [appoinntmentType, setappoinntmentType] = useState([])
    useEffect(() => {
        getLocation()
        getReason()
        getAppointmentType()
        getPateintInfo(patient.id);
    }, [])

    useEffect(() => {
        if (patient) {
            setInitialState({
                ...initialState,
                start_date: new Date(patient.date + ' ' + patient.starttime),
                end_date: new Date(patient.date + ' ' + patient.endtime),
                date: new Date(patient.date),
                location_id: location.find(loc => loc.value == patient.locationid),
                reason: resaon.find(res => res.value == patient.reason_code),
                appointment_type_id: appoinntmentType.find(app => app.label == patient.appointmenttype),
            })
        }
    }, [location, patient, appoinntmentType, resaon])

    const getLocation = async () => {
        const medic_id = getCookie("medic_id")
        const res = await ApiCall({ url: replaceDoubleBraces(Constants.API_ENDPOINTS.GET_LOCATION_BY_MEDICID, { medic_id }) })
        if (res.locations) {
            const locations = res.locations.servingLocations.map((curr) => { return { label: curr.location_name, value: curr.id } })
            setLocation(locations)
        }
    }
    const getPateintInfo = async (patient_id) => {
        const res = await ApiCall({
            url: Constants.API_ENDPOINTS.PATIENT_SUMMARY, body: { patient_id }, method: 'POST'
        })
        if (res.patient_id) {
            setPatientInfo(res);
        }
    }
    const getReason = async () => {
        const res = await ApiCall({ url: Constants.API_ENDPOINTS.GET_REASON })
        if (res.reasons) {
            const reason = res.reasons.map((curr) => { return { label: curr.name, value: curr.code } })
            setResaon(reason)
        }
    }
    const getAppointmentType = async () => {
        const res = await ApiCall({ url: Constants.API_ENDPOINTS.GET_APPOINTMENT_TYPE })
        if (res.appointmenttype) {
            const reason = res.appointmenttype.map((curr) => { return { label: curr.name, value: curr.id } })
            setappoinntmentType(reason)
        }
    }

    const onSubmit = async (values, helpers) => {

        const medic_id = getCookie("medic_id");
        const medic_name = getCookie("medic_name");
        const user = CURRENT_USER();
        if (!medic_id) return toast.error("Session Expired Loging Again")
        if (!user) return toast.error("Session Expired Loging Again")
        const body = {
            start_date: concateDateTime(values.date, values.start_date),
            end_date: concateDateTime(values.date, values.end_date),
            appointment_type_id: values.appointment_type_id.value,
            location_id: values.location_id.value,
            reason: values.reason.value,
            patient_mobile_phone: patient.mobile,
            patient_id: patient.id,
            is_first_appointment: newAppointement,
            medic_id: medic_id,
            medic_name: medic_name,
            creator_id: user.user_id,
            creator_type: user.user_type,
            appointment_id: patient.appointment_id ? patient.appointment_id : undefined
        }
        if (patient.appointment_id) {
            const res = await ApiCall({ url: Constants.API_ENDPOINTS.UPDATE_APPOINTMENT, body, method: 'PUT' })
            if (res.status) {
                setOpen(false);
                toast.success("Appointment updated successfully");
                saveCallback();
            }
        } else {
            const res = await ApiCall({ url: Constants.API_ENDPOINTS.CREATE_APPOINTMENT, body, method: 'POST' })
            if (res.status) {
                setOpen(false);
                toast.success("Appointment added successfully");
            }
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
                                            id="exampleModalLabel">Appointment Details</h5>
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
                                    <h3 className="mb-2"><b>Patient Details</b></h3>
                                    <div className="bg-white rounded-xl mb-5 p-4 shadow-lg">
                                        <div className="flex gap-5 items-center">
                                            <div className="rounded-full"><img src="./images/profile1.png" alt="Picture1" /></div>
                                            <div>
                                                <b><span>{patientInfo.first_name} {patientInfo.last_name}</span><span>  | {patientInfo.gender}</span> | <span>{patientInfo.age ? patientInfo.age + " Years" : ''}</span></b><br />
                                                <small><span>{patientInfo.patient_code}  {patientInfo.new_patient ? "| New Patient" : ""}</span><span span > Purpose: {patientInfo.purpose ? patientInfo.purpose : "-"} </span></small>
                                            </div>
                                        </div>
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
                                                            <h3 className="mb-2"><b>Appointment Details</b></h3>
                                                            <div className="mb-5">
                                                                <div className="grid grid-cols-1 gap-2">

                                                                    <FormikForm.DatePicker label="Date" name="date" dateFormat="dd/MM/yyyy" />

                                                                    <div className="grid grid-cols-2 gap-4">
                                                                        <FormikForm.DatePicker label="From" name="start_date" showTimeSelect
                                                                            showTimeSelectOnly
                                                                            timeIntervals={15}
                                                                            timeCaption="Time"
                                                                            dateFormat="hh:mm aa"
                                                                        />
                                                                        <FormikForm.DatePicker label="To" name="end_date" showTimeSelect
                                                                            showTimeSelectOnly
                                                                            timeIntervals={15}
                                                                            timeCaption="Time"
                                                                            dateFormat="hh:mm aa" />
                                                                    </div>
                                                                    <FormikForm.Select name="location_id" options={location} label="Clinic Location" />
                                                                    <FormikForm.Select name="reason" options={resaon} label="Reason" />
                                                                    <h3 className="mb-2"><b>Appointment Type</b></h3>
                                                                    <FormikForm.Select name="appointment_type_id" options={appoinntmentType} />
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

            </Modal >
        </>
    )
}

export default AddAppointment
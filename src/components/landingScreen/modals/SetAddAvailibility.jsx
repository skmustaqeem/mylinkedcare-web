"use client";
import React, { useState, useEffect } from 'react';
import Modal from '@/components/shared/Modal';
import Link from "next/link";
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormikForm from '@/components/shared/FormikForm';
import { concateDateTime, getCookie, replaceDoubleBraces } from '@/utils/Helpers';
import ApiCall from '@/utils/Apicall';
import Constants from '@/utils/Constants';
import { useLookupContext } from '@/contexts/lookupcontext';
import { toast } from 'react-toastify';
import moment from 'moment';

export const initialValues = {
  desc: "",
  location_id: '',
  start_date: "",
  end_date: "",
  to_repeat: false,
  weekday_ids: [],
  end_repeat_date: "",
  specialities: [],
  appointment_type_id: '',
  date: new Date()
}

const SetAddAvailibility = ({ open, setOpen, saveCallback, setEditAvailibilityData, editAvailibilityData }) => {

  const [initialState, setInitialState] = useState(initialValues);
  const [location, setLocation] = useState([]);
  const [appoinntmentType, setAppoinntmentType] = useState([]);
  const { specialities } = useLookupContext();

  useEffect(() => {
    getLocation();
    getAppointmentType();
  }, [])

  useEffect(() => {
    if (editAvailibilityData && editAvailibilityData.id) {
      setInitialState({
        ...initialState,
        desc: editAvailibilityData.title,
        location_id: location.find(loc => loc.value == editAvailibilityData?.location_id),
        start_date: new Date(editAvailibilityData.start),
        end_date: new Date(editAvailibilityData.end),
        to_repeat: editAvailibilityData?.to_repeat,
        weekday_ids: editAvailibilityData?.weekdays.map(a => a.toString()) || [],
        end_repeat_date: new Date(editAvailibilityData?.end_repeat_date),
        specialities: editAvailibilityData?.speciality_codes,
        appointment_type_id: (editAvailibilityData.has_video && appoinntmentType.find(item => item.value == 2))
          || (editAvailibilityData.has_home && appoinntmentType.find(item => item.value == 1))
          || (editAvailibilityData.has_clinic && appoinntmentType.find(item => item.value == 3)),
        date: new Date(editAvailibilityData.start)
      })
    }
  }, [editAvailibilityData, location, appoinntmentType])


  const getLocation = async () => {
    const medic_id = getCookie("medic_id")
    const res = await ApiCall({ url: replaceDoubleBraces(Constants.API_ENDPOINTS.GET_LOCATION_BY_MEDICID, { medic_id }) })
    if (res.locations) {
      const locations = res.locations.servingLocations.map((curr) => { return { label: curr.location_name, value: curr.id } })
      setLocation(locations)
    }
  }

  const getAppointmentType = async () => {
    const res = await ApiCall({ url: Constants.API_ENDPOINTS.GET_APPOINTMENT_TYPE })
    if (res.appointmenttype) {
      const appointmentTypes = res.appointmenttype.map((curr) => { return { label: curr.name, value: curr.id } })
      setAppoinntmentType(appointmentTypes)
    }
  }

  const validationSchema = Yup.object().shape({
    desc: Yup.string().required("Required"),
    end_date: Yup.date().required('Required'),
    start_date: Yup.date().required('Required'),
    location_id: Yup.object().nullable().required('Required'),
    appointment_type_id: Yup.object().nullable().required('Required'),
  });

  const onSubmit = async (values, helpers) => {
    const { desc, location_id, start_date, end_date, to_repeat, weekday_ids,
      end_repeat_date, specialities, appointment_type_id, date } = values;

    const body = {
      event_id: editAvailibilityData?.id || undefined,
      medic_id: getCookie("medic_id"),
      desc,
      location_id: location_id.value,
      to_repeat, weekday_ids,
      end_repeat_date, specialities,
      end_date: concateDateTime(date, end_date),
      start_date: concateDateTime(date, start_date),
      has_clinic: appointment_type_id.value == 3,
      has_video: appointment_type_id.value == 2,
      has_home: appointment_type_id.value == 1,
      creation_offset: editAvailibilityData?.id ? undefined : "5",
    }

    if (editAvailibilityData && editAvailibilityData.id) {
      const res = await ApiCall({
        url: Constants.API_ENDPOINTS.AVAILIBILITIES_UPDATE,
        method: "PATCH",
        body,
      })

      if (res.status) {
        toast.success("Availibility updated successfully");
        saveCallback();
        setOpen(false);
        setEditAvailibilityData(null);
      } else {
        toast.error("Please try again later");
      }

    } else {
      const res = await ApiCall({
        url: Constants.API_ENDPOINTS.AVAILIBILITIES_CREATE,
        method: "POST",
        body,
      })

      if (res.status) {
        toast.success("Availibility added successfully");
        saveCallback();
        setOpen(false);
      } else {
        toast.error("Please try again later");
      }
    }
  };

  const handleDeleteAvailibility = async () => {
    try {
      const res = await ApiCall({
        url: Constants.API_ENDPOINTS.AVAILIBILITIES_DELETE,
        method: "DELETE",
        body: { event_id: editAvailibilityData.id },
      })

      if (res.status) {
        toast.success("Availibility deleted successfully.");
        setEditAvailibilityData(null);
        setOpen(false);
      } else {
        toast.error("Please try again later.");
        setEditAvailibilityData(null);
        setOpen(false);
      }
    } catch (err) {
      toast.error("Please try again later.");
      console.log(err);
    }
  }


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
                    id="exampleModalLabel">{!!editAvailibilityData ? "Edit" : "Add"} Availability</h5>
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
                    <Formik
                      initialValues={initialState}
                      validationSchema={validationSchema}
                      enableReinitialize
                      onSubmit={onSubmit}
                    >
                      {({ handleSubmit }) => {
                        return (
                          <form onSubmit={handleSubmit}>
                            <h3 className="mb-2 flex justify-between items-center">
                              <b>Availibility Details</b>
                              {!!editAvailibilityData && <button type='button' className='btn btn-danger' onClick={handleDeleteAvailibility} >Delete</button>}
                            </h3>
                            <div className="mb-5">
                              <div className="grid grid-cols-1 gap-2">

                                <FormikForm.Input label="Description" name="desc" />
                                <FormikForm.Select name="location_id" options={location} label="Clinic Location" />

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
                                <FormikForm.CheckBox name="to_repeat" label="To repeat" />
                                <FormikForm.CheckboxGroup name="weekday_ids" options={Constants.WEEKDAYS} />
                                <FormikForm.DatePicker label="Ends at" name="end_repeat_date" dateFormat="dd/MM/yyyy" />

                                <FormikForm.Select label="Appointment Type" name="appointment_type_id" options={appoinntmentType} />
                                <FormikForm.CheckboxGroup label="Speciality" name="specialities" options={specialities} />
                              </div>
                            </div>
                            <div
                              className="flex gap-4 rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                              <button
                                type="button"
                                className="btn btn-secondary w-full"
                                onClick={() => { setOpen(false); setEditAvailibilityData(null); }}
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
  )
}

export default SetAddAvailibility
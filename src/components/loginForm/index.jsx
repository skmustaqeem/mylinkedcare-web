"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';

// EXTERNAL LIBRARIES
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';


// COMPONENTS
import FormikForm from '@/components/shared/FormikForm';
import Modal from '@/components/shared/Modal';

// UTILS
import ApiCall from '@/utils/Apicall';
import Constants from '@/utils/Constants';
import { setCookie } from '@/utils/Helpers';
import { useLookupContext } from "@/contexts/lookupcontext";

const initialValues = {
  "mobile_prefix": {
    "label": "+91",
    "value": "91"
  },
  "mobile_phone": "",
  "password": "",
  "user_type": ""
}

const countryOptions = [{
  "label": "+91",
  "value": "91"
}]

const LoginForm = () => {

  const [open, setOpen] = useState(false)
  const [initialState, setInitialstate] = useState(initialValues);
  const [doctorList, setdoctorList] = useState([])
  const [selectedDoctor, setselectedDoctor] = useState({})
  const [user, setUser] = useState({})
  const { specialities } = useLookupContext()
  const router = useRouter();
  const validationSchema = Yup.object().shape({
    mobile_prefix: Yup.object().nullable().required('Please select an option'),
    mobile_phone: Yup.string().required('Mobile Phone Required'),
    password: Yup.string().required('Password Required'),
  });

  const onSubmit = async (values, helpers) => {
 
    let body = {
      "mobile_prefix": '91' || values.mobile_prefix.value,
      "mobile_phone": values.mobile_phone,
      "password": values.password,
      "user_type": "doctor"
    };

    const response = await ApiCall({
      url: Constants.API_ENDPOINTS.LOGIN,
      body,
      method: "POST",
      withToken: false
    })
    if (response && response.authenticated) {
      if (response.user_type === "Assistant" || response.user_type === "Jr.Dr." || response.user_type === "Jr-Dr"){
        setdoctorList(response.Doctors)
        setUser(response)
        setOpen(true)
      }else{
        setCookie("medic_id", response.medic_id);
        setCookie("doctor_user_id", response.user_id)
        localStorage.setItem("USER", JSON.stringify(response));
        router.push('/landingScreen');
      }
    } else {
      console.log("LOGIN ERROR");
    }

  };

  const handleDocSelect = doc => setselectedDoctor(doc)
  const saveDoc = (canceled) =>{
    if (!canceled && selectedDoctor?.medic_id){
      setCookie("medic_id", selectedDoctor.medic_id)
      setCookie("medic_name", selectedDoctor.name)
      setCookie("doctor_user_id", selectedDoctor.user_id)
      localStorage.setItem("USER", JSON.stringify(user));
      router.push('/landingScreen');
    }else{
      setUser({})
      setdoctorList([])
      toast.error("Please Login again")
    }
    setOpen(false)
  }

  return (
    <>
      <section class="container-lg px-5 animate-fade">
        <div className="flex items-center w-full mt-6 m-auto md:w-96" >
          <div className='login-box w-full bx'>
            <img src='./images/logo-icon.png' className="m-auto" />
            <div className='title'>
              <h1>Welcome to linkedcare</h1>
              <span className="subtitle">Welcome back! Please enter your details</span>
            </div>
            <Formik
              initialValues={initialState}
              validationSchema={validationSchema}
              enableReinitialize
              onSubmit={onSubmit}
            >
              {({ handleSubmit }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <div className='form-control mb-3'>
                      <label for="phoneNumber" class="form-label">Phone Number</label>
                      <div className="form-phone">
                        <FormikForm.Select label="" name="mobile_prefix" options={countryOptions} isDisabled />
                        <FormikForm.Input label="" name="mobile_phone" />
                      </div>
                    </div>
                    <div className='form-control'>
                      <FormikForm.Input label="Password" name="password" type="password" />
                    </div>
                    <button type="submit" className="btn-primary btn w-full block mb-3 text-center">LOGIN</button>
                  </form>);
              }}
            </Formik>
            <div className="text-center">
              <Link href="/forgotPassword" className="block mb-3">Forgot Password?</Link>
              Don’t have an account? <Link href="/register" className="link-register">Register Now!</Link>
            </div>
          </div>
        </div>
      </section>
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
                      id="exampleModalLabel">
                      Select Doctor
                    </h5>
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
                    <h3 className="text-base font-semibold leading-6 text-gray-900">
                      Doctors
                    </h3>
                    <div className="mt-2">
                      {doctorList.map((curr) => {
                        return (
                          <div className={`addDoctorCard ${curr.medic_id === selectedDoctor.medic_id ? "selected" : ""}`} onClick={() => handleDocSelect(curr)}>
                            <div className="profile"><img src={curr.avatar} alt="Picture1" /></div>
                            <div>
                              <b className="name">{curr.name}</b>
                              <span>Speciality: {specialities.find((el) => el.value == curr.speciality )?.label}</span>
                            </div>
                            <div><i class="ri-checkbox-circle-fill absolute right-10"></i></div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="flex gap-4 rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                <button
                  type="button"
                  className="btn btn-secondary w-full"
                  onClick={() => saveDoc(true)}>
                  CANCEL
                </button>
                <button
                  type="button"
                  className="btn btn-primary w-full"
                  onClick={() => saveDoc(false)}>
                  SELECT
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}




export default LoginForm;
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

  const [initialState, setInitialstate] = useState(initialValues);
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
      "user_type": "patient"
    };

    const response = await ApiCall({
      url: Constants.API_ENDPOINTS.LOGIN,
      body,
      method: "POST",
      withToken: false
    })
    if (response && response.authenticated) {
      if (response.user_type === "Assistant" || response.user_type === "Jr.Dr." || response.user_type === "Jr-Dr"){
        setUser(response)
        setOpen(true)
      }else{
        setCookie("medic_id", response.medic_id);
        setCookie("doctor_user_id", response.user_id)
        localStorage.setItem("USER", JSON.stringify(response));
        router.push('/');
      }
    } else {
      console.log("LOGIN ERROR");
    }
  };
 
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
    </>
  )
}




export default LoginForm;
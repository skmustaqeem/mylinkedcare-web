"use client";

import React, { useRef, useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';

// EXTERNAL LIBRARIES
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

// COMPONENTS
import FormikForm from '@/components/shared/FormikForm';

// UTILS
import ApiCall from '@/utils/Apicall';
import Constants from '@/utils/Constants';
import classNames from 'classnames';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '@/utils/firebaseConfig';
import RegisterPatientForm from './RegisterPatientForm';

export const initialValues = {
  "mobile_prefix": {
    "label": "+91",
    "value": "91"
  },
  "mobile_phone": "",
  "otp": ""
}

const countryOptions = [{
  "label": "+91",
  "value": "91"
}]


function RegisterForm() {

  const [sendOtp, setSendOtp] = useState(false);
  const [numInputDisabled, setNumInputDisabled] = useState(false);
  const [varifyOtpFlag, setVarifyOtpFlag] = useState(false);
  const [registerForm, setRegisterForm] = useState(true);
  const formRef = useRef(null);

  const router = useRouter();

  const validationSchema = Yup.object().shape({
    mobile_phone: Yup.string().test('length', 'Mobile number must be exactly 10 characters', val => val.split(" ").join("").length === 10).required('Mobile Number Required'),
    otp: Yup.string().required("Otp Required")
  });

  const onSubmit = async (values) => {
    try {
      const confirmOtpRes = await window.confirmationResult.confirm(values.otp);
      if (confirmOtpRes && confirmOtpRes.user) { // success from firebase varification
        toast.success("Mobile number is verified");
        setRegisterForm(true);
      }
    } catch (err) {
      toast.error("Please enter valid otp");
      formRef.current.setFieldValue("otp", "");
      console.log(err);
    }
  };

  const handleUserExistsApi = async () => {
    try {

      const body = {
        "mobile_prefix": formRef.current.values.mobile_prefix.value,
        "mobile_phone": formRef.current.values.mobile_phone.split(" ").join(""),
        "category": "category"
      }

      const res = await ApiCall({
        url: Constants.API_ENDPOINTS.IS_USER_EXISTS,
        method: "POST",
        body,
        withToken: false
      })

      if (res && res.success && res?.user_id != null) { // if user exists in server
        toast.success("User Already Exists");
        router.push('/login');

      } else {
        setVarifyOtpFlag(true);

        let appVerify = new RecaptchaVerifier('send-otp-button', {
          'size': 'invisible',
          'callback': (response) => { },
        }, auth);

        let phoneNumber = '+' + formRef.current.values.mobile_prefix.value + formRef.current.values.mobile_phone;
        signInWithPhoneNumber(auth, phoneNumber, appVerify).then((result) => {
          window.confirmationResult = result;
          toast.success("Otp sended successfully");
        }).catch((err) => {
          setSendOtp(false);
          setNumInputDisabled(false);
          formRef.current.resetForm();
          toast.error("Mobile number is invalid");
        });
      }
    } catch (err) {
      setSendOtp(false);
      setNumInputDisabled(false);
      formRef.current.resetForm();
      toast.error("Technical error please try again after sometimess.");
      console.log(err);
    }
  }

  const handleSendOtp = () => {
    const { validateForm, setFieldError, setFieldTouched } = formRef.current;
    setFieldTouched("mobile_phone", true);
    validateForm().then(async (errors) => {
      if (errors?.mobile_phone === undefined) {
        setNumInputDisabled(true);
        setSendOtp(true);
        handleUserExistsApi();
      } else {
        setFieldError("mobile_phone", errors?.mobile_phone);
      }
    })
  }

  return (
    <>
      {!registerForm ? <section class="container-lg px-5 animate-fade">
        <div className="flex items-center w-full mt-6 m-auto md:w-96" >
          <div className='login-box w-full bx'>
            <img src='./images/logo-icon.png' className="m-auto" />
            <div className='title'>
              <h1>Register Your Account</h1>
              {/* <span className="subtitle">Welcome back! Please enter your details</span> */}
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              enableReinitialize
              onSubmit={onSubmit}
              innerRef={formRef}
            >
              {({ handleSubmit }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <div className='form-control'>
                      <div className='form-control mb-3'>
                        <label for="phoneNumber" class="form-label">Phone Number</label>
                        <div className="form-phone">
                          <FormikForm.Select label="" name="mobile_prefix" options={countryOptions} isDisabled />
                          <FormikForm.Input label="" name="mobile_phone" disabled={numInputDisabled} />
                        </div>
                      </div>
                    </div>
                    <div id='send-otp-button'></div>
                    {!sendOtp && <div className="text-right">
                      <button type='button' className="btn-primary btn w-28" onClick={handleSendOtp} >
                        Send OTP
                      </button>
                    </div>}
                    <div className='form-control'>
                      <label for="password" class="form-label">Enter Code</label>
                      <FormikForm.OtpInput name="otp" numberOfDigits={6} onChange={(val) => { if (val.length === 6) setSendOtp(true); }} />
                      <div className="m-5 ml-0">
                        If you didn’t receive the code? <a href="" onClick={handleSendOtp}><b>Resend</b></a>
                      </div>
                    </div>
                    <div className="mb-4 mt-4">
                      <button
                        type="submit"
                        className={classNames("btn w-full", { "btn-primary": varifyOtpFlag, "btn-disabled": !varifyOtpFlag })}
                        disabled={!varifyOtpFlag}
                      >
                        VARIFY
                      </button>
                    </div>
                  </form>);
              }}
            </Formik>
            <div className="text-center">
              {/* <Link href="/forgot-password" className="block mb-3">Forgot Password?</Link> */}
              Don’t have an account? <Link href="/login" className="link-register">Login Now!</Link>
            </div>
          </div>
        </div>
      </section>
        :
        <RegisterPatientForm
          mobile_phone={formRef?.current?.values?.mobile_phone}
          mobile_prefix={formRef?.current?.values?.mobile_prefix}
        />}
    </>
  )
}


export default RegisterForm;
"use client";
import React, { useRef, useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';

// EXTERNAL LIBRARIES
import { Formik } from 'formik';
import * as Yup from 'yup';
import Constants from '@/utils/Constants';
import { toast } from 'react-toastify';
import classNames from 'classnames';

// COMPONENTS
import FormikForm from '@/components/shared/FormikForm';

// UTILS
import ApiCall from '@/utils/Apicall';
import { auth } from '@/utils/firebaseConfig';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

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

function ForgotPasswordForm() {

  const formRef = useRef(null);
  const [sendOtp, setSendOtp] = useState(false);
  const [numInputDisabled, setNumInputDisabled] = useState(false);
  const [varifyOtpFlag, setVarifyOtpFlag] = useState(false);
  const [userData, setUserData] = useState(null);

  const router = useRouter();

  const validationSchema = Yup.object().shape({
    mobile_phone: Yup.string().test('length', 'Mobile number must be exactly 10 characters', val => val.split(" ").join("").length === 10).required('Mobile Number Required'),
    otp: Yup.string().required("Otp Required")
  });

  const onSubmit = async (values) => {
    try {
      const confirmOtpRes = await window.confirmationResult.confirm(values.otp);
      if (confirmOtpRes && confirmOtpRes.user) { // success from firebase varification
        const body = {
          user_id: userData.user_id
        }

        // tell server to the user is varified so link can send on email
        const res = await ApiCall({
          url: Constants.API_ENDPOINTS.OTP_VARIFY,
          body,
          method: "POST",
          withToken: false
        })

        if (res.success) {
          toast.success("Your reset password link is shared on your email");
          router.push("/login");
        } else {
          toast.error("Opps! please try again after sometimes");
          router.push("/login");
        }
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
        setUserData(res);
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

      } else {
        setSendOtp(false);
        setNumInputDisabled(false);
        formRef.current.resetForm();
        toast.error("User not exists");
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
    <div>
      <section class="container-lg px-5">
        <div className="flex items-center w-full mt-6 m-auto md:w-96" >
          <div className='login-box w-full bx'>
            <img src='./images/logo-icon.png' className="m-auto" />
            <div className='title'>
              <h1>Forgot Password?</h1>
              <span className="subtitle">We just need your registered phone number to send you password reset code</span>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
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
                    {!sendOtp && <div className="text-right">
                      <button type='button' id='send-otp-button' className="btn-primary btn w-28" onClick={handleSendOtp} >
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
              Don’t have an account? <Link href="/register" className="link-register">Register Now!</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ForgotPasswordForm;
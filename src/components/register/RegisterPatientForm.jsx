"use client";

import React, { useState, useRef } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';

// EXTERNAL LIBRARIES
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import classNames from 'classnames';

// COMPONENTS
import FormikForm from '@/components/shared/FormikForm';

// CONTEXTS
import { useLookupContext } from '@/contexts/lookupcontext';

// UTILS
import ApiCall from '@/utils/Apicall';
import Constants from '@/utils/Constants';
import { replaceDoubleBraces } from '@/utils/Helpers';

export const initialValues = {
  first_name: "",
  last_name: "",
  gender: "M",
  password: "",
  confirm_password: "",
  email: "",
  birthdate: new Date(),
  aadhar_number: "",
  UHID_number: "",
  address: "",
  state: "",
  city: "",
  pincode: "",
  terms_and_policies: false,
  landmark: "12",
}

const gender = [
  { value: 'M', label: 'Male', },
  { value: 'F', label: 'Female', },
  { value: 'O', label: 'Other', }
]

function RegisterPatientForm({ mobile_phone, mobile_prefix }) {

  const { states } = useLookupContext();

  const formRef = useRef(null);
  const router = useRouter();

  const [citiesForPersonal, setCitiesForPersonal] = useState([]);

  const validationSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(3, 'First Name must be between 3 and 30 characters')
      .max(30, 'First Name must be between 3 and 30 characters')
      .required('First Name Required'),
    last_name: Yup.string()
      .min(3, 'Last Name must be between 3 and 30 characters')
      .max(30, 'Last Name must be between 3 and 30 characters')
      .required('Last Name Required'),
    email: Yup.string().email("Please enter valid email").required('Email Required'),
    password: Yup.string()
      .min(8, 'Password is too short - should be 8 chars minimum')
      .max(100, 'Password is too long - should be 100 chars maximum')
      .required('No password provided'),
    confirm_password: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Password confirmation is required'),
    aadhar_number: Yup.string()
      .test('adhar_number_only_num', "Aadhar card only contains number not a latters", val => /^\d+$/.test(val.split(" ").join("")))
      .test('adhar_number_length', "Aadhar card must contain at least 12 characters", val => val.split(" ").join("").length === 12)
      .required("Please enter your aadhar card number"),
    UHID_number: Yup.string()
      .min(3, 'UHID Number must be between 3 and 30 characters')
      .max(30, 'UHID Number must be between 3 and 30 characters')
      .required('UHID Number Required'),
  });

  const handleStateChange = async (e) => {
    let cities = await getCitiesList(e.target.value);
    if (e.target.name === 'state') {
      setCitiesForPersonal(cities);
      formRef.current.setFieldValue('city', '');
    }
  }

  const getCitiesList = async (state_code) => {
    try {
      let cities = await ApiCall({
        url: replaceDoubleBraces(Constants.API_ENDPOINTS.CITIES_BY_CODE_LIST, { state_code }),
        method: "GET",
        withToken: false
      })

      if (Array.isArray(cities) && cities.length > 0) {
        return cities.map(city => ({ label: city.city_name, value: city.city_name }))
      } else
        return []
    } catch (err) {
      console.log(err)
    }
  }

  const onSubmit = async (values) => {

    const {
      terms_and_policies,
      first_name, last_name, email,
      password, pincode,
      address, state, city, gender, aadhar_number,
      UHID_number, landmark
    } = values;

    if (terms_and_policies) {

      try {
        const body = {
          type: "Patient",
          first_name, last_name, gender,
          password, email, birthdate, aadhar_number,
          mobile_phone, UHID_number,
          mobile_prefix: mobile_prefix.value,
          address, state: state.value, city: city.value, pincode,
          terms_and_policies, landmark
        }

        const res = await ApiCall({
          url: Constants.API_ENDPOINTS.REGISTER_PATIENT,
          method: "POST",
          body
        })

        if (res.status == 'true') {
          toast.success("Patient registered successfully.");
          router.push('/login');
        } else {
          toast.error(res.message);
        }
      } catch (err) {
        toast.error("Technical issue please try again after sometimes");
        console.log(err);
      }
    } else {
      toast.error("Please accept terms and conditions.")
    }
  };

  return (
    <div className='p-5'>
      <div className='bx'>
        <h2 className="form-sub-heading">Perosonal Details</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          innerRef={formRef}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, isSubmitting, values }) => {
            return (
              <form onSubmit={handleSubmit}>
                <div className="w-full grid-cols-1 gap-2 md:w-12/12 lg:w-7/12 grid md:grid-cols-2 md:gap-4">
                  <div className='form-control'>
                    <FormikForm.Input label="First Name" name="first_name" />
                  </div>
                  <div className='form-control'>
                    <FormikForm.Input label="Last Name" name="last_name" />
                  </div>
                  <div className='form-control'>
                    <FormikForm.RadioGroup label="Gender" name="gender" options={gender} />
                  </div>
                  <div className='form-control'>
                    <FormikForm.Input label="Email" name="email" />
                  </div>
                  <div className='form-control'>
                    <FormikForm.Input label="Password" name="password" type="password" />
                  </div>
                  <div className='form-control'>
                    <FormikForm.Input label="Confirm Password" type="password" name="confirm_password" />
                  </div>
                  <div className='form-control'>
                    <FormikForm.DatePicker label="Birthdate" name="birthdate" />
                  </div>
                  <div className='form-control'>
                    <FormikForm.Input label="Aadhar Card" name="aadhar_number" />
                  </div>
                  <div className='form-control'>
                    <FormikForm.Input label="UHID Number" name="UHID_number" />
                  </div>
                  <div className='form-control'>
                    <FormikForm.Input label="Address" name="address" />
                  </div>
                  <div className='form-control'>
                    <FormikForm.Select
                      label="State" name="state"
                      options={states}
                      onChange={handleStateChange}
                    />
                  </div>
                  <div className='form-control'>
                    <FormikForm.Select label="City" name="city" options={citiesForPersonal} />
                  </div>
                  <div className='form-control'>
                    <FormikForm.Input label="Pin Code" name="pincode" />
                  </div>

                  <div className='form-control'>
                    <FormikForm.Input label="Landmark" name="landmark" />
                  </div>
                </div>
                <br />

                <section className="mt-1">
                  <div className="flex mb-5">
                    <FormikForm.CheckBox label="" name="terms_and_policies" />
                    <label
                      className="inline-block hover:cursor-pointer"
                      for="terms_and_policies-id">
                      I read and accept the <a href="">Terms and Conditions</a> and <a href="">Privacy Policy</a>
                    </label>
                  </div>
                  <div className="flex gap-4 justify-between md:justify-normal">
                    <button
                      type="submit"
                      className={classNames("btn btn-primary w-6/12 md:w-1/6", { "btn-disabled": isSubmitting || !values.terms_and_policies })}
                      disabled={isSubmitting}
                    >
                      REGISTER
                    </button>
                  </div>

                  <div className="mt-5">
                    Already have an account ? <Link href="/login" >Login</Link>
                  </div>
                </section>
              </form>
            );
          }}
        </Formik>

      </div>


    </div>
  )
}


export default RegisterPatientForm; 
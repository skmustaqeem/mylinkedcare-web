import { Formik } from 'formik';
import React from 'react'
import FormikForm from '.';
import * as Yup from "yup"

const Search = ({ label, fetchData, setMedic }) => {
    const options = [
        { value: "Medic", label: "Medic" },
        { value: "Patient", label: "Patient" },
        { value: "OtherMedics", label: "OtherMedics" },
    ]
    const onSubmit = (e) => {
        setMedic(e.medic.value)
        fetchData(e.query, e.medic.value, 0)
    }
    const validation = Yup.object().shape({
        medic: Yup.object().nullable().required('Please select an option'),
    });
    return (
        <>
            <Formik
                initialValues={{ medic: { value: "Medic", label: "Medic" }, query: "" }}
                onSubmit={onSubmit}
                validationSchema={validation}
            >
                {({ handleSubmit }) => {
                    return (
                        <>
                            <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-6 items-end">
                                <FormikForm.Select name="medic" options={options} />
                                <FormikForm.Input
                                    label={label}
                                    name="query"
                                />
                                <div>
                                    <button type="submit" className="btn btn-primary mt-5">Search</button>
                                </div>
                            </form>
                        </>
                    );
                }}
            </Formik>
        </>
    )
}

export default Search
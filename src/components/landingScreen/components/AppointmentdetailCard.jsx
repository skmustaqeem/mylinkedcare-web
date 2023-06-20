import React, { useState } from 'react'
import SetVitals from '../modals/SetVitals';
import AddAppointment from '../modals/AddAppointment';

const AppointmentdetailCard = ({ data, handleActions }) => {

  return (
    <>
      <div className="p-4 calendar-dt mb-1">
        <div className="bg-white p-3 shadow-md rounded-lg">
          <div className="text-center mb-2"><b>{data?.clinicname || 'Clinic Name'}</b></div>
          <div className="flex gap-2 mb-3">
            <div><i className="ri-time-line font-bold"></i></div>
            <div>{data?.starttime} to {data?.endtime}</div>
          </div>
          <div className="flex gap-2 mb-3">
            <div><i className="ri-map-pin-2-line font-bold"></i></div>
            <div>{data?.location}</div>
          </div>
        </div>
        <div className="relative">
          <b className="mb-2 block">{data?.patient}</b>
          <div className="mb-1 block">Gender: {data?.gender}</div>
          <div className="mb-1 block">Age: {data?.age + ' years' || '-'} </div>
          <div className="mb-1 block">Mobile: {data?.mobileprefix ? `+${data?.mobileprefix}` : ""} {data?.mobile}</div>
          <div className="mb-1 block">
            <button
              type="button"
              className=""
              onClick={() => !data.has_vital && handleActions(true, data)} >
              <i className="ri-pulse-fill" style={{ fontSize: '24px', color: data.has_vital ? "#000" : "rgba(173,184,194,1)" }}></i>
            </button> </div>
          <button type="button" className="" onClick={() => handleActions(false, data)}>
            <i className="ri-arrow-right-circle-fill absolute right-0 -top-2" style={{ fontSize: '26px', color: '#009EE0' }}></i>
          </button>
        </div>
      </div>
    </>
  )
}

export default AppointmentdetailCard
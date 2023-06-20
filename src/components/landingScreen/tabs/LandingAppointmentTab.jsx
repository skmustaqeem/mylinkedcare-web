import React, { useEffect, useState } from 'react';

// EXTERNAL LIBRARIES
import _ from 'lodash';
import moment from 'moment';
import { Formik } from 'formik';
import classNames from 'classnames';

// COMPONENTS
import PageTitle from '@/components/shared/PageTitle';
import FormikForm from '@/components/shared/FormikForm';
import AppointmentdetailCard from '../components/AppointmentdetailCard';
import SetVitals from '../modals/SetVitals';
import AddAppointment from '../modals/AddAppointment';

// UTILS
import ApiCall from '@/utils/Apicall';
import Constants from '@/utils/Constants';
import { getCookie, replaceDoubleBraces } from '@/utils/Helpers';
import SetAppointments from '../modals/SetAppointments';

const LandingAppointmentTab = ({ data, fetchAppointmentData }) => {

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointmentData, setAppointmentData] = useState(data);
  const [vitalModal, setVitalModal] = useState(false);
  const [patientViewModal, setPatientViewModal] = useState(false);
  const [initialState, setInitialState] = useState({ location: '' });
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedTab, setSelectedTab] = useState("upcoming");

  const [appointmentConfModal, setAppointmentConfModal] = useState(false);


  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const getLocation = async () => {
      const medic_id = getCookie("medic_id")
      const res = await ApiCall({ url: replaceDoubleBraces(Constants.API_ENDPOINTS.GET_LOCATION_BY_MEDICID, { medic_id }) })
      if (res && res.locations && res.locations && res.locations.servingLocations.length) {
        const locations = res.locations.servingLocations.map((curr) => { return { label: curr.location_name, value: curr.id } })
        setLocations(locations)
      }
    }
    getLocation();
  }, [])

  useEffect(() => {
    fetchAppointmentData(selectedLocation?.value, selectedTab);
  }, [selectedTab, selectedLocation])

  useEffect(() => {
    let finalData = { ...data };
    finalData._data = _.groupBy(finalData.Appointments, "date");
    finalData.todays = [];
    [...Object.keys(finalData._data), "06-08-2023"].forEach(date => {
      if (moment().isSame(date, 'day')) {
        finalData.todays = finalData._data[date]
        delete finalData._data[date]
      }
    })
    finalData.upcoming = finalData._data;
    delete finalData._data
    setAppointmentData(finalData);
  }, [data])

  const handleActions = (isVital, appData) => {
    setSelectedAppointment(appData);
    if (isVital) {
      setVitalModal(true);
      setPatientViewModal(false);
    } else {
      setPatientViewModal(true);
      setVitalModal(false);
    }
  }

  const handleChangeLocation = (e) => {
    setSelectedLocation(locations.find(loc => e.target.value == loc.value));
  }

  const handleLocalTabChange = (currTab) => {
    setSelectedTab(currTab);
  }

  return (
    <>
      <div className="appointment-count">
        <div>
          <b className="count">{appointmentData?.todayAppointments || 0}</b>
          <span>Today</span>
        </div>
        <div>
          <b className="count">{appointmentData?.totalAppointments || 0}</b>
          <span>Total</span>
        </div>
        <div>
          <b className="count">{appointmentData?.cancelledAppointments || 0}</b>
          <span>Cancelled</span>
        </div>

      </div>
      <section className="m-8 ml-0 mr-0">
        <PageTitle title="Appointments" />
        <div className="rounded-md shadow-md bg-white p-5 w-full mt-4">

          <div className="tab-wrap">
            <ul
              className="mb-0 flex list-none flex-row flex-wrap border-b-0 pl-0 custom-tab-1"
              role="tablist"
              data-te-nav-ref>
              <li role="presentation">
                <a
                  href="javascript:void(0)"
                  onClick={() => { handleLocalTabChange("upcoming") }}
                  className={classNames({ "active": selectedTab === "upcoming" })}
                >Upcoming</a>
              </li>
              <li role="presentation">
                <a
                  href="javascript:void(0)"
                  onClick={() => { handleLocalTabChange("cancelled") }}
                  className={classNames({ "active": selectedTab === "cancelled" })}
                >Cancelled</a>
              </li>

            </ul>
          </div>
          <div className="block opacity-100 transition-opacity duration-150 ease-linear">
            <div className="m-5 ml-0 mr-0">
              <Formik
                initialValues={initialState}
                enableReinitialize
              >
                {({ }) => {
                  return <FormikForm.Select name="location" onChange={handleChangeLocation} options={locations} placeholder={'Location address here...'} />
                }}
              </Formik>

              <div className="bg-white p-5 shadow-md rounded-lg mt-5 mb-5">
                Full Calendar
              </div>
              <div className="w-full mb-5">
                <div style={{ background: '#009EE005', width: '100px', fontSize: '16px' }} className="p-3 px-5 mb-1 rounded-lg text-center"><b>Today</b></div>
                {
                  appointmentData?.todays && appointmentData?.todays.length > 0 ?
                    (<>
                      <div><b>{moment().format("DD MMM yyyy")}</b></div>
                      <small className="mb-3 block">{moment().format("dddd")}</small>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {(appointmentData?.todays || []).map((appointment, ind) => (
                          <AppointmentdetailCard
                            data={appointment}
                            key={'appointment-today' + ind}
                            handleActions={handleActions}
                          />))}
                      </div>
                    </>) : <div>No Appointments for Today</div>
                }
              </div>
              <div className="w-full mb-5">
                <div style={{ background: '#009EE005', width: '100px', fontSize: '16px' }} className="p-3 px-5 mb-1 rounded-lg text-center"><b>Upcoming</b></div>
                {
                  appointmentData?.upcoming && Object?.keys(appointmentData?.upcoming).length ? Object.keys(appointmentData?.upcoming).map(date => {
                    return (
                      <div key={date}>
                        <div><b>{moment(date, "DD-MM-YYYY").format("DD MMM yyyy")}</b></div>
                        <small className="mb-3 block">{moment(date, "DD-MM-YYYY").format("dddd")}</small>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {appointmentData?.upcoming[date].map((appointment, ind) => (
                            <AppointmentdetailCard
                              data={appointment}
                              key={'appointment-' + date + ind}
                              handleActions={handleActions}
                            />))}
                        </div>
                      </div>
                    )
                  }) : <div>No Upcoming Appointments Available </div>
                }
              </div>
            </div>
          </div>
          {/* <div className="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
            id="tabs-Cancelled"
            role="tabpanel"
            aria-labelledby="tabs-Cancelled-tab"
            data-te-tab-active>
            Cancelled
          </div> */}
        </div>
      </section>


      <button
        type="button"
        className="btn btn-primary btn-sticky-appointment z-[999999]"
        onClick={() => setAppointmentConfModal(true)}><i className="ri-add-circle-fill"></i> Set Appointment</button>

      {appointmentConfModal && <SetAppointments open={appointmentConfModal} setOpen={setAppointmentConfModal} />}

      {selectedAppointment && !selectedAppointment.has_vital && vitalModal &&
        <SetVitals
          open={vitalModal}
          setOpen={setVitalModal}
          data={selectedAppointment}
          saveCallback={fetchAppointmentData}
        />}
      {patientViewModal && selectedAppointment &&
        <AddAppointment
          open={patientViewModal}
          setOpen={setPatientViewModal}
          patient={{ ...selectedAppointment, appointment_id: selectedAppointment.id, id: selectedAppointment.patientid }}
          saveCallback={fetchAppointmentData}
        />}
    </>
  )
}

export default LandingAppointmentTab
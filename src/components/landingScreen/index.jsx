"use client"

import React, { useEffect, useState } from "react";

// COMPONENTS
import { Tab } from '@headlessui/react';
import LandingAppointmentTab from "./tabs/LandingAppointmentTab";
import LandingAvailabilityTab from "./tabs/LandingAvailabilityTab";
import LandingCalenderTab from "./tabs/LandingCalenderTab";
import ApiCall from "@/utils/Apicall";
import Constants from "@/utils/Constants";
import _ from "lodash";
import { getCookie } from "@/utils/Helpers";
import moment from "moment";

function LandingScreen() {

  const [appointmentData, setAppointmentData] = useState();
  const [availibilitiesData, setAvailibilitiesData] = useState();

  useEffect(() => {
    fetchAppointmentData();
    fetchAvailibilitiesData();
  }, [])

  async function fetchAppointmentData(locationid = -1, appointment = "upcoming") {
    const body = {
      "medicid": getCookie("medic_id"),
      locationid, appointment
    }
    const res = await ApiCall({
      url: Constants.API_ENDPOINTS.GET_APPOINTMENTS,
      method: "POST",
      body
    })

    if (res) {
      setAppointmentData(res);
    }
  }

  async function fetchAvailibilitiesData(
    location_id = -1,
    range_startdate = moment().startOf('month').format('YYYY-MM-DD'),
    range_enddate = moment().endOf('month').format('YYYY-MM-DD')
  ) {
    const body = {
      "medicid": getCookie("medic_id"),
      range_startdate,
      range_enddate,
      location_id
    }
    const res = await ApiCall({
      url: Constants.API_ENDPOINTS.GET_AVAILIBILITIES,
      method: "POST",
      body
    })

    if (res && res.events) {
      setAvailibilitiesData(res.events.map(availibility => ({
        title: availibility.title,
        date: moment(availibility.start).format("YYYY-MM-DD"),
        _data: availibility
      })));
    }
  }

  return (
    <div>
      <Tab.Group>
        <Tab.List className="custom-tabs">
          <Tab className={({ selected }) => selected && "selected"}>Appointment</Tab>
          <Tab className={({ selected }) => selected && "selected"}>Availibility</Tab>
          <Tab className={({ selected }) => selected && "selected"}>Calender</Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <LandingAppointmentTab data={appointmentData} fetchAppointmentData={fetchAppointmentData} />
          </Tab.Panel>
          <Tab.Panel>
            <LandingAvailabilityTab data={availibilitiesData} fetchAvailibilitiesData={fetchAvailibilitiesData} />
          </Tab.Panel>
          <Tab.Panel>
            <LandingCalenderTab />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default LandingScreen;


"use client"

import React, { useState } from "react";
import NewAppointmentModal from "./modals/NewAppointmentModal";
import SelectDoctorModal from "./modals/SelectDoctorModal";

function LandingScreen() {

  const [newAppointment, setNewAppointment] = useState(false);
  const [selectDoctor, setSelectDoctor] = useState(false);

  return (
    <div>
      dashboard

      {newAppointment && <NewAppointmentModal open={newAppointment} setOpen={setNewAppointment} />}
      {selectDoctor && <SelectDoctorModal open={selectDoctor} setOpen={setSelectDoctor} />}
    </div>
  )
}

export default LandingScreen;


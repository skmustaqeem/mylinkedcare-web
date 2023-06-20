import React, { useState } from 'react'
import SetAddAvailibility from '../modals/SetAddAvailibility';
import SetViewAvailibility from '../modals/SetViewAvailibility';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction"
import moment from 'moment';
import { useRef } from 'react';
import { useEffect } from 'react';

const LandingAvailabilityTab = ({ data, fetchAvailibilitiesData }) => {

  const [addAvailibility, setAddAvailibility] = useState(false);
  const [viewAvailibility, setViewAvailibility] = useState(false);
  const [availibilities, setAvailibilities] = useState(data);
  const [editAvailibilityData, setEditAvailibilityData] = useState(null);

  const calendarRef = useRef(null);

  useEffect(() => {
    setAvailibilities(data);
  }, [data])

  const handleEvents = (events) => {
    // console.log(events)
  }

  const handleDateSelect = (selectInfo) => {
  }

  const handleEventClick = (eventClickInfo) => {
    setViewAvailibility(true);
    setEditAvailibilityData(eventClickInfo?.event?._def?.extendedProps?._data)
  }

  const handleDateClick = (arg) => {
    let calendarApi = arg.view.calendar
  }

  const handleNextAndPrevBtn = (info) => {
    const start = moment(info.startStr).format('YYYY-MM-DD');
    const end = moment(info.endStr).format('YYYY-MM-DD');
  }

  const renderEventContent = (info) => {
    const { extendedProps: { _data } } = info.event._def;
    const content = <div>
      <div>Title: {_data?.title || '-'}</div>
      <div>Start: {moment(_data?.start).format("DD-MM-YYYY hh:mm A") || '-'}</div>
      <div>End: {moment(_data?.end).format("DD-MM-YYYY hh:mm A") || '-'}</div>
    </div>
    return content
  }

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={availibilities}
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: ''
        }}
        selectable={false}
        editable={false}
        eventResizableFromStart={true}
        eventsSet={handleEvents}
        select={handleDateSelect}
        eventClick={handleEventClick}
        datesSet={handleNextAndPrevBtn}
        dateClick={handleDateClick}
        dayMaxEvents={true}
        eventMaxStack={2}
        scrollTime={'00:00:00'}
        eventTimeFormat={{
          hour: 'numeric',
          minute: 'numeric',
          meridiem: 'short',
        }}
        ref={calendarRef}
        fixedWeekCount={false}
        showNonCurrentDates={false}
        eventContent={renderEventContent}
      />

      {/* <button className="btn" onClick={() => setAddAvailibility(true)}>Add Availibility Modal</button>
      <button className="btn" onClick={() => setViewAvailibility(true)}>View Availibility Modal</button> */}

      <button
        type="button"
        className="btn btn-primary btn-sticky-appointment z-[999999]"
        onClick={() => setAddAvailibility(true)}><i className="ri-add-circle-fill"></i> Set Availablity</button>

      {addAvailibility &&
        <SetAddAvailibility
          open={addAvailibility}
          setOpen={setAddAvailibility}
          saveCallback={fetchAvailibilitiesData}
          editAvailibilityData={editAvailibilityData}
          setEditAvailibilityData={setEditAvailibilityData}
        />}
      {viewAvailibility &&
        <SetViewAvailibility
          open={viewAvailibility}
          setOpen={setViewAvailibility}
          editAvailibilityData={editAvailibilityData}
          setEditAvailibilityData={setEditAvailibilityData}
          setAddAvailibility={setAddAvailibility}
        />}
    </>
  )
}

export default LandingAvailabilityTab
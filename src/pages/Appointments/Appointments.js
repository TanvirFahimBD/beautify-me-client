import React, { useState } from 'react';
import AllAppointment from './AllAppointment/AllAppointment';
import AppointmentBanner from './AppointmentBanner/AppointmentBanner';
import './Appointments.css'

const Appointments = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <div>
            <AppointmentBanner selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            <AllAppointment selectedDate={selectedDate} />
        </div>
    );
};

export default Appointments;
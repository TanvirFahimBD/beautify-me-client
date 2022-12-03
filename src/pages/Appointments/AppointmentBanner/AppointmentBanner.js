import React from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import banner from '../../../utilities/images/pic/appontment.jpg'
import { format } from 'date-fns';

const AppointmentBanner = ({ selectedDate, setSelectedDate }) => {

    let footer = <p>Please pick a day.</p>;
    if (selectedDate) {
        footer = <p>You picked {format(selectedDate, 'PP')}.</p>;
    }

    return (
        <div className='d-flex justify-content-evenly my-4'>
            <div>
                <img src={banner} alt="" width={400} height={400} style={{ borderRadius: '5px' }} />
            </div>
            <div>
                <DayPicker
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    footer={footer}
                />
            </div>
        </div>
    );
};

export default AppointmentBanner;
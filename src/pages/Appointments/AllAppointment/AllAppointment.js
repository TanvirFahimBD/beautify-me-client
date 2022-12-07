import React, { useState } from 'react';
import { format } from 'date-fns';
import Service from '../Service/Service';
import Grid from '@mui/material/Grid';
import BookingModal from '../BookingModal/BookingModal';
import { useQuery } from 'react-query';
import Loading from '../../shared/Loading/Loading';

const AllAppointment = ({ selectedDate }) => {
    const [currentService, setCurrentService] = useState({})
    const [open, setOpen] = React.useState(false);
    const handleOpen = (service) => {
        setOpen(true)
        setCurrentService(service)
    };
    const handleClose = () => {
        setOpen(false)
        refetch()
    };

    const formattedDate = format(selectedDate, 'PP');

    const { data: services, isLoading, refetch } = useQuery(['available', formattedDate],
        () => fetch(`http://localhost:5000/available?date=${formattedDate}`)
            .then(res => res.json()))

    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            <h1 className='my-5 text-primary'>Booking on {formattedDate} </h1>
            <Grid container spacing={2} className='my-5 p-5'>{services?.map(service => <Service key={service._id} service={service} handleOpen={handleOpen} />)}</Grid>
            {currentService && <BookingModal currentService={currentService} open={open} handleClose={handleClose} selectedDate={selectedDate} refetch={refetch} />}
        </div >
    );
};

export default AllAppointment;
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import cutter from '../../../utilities/images/pic/cutter.jpg'
import './Appointment.css'
import { Link } from 'react-router-dom';

const Appointment = () => {
    return (
        <Box sx={{ flexGrow: 1, py: 10 }} className='appoint-bg'>
            <Grid container spacing={2} >
                <Grid item xs={6} md={6}>
                    <img src={cutter} alt="" width={400} height={400} style={{ borderRadius: '10px' }} />
                </Grid>
                <Grid item xs={6} md={6} className=' d-flex flex-column justify-content-center align-items-start' >
                    <h4 className='text-primary my-3'>Appointment</h4>
                    <h2 className='text-white'>Make an appointment today</h2>
                    <p className='text-white'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima nesciunt quod omnis tenetur quaerat? Vel officia porro maiores corporis quasi dicta velit aperiam reiciendis? Temporibus dolor perferendis praesentium repudiandae </p>
                    <Link to='/appointments' className='my-3 text-decoration-none'><Button variant="contained">Make An Appointment</Button></Link>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Appointment;
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import clock from '../../../utilities/images/icons/clock.svg';
import phone from '../../../utilities/images/icons/phone.svg';
import marker from '../../../utilities/images/icons/marker.svg';
import './Info.css'

const Info = () => {
    return (
        <Box sx={{ flexGrow: 1, my: 10, p: 3 }} className='text-white'>
            <Grid container spacing={2}>
                <Grid item xs={6} md={4}>
                    <div className='d-flex bg-blue p-5'>
                        <div>
                            <img src={clock} alt="" className='mx-2' />
                        </div>
                        <div>
                            <h1>Opening Hours</h1>
                            <p>Opening Hours from 8AM - 6PM</p>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={6} md={4}>
                    <div className='d-flex bg-gray p-5'>
                        <div>
                            <img src={phone} alt="" className='mx-2' />
                        </div>
                        <div>
                            <h1>Contact Us Now</h1>
                            <p>Contact Us now on our contact</p>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={6} md={4}>
                    <div className='d-flex bg-blue p-5'>
                        <div>
                            <img src={marker} alt="" className='mx-2' />
                        </div>
                        <div>
                            <h1>Visit Our location</h1>
                            <p>Visit Our location at any branches </p>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Info;
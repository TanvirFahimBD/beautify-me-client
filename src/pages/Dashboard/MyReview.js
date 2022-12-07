import { Button, CardContent, Grid } from '@mui/material';
import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MyReview = ({ rev }) => {
    const { address, date, patientName, phone, slot, treatment, _id, review } = rev;

    return (
        <Grid item xs={6} md={4}>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <h3 className='text-primary'>{treatment}</h3>
                    <p>{patientName}</p>
                    <p>{phone}</p>
                    <p className='text-primary'>{address}</p>
                    <p>{date}</p>
                    <p className='text-primary'>{slot}</p>
                    <Link to={`/dashboard/review/${_id}`}><Button variant='contained'>Review Now</Button></Link>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default MyReview;
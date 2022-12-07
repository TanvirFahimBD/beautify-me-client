import { CardContent, Grid } from '@mui/material';
import React from 'react';
import { Card } from 'react-bootstrap';

const History = ({ his }) => {
    const { treatment, price, review, paid } = his;
    console.log('his', his)

    return (
        <Grid item xs={6} md={4}>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <h3 className='text-primary'>{treatment}</h3>
                    <p>{paid ? `$${price} Paid` : `$${price} Payment Pending`}</p>
                    <p>{review ? review : 'You not review yet'}</p>
                </CardContent>
            </Card>
        </Grid>

    );
};

export default History;
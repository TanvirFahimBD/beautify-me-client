import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';

const Service = ({ service, handleOpen }) => {
    const { name, slots, price } = service;
    return (
        <Grid item xs={6} md={4} >
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {name}
                    </Typography>
                    {
                        (slots.length > 1) ?
                            <Typography className='my-2' sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {slots[0]}
                            </Typography>
                            :
                            <Typography className='my-2 text-danger' sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Try Another Date
                            </Typography>
                    }
                    <Typography variant="body2">
                        {slots.length} {slots.length > 1 ? 'slots' : 'slot'} Available
                    </Typography>
                    <Typography variant="body2" className='my-2'>
                        Price: ${price}
                    </Typography>
                    <Button className='my-2' disabled={slots.length === 0} variant='contained'
                        onClick={() =>
                            handleOpen(service)}
                    >Book Appointment</Button>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default Service;
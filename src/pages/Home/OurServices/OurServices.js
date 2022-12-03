import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import haircolor from '../../../utilities/images/icons/hair-color.png';
import hairdry from '../../../utilities/images/icons/hairdryer.png';
import hairshape from '../../../utilities/images/icons/short-male-hair-shape.png';

const OurServices = () => {
    return (
        <div className='my-5'>
            <h4>Our Services</h4>
            <h2 className='text-primary'>Services We Provide</h2>
            <Box sx={{ flexGrow: 1, my: 10 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={4}>
                        <div className='my-4'>

                            <div>
                                <img src={hairshape} alt="" height={200} width={200} />
                            </div>
                            <div>
                                <h3>Hair Cut</h3>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <div>
                            <div className='my-4'>
                                <img src={hairdry} alt="" height={200} width={200} />
                            </div>
                            <div>
                                <h3>Hair Dry</h3>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <div>
                            <div className='my-4'>
                                <img src={haircolor} alt="" height={200} width={200} />
                            </div>
                            <div>
                                <h3>Hair Color</h3>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default OurServices;
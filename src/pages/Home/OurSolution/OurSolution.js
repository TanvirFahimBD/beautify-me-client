import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import hairtransplant from '../../../utilities/images/icons/animation/hairtransplant.gif'
import hairloss from '../../../utilities/images/icons/animation/hair-loss.gif'
import hairreplacement from '../../../utilities/images/icons/animation/hair-replacement.gif'
import Card from '@mui/material/Card';
import './OurSolution.css'

const OurSolution = () => {
    return (
        <div>
            <h2 className='text-primary'>Your Dream is our goal</h2>
            <Box sx={{ flexGrow: 1, m: 10 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={4}>
                        <Card className='p-3' sx={{ minWidth: 275 }}>
                            <div>
                                <div className='my-4'>
                                    <img src={hairloss} alt="" height={200} width={200} style={{ borderRadius: '50%' }} />
                                </div>
                                <div>
                                    <h3>Dream</h3>
                                </div>
                            </div>
                        </Card>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Card className='p-3' sx={{ minWidth: 275 }}>
                            <div>
                                <div className='my-4'>
                                    <img src={hairtransplant} alt="" height={200} width={200} style={{ borderRadius: '50%' }} />
                                </div>
                                <div>
                                    <h3>Transplant</h3>
                                </div>
                            </div>
                        </Card>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Card className='p-3' sx={{ minWidth: 275 }}>
                            <div className='my-4'>
                                <div>
                                    <img src={hairreplacement} alt="" height={200} width={200} style={{ borderRadius: '50%' }} />
                                </div>
                                <div>
                                    <h3 className='mt-2'>Reality</h3>
                                </div>
                            </div>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default OurSolution;
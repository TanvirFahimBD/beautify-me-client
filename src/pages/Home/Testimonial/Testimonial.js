import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import client1 from '../../../utilities/images/pic/client (1).jpg';
import client2 from '../../../utilities/images/pic/client (2).jpg';
import client3 from '../../../utilities/images/pic/client (3).jpg';
import Card from '@mui/material/Card';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import './Testimonial.css'

const Testimonial = () => {
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: 'ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }));

    return (
        <div className='my-5 p-4'>
            <h4>Testimonials</h4>
            <h2 className='text-primary'>What our client Says</h2>
            <Box sx={{ flexGrow: 1, my: 10 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={4}>
                        <Card className='bg-blue p-5 text-white' sx={{ minWidth: 275 }}>
                            <div className='d-flex  mx-3'>
                                <div className='m-4'>
                                    <Stack direction="row" spacing={2}>
                                        <StyledBadge
                                            overlap="circular"
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            variant="dot"
                                        >
                                            <Avatar alt="Remy Sharp" src={client1} sx={{ width: 56, height: 56 }} />
                                        </StyledBadge>
                                    </Stack>
                                </div>
                                <div className='d-flex flex-column justify-content-center'>
                                    <h3>Watson</h3>
                                    <p>California</p>
                                </div>
                            </div>
                            <div>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A quasi aut expedita, nemo mollitia dolore dolorem magni ad eaque soluta magnam, laborum cumque necessitatibus culpa praesentium molestias illum deserunt! Sequi!</p>
                            </div>
                        </Card>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Card className='bg-blue  p-5 text-white' sx={{ minWidth: 275 }}>
                            <div className='d-flex  mx-3'>
                                <div className='m-4'>
                                    <Stack direction="row" spacing={2}>
                                        <StyledBadge
                                            overlap="circular"
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            variant="dot"
                                        >
                                            <Avatar alt="Remy Sharp" src={client2} sx={{ width: 56, height: 56 }} />
                                        </StyledBadge>
                                    </Stack>
                                </div>
                                <div className='d-flex flex-column justify-content-center'>
                                    <h3>Harry</h3>
                                    <p>California</p>
                                </div>
                            </div>
                            <div>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A quasi aut expedita, nemo mollitia dolore dolorem magni ad eaque soluta magnam, laborum cumque necessitatibus culpa praesentium molestias illum deserunt! Sequi!</p>
                            </div>
                        </Card>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Card className='bg-blue p-5 text-white' sx={{ minWidth: 275 }}>
                            <div className='d-flex mx-3'>
                                <div className='m-4 '>
                                    <Stack direction="row" spacing={2}>
                                        <StyledBadge
                                            overlap="circular"
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            variant="dot"
                                        >
                                            <Avatar alt="Remy Sharp" src={client3} sx={{ width: 56, height: 56 }} />
                                        </StyledBadge>
                                    </Stack>
                                </div>
                                <div className='d-flex flex-column justify-content-center' >
                                    <h3>John</h3>
                                    <p>California</p>
                                </div>
                            </div>
                            <div>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A quasi aut expedita, nemo mollitia dolore dolorem magni ad eaque soluta magnam, laborum cumque necessitatibus culpa praesentium molestias illum deserunt! Sequi!</p>
                            </div>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default Testimonial;
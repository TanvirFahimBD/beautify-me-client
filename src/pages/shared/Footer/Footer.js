import * as React from 'react';
import store from '../../../utilities/images/store.jpg'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import './Footer.css'

const Footer = () => {
    const date = new Date();
    const year = date.getFullYear()

    return (
        <Box sx={{ flexGrow: 1, mt: 20 }}>
            <Grid container spacing={2}>
                <Grid item xs={6} md={3}>
                    <ul className='list-style'>
                        <li>
                            <h3>Services</h3>
                        </li>
                        <li>Hair Cut</li>
                        <li>Hair Color</li>
                        <li>Hair Dry</li>
                    </ul>
                </Grid>
                <Grid item xs={6} md={3}>
                    <ul className='list-style'>
                        <li>
                            <h3>Socials</h3>
                        </li>
                        <li>Facebook</li>
                        <li>Youtube</li>
                        <li>Instagram</li>
                    </ul>
                </Grid>
                <Grid item xs={6} md={3}>
                    <ul className='list-style'>
                        <li>
                            <h3>Contact</h3>
                        </li>
                        <li>Email</li>
                        <li>Blog</li>
                        <li>Address</li>
                    </ul>
                </Grid>
                <Grid item xs={6} md={3}>
                    <img src={store} alt="" />
                </Grid>
            </Grid>
            <p>Copyright {year}. All rights reserved.</p>
        </Box>
    );
};

export default Footer;
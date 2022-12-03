import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import noPage from '../../../utilities/images/pic/404.png';

const NoPageFound = () => {
    return (
        <div>
            <img src={noPage} alt="" width={700} height={700} />
            <br />
            <Link to='/' className='text-decoration-none'><Button variant='contained'>Go back to homepage</Button></Link>
        </div>
    );
};

export default NoPageFound;
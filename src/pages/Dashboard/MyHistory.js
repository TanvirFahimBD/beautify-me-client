import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../firebase.init';
import Loading from '../shared/Loading/Loading';
import { Grid } from '@mui/material';
import History from './History';

const MyHistory = () => {
    const [user, loading] = useAuthState(auth)
    const { data: history, isLoading } = useQuery([user, 'history'], () => fetch(`http://localhost:5000/booking/email/${user.email}`).then(res => res.json()));

    if (isLoading || loading) {
        return <Loading />
    }

    return (
        <div>
            {<Grid container spacing={2} className='p-5'>{history.map(his => <History key={his._id} his={his} />)}</Grid>}
        </div>
    );
};

export default MyHistory;
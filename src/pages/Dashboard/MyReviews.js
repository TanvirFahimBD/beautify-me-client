import { Grid } from '@mui/material';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../firebase.init';
import Loading from '../shared/Loading/Loading';
import MyReview from './MyReview';

const MyReviews = () => {
    const [user, loading] = useAuthState(auth)
    const { data: reviews, isLoading } = useQuery([user, 'reviews'], () => fetch(`http://localhost:5000/booking/email/${user.email}`).then(res => res.json()));

    if (isLoading || loading) {
        return <Loading />
    }

    return (
        <div>
            <Grid container spacing={2} className='p-5'>{reviews.map(rev => <MyReview key={rev._id} rev={rev} />)}</Grid>

        </div>
    );
};

export default MyReviews;
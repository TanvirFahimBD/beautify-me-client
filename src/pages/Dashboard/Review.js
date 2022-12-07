import { Button } from '@mui/material';
import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import auth from '../../firebase.init';
import Loading from '../shared/Loading/Loading';

const Review = () => {
    const navigate = useNavigate()
    const [review, setReview] = useState('')
    const { reviewId } = useParams()
    const { data: singleBooking, isLoading } = useQuery(['singleBooking', reviewId], () => fetch(`https://beautify-me-server.up.railway.app/booking/review/${reviewId}`).then(res => res.json()));

    if (isLoading) {
        return <Loading />
    }

    const handleReview = (e) => {
        e.preventDefault();
        fetch(`https://beautify-me-server.up.railway.app/booking/review/${reviewId}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ review: review })
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    localStorage.removeItem('accessToken');
                    signOut(auth)
                    navigate('/login')
                }
                return res.json()
            })
            .then(data => {
                if (data.matchedCount) {
                    toast.success('Review added successfully')
                }
            })
        e.target.reset()
    }

    const { address, date, slot, treatment } = singleBooking

    return (
        <div>
            <h1 className='my-4 text-primary'>Review</h1>
            <div className='d-flex'>
                <div className='my-5 w-50'>
                    <h3 className='text-primary'>{treatment}</h3>
                    <h4>{address}</h4>
                    <h4>{date}</h4>
                    <h4 className='text-primary'>{slot}</h4>
                    <form onSubmit={handleReview}>
                        <input className='p-2 my-3' type="text" required onBlur={(e) => setReview(e.target.value)} placeholder='Give ⭐ out of 5' />
                        <br />
                        <Button type='submit' className='my-2 w-25' variant='contained'>Review</Button>
                    </form>
                </div>
                <div className=' w-50'>
                    <img src='https://i.ibb.co/RgHYxsv/Online-Review-rafiki.png' alt="" width={700} height={700} />
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Review;
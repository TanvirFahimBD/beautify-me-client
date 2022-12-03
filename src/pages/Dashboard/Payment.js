import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { signOut } from 'firebase/auth';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../shared/Loading/Loading';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51L6u7WFgsutIdwUugeM7fMavghMBwUs855h9IHnQ3hmApyvT3zYHbc2n2tZyg5nouYvbnDrPfU1z8k0NQivmQJ0I00NRC61XhE');

const Payment = () => {
    const navigate = useNavigate()
    const { paymentId } = useParams()
    const url = `http://localhost:5000/booking/${paymentId}`

    const { data: paymentInfo, isLoading } = useQuery(['paymentInfo', paymentId], () => fetch(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => {
        if (res.status === 401 || res.status === 403) {
            localStorage.removeItem('accessToken');
            signOut(auth)
            navigate('/login')
        }
        return res.json()
    })
    )

    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            <h1 className='my-3'>Payment</h1>
            <div className='d-flex '>
                <div className='w-50'>
                    <img src='https://i.ibb.co/GFRRrh2/Privacy-policy-rafiki.png' alt="" width={500} height={500} />
                </div>
                <div className='w-25 mt-5'>
                    <h2 className='my-4'>Hello, <span className='text-primary'>{paymentInfo?.patientName}</span> </h2>
                    <h5 className='my-4'>Your  appointment is {paymentInfo?.treatment} in {paymentInfo?.date} at <span className='text-primary'>{paymentInfo?.slot}</span></h5>
                    <h4 className='my-4'>Total Charge <span className='text-primary'>${paymentInfo?.price}</span> </h4>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm paymentInfo={paymentInfo} />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;
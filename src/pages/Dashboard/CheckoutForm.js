import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import auth from '../../firebase.init';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ paymentInfo }) => {
    const navigate = useNavigate();
    const { _id, price, patientName, patient } = paymentInfo
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('')
    const [clientSecret, setClientSecret] = useState("");
    const [currentPaymentIntent, setCurrentPaymentIntent] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => {
                if (res.status === 401 || res.status === 403) {
                    localStorage.removeItem('accessToken');
                    signOut(auth)
                    navigate('/login')
                }
                return res.json()
            })
            .then((data) => {
                if (data?.clientSecret) {
                    setClientSecret(data?.clientSecret)
                }
            });
    }, [price, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setCardError(error?.message)
            console.log('[error]', error);
        } else {
            setCardError('')
            console.log('[PaymentMethod]', paymentMethod);
        }

        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: patientName,
                        email: patient,
                    },
                },
            },
        );

        const payment = {
            appointment: _id,
            transactionId: paymentIntent.id
        }

        if (intentError) {
            setCardError(intentError?.message)
        } else {
            if (paymentIntent.id) {
                fetch(`http://localhost:5000/booking/${_id}`, {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json',
                        authentication: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(payment),
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
                        console.log('data', data)
                    })
            }
            setCurrentPaymentIntent(paymentIntent.id)
            setCardError('')
            toast.success(`Paid $${price}. Payment successful`)
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <Button variant='contained' className='my-4 w-100' type="submit" disabled={!stripe || !clientSecret || currentPaymentIntent}>
                    Pay
                </Button>
            </form>
            <ToastContainer />
            {cardError && <p className='text-danger'>{cardError}</p>}
            {currentPaymentIntent && <p className='text-success'>Successful payment id: {currentPaymentIntent}</p>}
        </>
    );
};

export default CheckoutForm;
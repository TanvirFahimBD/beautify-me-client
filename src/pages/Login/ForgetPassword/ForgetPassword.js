import React from 'react';
import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../shared/Loading/Loading';

const ForgetPassword = () => {
    const navigate = useNavigate()
    const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(
        auth
    );
    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = (data) => {
        const { email } = data;
        sendPasswordResetEmail(email)
        toast.success(`Password reset email sent to ${email}`)
        navigate('/')
    };

    let errorElement;
    if (error) {
        errorElement = <p className='text-danger'>Error: {error.message}</p>
    }

    if (sending) {
        return <Loading />;
    }

    return (
        <div className='d-flex '>
            <div className='d-flex flex-column align-items-center justify-content-center w-50 my-3'>
                <h1>Reset Password</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField className='w-100' id="email" label="Email" variant="standard"  {...register("email", {
                        pattern: {
                            value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                            message: 'Email format is not supported'
                        },
                        required: {
                            value: true,
                            message: 'Email is required'
                        }

                    })}
                        aria-invalid={errors.email ? "true" : "false"} />
                    {(errors.email?.type === 'required') && <p className='text-danger' role="alert">{errors.email.message}</p>}

                    {(errors.email?.type === 'pattern') && <p className='text-danger' role="alert">{errors.email.message}</p>}
                    <br />
                    <br />
                    <Button type="submit" className='w-100' variant='contained'> Send Email</Button>
                </form>
                {errorElement && errorElement}
                <ToastContainer />
            </div>
            <div className='w-50'>
                <img src='https://i.ibb.co/Fs0L1FY/Reset-password-rafiki.png' alt="" width={800} height={800} />
            </div>
        </div>
    );
};

export default ForgetPassword;
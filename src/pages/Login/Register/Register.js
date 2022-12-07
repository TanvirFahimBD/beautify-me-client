import React from 'react';
import SocialLogin from '../../shared/SocialLogin/SocialLogin';
import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useSendEmailVerification, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useToken from '../../../hooks/useToken';
import Loading from '../../shared/Loading/Loading';

const Register = () => {
    const navigate = useNavigate()
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [token] = useToken(user)
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const [sendEmailVerification, verifySending, verifyError] = useSendEmailVerification(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        const { email, password, displayName, photoURL } = data;
        await createUserWithEmailAndPassword(email, password)
        await updateProfile({ displayName, photoURL });
        await sendEmailVerification();
    };

    let errorElement;
    if (error || updateError || verifyError) {
        errorElement = <p className='text-danger'>Error: {error?.message || updateError?.message || verifyError?.message}</p>
    }

    if (loading || updating || verifySending) {
        return <Loading />;
    }

    if (token) {
        toast.success(`Successfully profile created`)
        navigate('/')
    }

    return (
        <div className='d-flex'>
            <div className='d-flex flex-column align-items-center justify-content-center w-50  my-3'>
                <h1>Register</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField id="name" label="Name" variant="standard"  {...register("displayName", {
                        required: {
                            value: true,
                            message: 'Name is required'
                        }

                    })}
                        aria-invalid={errors.displayName ? "true" : "false"} />
                    {(errors.displayName?.type === 'required') && <p className='text-danger' role="alert">{errors.displayName.message}</p>}
                    <br />
                    <br />
                    <TextField id="email" label="Email" variant="standard"  {...register("email", {
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
                    <TextField id="password" label="Password" type="password" variant="standard"  {...register("password", {
                        pattern: {
                            value: /[A-Za-z]{3}/,
                            message: 'Password include 3 letter'
                        },
                        required: {
                            value: true,
                            message: 'Password is required'
                        },
                        minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters'
                        }
                    })} />
                    {errors.password?.type === 'required' && <p className='text-danger' role="alert">{errors.password.message}</p>}

                    {(errors.password?.type === 'pattern') && <p className='text-danger' role="alert">{errors.password.message}</p>}

                    {(errors.password?.type === 'minLength') && <p className='text-danger' role="alert">{errors.password.message}</p>}
                    <br />
                    <br />
                    <TextField id="photoURL" label="Profile Picture URL" variant="standard"  {...register("photoURL", {
                        required: {
                            value: true,
                            message: 'Photo URL is required'
                        }

                    })}
                        aria-invalid={errors.photoURL ? "true" : "false"} />
                    {(errors.photoURL?.type === 'required') && <p className='text-danger' role="alert">{errors.photoURL.message}</p>}
                    <br />
                    <br />
                    <Button type="submit" className='w-100' variant='contained'>Register</Button>
                </form>
                <p className='my-4'>Already have account? <Link to='/login' className='text-decoration-none'>Login Now</Link> </p>
                {errorElement && errorElement}
                <div className='d-flex my-2 w-25'>
                    <hr className='w-50' /><span className='mx-2'>OR </span><hr className='w-50' />
                </div>
                <SocialLogin />
                <ToastContainer />
            </div>
            <div className='w-50'>
                <img src='https://i.ibb.co/Vj0SM8d/Forgot-password-rafiki.png' alt="" width={800} height={800} />
            </div>
        </div>
    );
};

export default Register;
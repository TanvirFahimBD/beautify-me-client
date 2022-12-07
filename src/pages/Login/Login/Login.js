import React from 'react';
import SocialLogin from '../../shared/SocialLogin/SocialLogin';
import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Login.css'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../shared/Loading/Loading';
import useToken from '../../../hooks/useToken';

const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state?.from?.pathname || '/';
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const [token] = useToken(user)
    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = (data) => {
        signInWithEmailAndPassword(data.email, data.password)
        toast.success(`Successful login ${user?.email}`)
    };

    let errorElement;
    if (error) {
        errorElement = <p className='text-danger'>Error: {error.message}</p>
    }

    if (loading) {
        return <Loading />;
    }

    if (token) {
        navigate(from, { replace: true })
    }

    return (
        <div className='d-flex '>
            <div className='w-50'>
                <img src='https://i.ibb.co/GFRRrh2/Privacy-policy-rafiki.png' alt="" width={800} height={800} />
            </div>
            <div className='d-flex flex-column align-items-center justify-content-center w-50  my-3'>
                <h1>Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                    <p><Link to='/forget-password' className='text-decoration-none'>Forget Password?</Link></p>

                    <Button type="submit" className='w-100' variant='contained'>LogIn</Button>
                </form>
                <ToastContainer />
                <p className='my-4'>Don't have account? <Link to='/register' className='text-decoration-none'>Register Now</Link> </p>
                {error && errorElement}
                <div className='d-flex my-2 w-25'>
                    <hr className='w-50' /><span className='mx-2'>OR </span><hr className='w-50' />
                </div>
                <SocialLogin />
            </div>
        </div>
    );
};

export default Login;
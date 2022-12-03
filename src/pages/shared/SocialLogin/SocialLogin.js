import { Button } from '@mui/material';
import React from 'react';
import auth from '../../../firebase.init';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import Loading from '../../shared/Loading/Loading';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useToken from '../../../hooks/useToken';

const SocialLogin = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state?.from?.pathname || '/';
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const [token] = useToken(user)

    let errorElement;
    if (error) {
        errorElement = <p className='text-danger'>{error.message}</p>
    }

    if (loading) {
        return <Loading />
    }

    if (token) {
        console.log('user info', user)
        toast.success('Profile has been created successfully')
        navigate(from, { replace: true })
    }
    return (
        <div>
            <Button className='w-100' variant='contained' onClick={() => signInWithGoogle()}>Google SignIn</Button>
            {error && errorElement}
            <ToastContainer />
        </div>
    );
};

export default SocialLogin;
import { Button } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../../shared/Loading/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RequireAuth = ({ children }) => {
    const [user, loading] = useAuthState(auth)
    const location = useLocation()
    // const handleEmailVerify = () => {
    //     toast.success(`Verification email sent to ${user?.email}`)
    // }

    if (loading) {
        return <Loading />
    }

    if (!user) {
        return <Navigate to='/login' state={{ from: location }} replace />
    }

    // if (!user?.emailVerified) {
    //     return (
    //         <div className='my-5'>
    //             <h1>Verify Your Email</h1>
    //             <p className='text-danger my-3'>Check spam folder. You have not verified your email yet. </p>
    //             <p className='text-danger my-3'>Verify Email & reload this page. </p>
    //             <Button variant='contained' onClick={handleEmailVerify}>Send Verification Email</Button>
    //             <ToastContainer />
    //         </div>
    //     )
    // }

    return children;
};

export default RequireAuth;